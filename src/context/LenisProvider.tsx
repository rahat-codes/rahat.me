import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from './lenis-context';
import { prefersReducedMotion } from '@/lib/motion/tokens';
import { setDiagnosticsState } from '@/lib/motion/diagnostics';

gsap.registerPlugin(ScrollTrigger);

// Module-level guard to prevent duplicate ticker bindings under React 18 StrictMode
let activeTickerCallback: ((time: number) => void) | null = null;
let activeLenisInstance: Lenis | null = null;

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisState, setLenisState] = useState<Lenis | null>(null);

  const refresh = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.resize();
    }
    ScrollTrigger.refresh();
  }, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement | number,
      options?: { offset?: number; immediate?: boolean; duration?: number }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDiagnosticsState(0, false);
      return;
    }

    // Configure single ticker loop (Rule 6.1)
    gsap.ticker.lagSmoothing(0);

    // If an instance is already active (e.g. StrictMode unmount race), clean it up first
    if (activeTickerCallback) {
      gsap.ticker.remove(activeTickerCallback);
      activeTickerCallback = null;
    }
    if (activeLenisInstance) {
      activeLenisInstance.destroy();
      activeLenisInstance = null;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.09,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    activeLenisInstance = lenis;
    setDiagnosticsState(1, true);
    setLenisState(lenis);

    // Call ScrollTrigger.update on every Lenis scroll tick
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Unified single RAF loop: GSAP ticker drives Lenis
    const tickerCallback = (time: number) => {
      if (activeLenisInstance) {
        activeLenisInstance.raf(time * 1000);
      }
    };
    activeTickerCallback = tickerCallback;
    gsap.ticker.add(tickerCallback);

    // Staggered layout & font settlement triggers (Rule 6.1)
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh();
      });
    }

    const timer1 = setTimeout(() => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh();
    }, 250);

    const timer2 = setTimeout(() => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (activeTickerCallback) {
        gsap.ticker.remove(activeTickerCallback);
        activeTickerCallback = null;
      }
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      activeLenisInstance = null;
      setDiagnosticsState(0, false);
      setLenisState(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisState, scrollTo, refresh }}>
      {children}
    </LenisContext.Provider>
  );
};
