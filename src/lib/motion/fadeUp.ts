import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionTokens, prefersReducedMotion } from './tokens';

gsap.registerPlugin(ScrollTrigger);

export interface FadeUpOptions {
  trigger?: HTMLElement | string;
  delay?: number;
  duration?: number;
  stagger?: number;
  yOffset?: number;
  start?: string;
  markers?: boolean;
}

/**
 * Entrances elements with subtle HUD upwards fade and stagger.
 * Returns the GSAP tween/timeline for cleanup.
 */
export const fadeUp = (
  targets: gsap.DOMTarget,
  options: FadeUpOptions = {}
): gsap.core.Timeline | gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  const {
    trigger,
    delay = 0,
    duration = motionTokens.duration.standard,
    stagger = motionTokens.stagger.standard,
    yOffset = 24,
    start = 'top 85%',
  } = options;

  gsap.set(targets, { opacity: 0, y: yOffset });

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: motionTokens.ease.hud,
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
        }
      : undefined,
  });
};

