import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './tokens';

gsap.registerPlugin(ScrollTrigger);

export interface DrawPathOptions {
  trigger: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  tipElement?: HTMLElement | null;
  onUpdate?: (progress: number) => void;
}

/**
 * Draws an SVG path with stroke-dashoffset scrubbed to scroll.
 * Returns the GSAP Tween with attached ScrollTrigger for cleanup.
 */
export const drawPath = (
  path: SVGPathElement,
  options: DrawPathOptions
): gsap.core.Tween | null => {
  const length = path.getTotalLength();

  path.style.strokeDasharray = `${length}`;

  if (prefersReducedMotion()) {
    path.style.strokeDashoffset = '0';
    options.onUpdate?.(1);
    return null;
  }

  path.style.strokeDashoffset = `${length}`;

  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = 0.5,
    tipElement,
    onUpdate,
  } = options;

  const tween = gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        onUpdate?.(self.progress);
        if (tipElement) {
          try {
            const point = path.getPointAtLength(self.progress * length);
            gsap.set(tipElement, { x: point.x, y: point.y });
          } catch {
            // Safe fallback if SVG geometry is detached
          }
        }
      },
    },
  });

  return tween;
};

