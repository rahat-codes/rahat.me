import { gsap } from 'gsap';
import { motionTokens, prefersReducedMotion } from './tokens';

export interface LiquidButtonController {
  destroy: () => void;
  timeline: gsap.core.Timeline | null;
}

/**
 * Liquid Button Motion Effect:
 * Reversible measured flood effect across the button surface, rebuilt on resize.
 */
export const attachLiquidButton = (button: HTMLElement): LiquidButtonController => {
  if (prefersReducedMotion()) {
    return { destroy: () => {}, timeline: null };
  }

  // Find or create the fill element
  let fill = button.querySelector<HTMLElement>('.liquid-fill');
  if (!fill) {
    fill = document.createElement('span');
    fill.className =
      'liquid-fill absolute inset-0 bg-amber pointer-events-none rounded-[inherit] -z-0';
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.prepend(fill);
  }

  let tl: gsap.core.Timeline | null = null;

  const buildTimeline = () => {
    if (tl) tl.kill();

    gsap.set(fill, {
      scaleY: 0,
      transformOrigin: 'bottom center',
    });

    tl = gsap.timeline({ paused: true });
    tl.to(fill, {
      scaleY: 1,
      duration: motionTokens.duration.quick,
      ease: motionTokens.ease.hud,
    });
  };

  buildTimeline();

  const handleMouseEnter = () => {
    tl?.play();
  };

  const handleMouseLeave = () => {
    tl?.reverse();
  };

  const handleResize = () => {
    buildTimeline();
  };

  button.addEventListener('mouseenter', handleMouseEnter);
  button.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);

  return {
    destroy: () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      tl?.kill();
      fill?.remove();
    },
    timeline: tl,
  };
};

