/**
 * Motion design tokens & timing constants for HUD Technical Portfolio
 */

export const motionTokens = {
  duration: {
    instant: 0,
    micro: 0.15,
    quick: 0.3,
    standard: 0.6,
    deliberate: 0.9,
    scan: 1.4,
  },
  ease: {
    hud: 'power3.out',
    snappy: 'power4.out',
    smooth: 'power2.inOut',
    linear: 'none',
    circ: 'circ.out',
    expo: 'expo.out',
  },
  stagger: {
    tight: 0.04,
    standard: 0.08,
    relaxed: 0.15,
  },
} as const;

/**
 * Returns true if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

