import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionTokens, prefersReducedMotion } from './tokens';

gsap.registerPlugin(ScrollTrigger);

export interface CountUpOptions {
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trigger?: HTMLElement | string;
  start?: string;
  onComplete?: () => void;
}

/**
 * Animated count-up numbers with ScrollTrigger support.
 * Returns GSAP tween for cleanup.
 */
export const countUp = (
  element: HTMLElement,
  endValue: number,
  options: CountUpOptions = {}
): gsap.core.Tween | null => {
  const {
    duration = motionTokens.duration.deliberate,
    prefix = '',
    suffix = '',
    decimals = 0,
    trigger,
    start = 'top 90%',
    onComplete,
  } = options;

  const format = (val: number) => {
    return `${prefix}${val.toFixed(decimals)}${suffix}`;
  };

  if (prefersReducedMotion()) {
    element.textContent = format(endValue);
    onComplete?.();
    return null;
  }

  const obj = { val: 0 };
  element.textContent = format(0);

  return gsap.to(obj, {
    val: endValue,
    duration,
    ease: motionTokens.ease.hud,
    onUpdate: () => {
      element.textContent = format(obj.val);
    },
    onComplete: () => {
      element.textContent = format(endValue);
      onComplete?.();
    },
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
        }
      : undefined,
  });
};

