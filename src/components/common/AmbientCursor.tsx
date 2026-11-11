import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '@/lib/motion/tokens';

export const AmbientCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only mount on devices with a fine pointer (mouse/trackpad) and when reduced motion is not requested
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || prefersReducedMotion()) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Dot follows immediately
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Shared GSAP ticker drives ring interpolation smoothly
    const tickerUpdate = () => {
      if (!isVisible) return;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      gsap.set(ring, { x: ringX, y: ringY });
    };

    // Scale up ring on hovering links/buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, [role="button"]')) {
        gsap.to(ring, { scale: 1.6, borderColor: 'rgba(245, 158, 11, 0.8)', duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1.0, borderColor: 'rgba(245, 158, 11, 0.35)', duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    gsap.ticker.add(tickerUpdate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      />
      {/* Eased Ambient HUD Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-amber/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 shadow-amber-glow"
      />
    </>
  );
};

