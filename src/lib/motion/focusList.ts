import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './tokens';

export interface FocusListOptions {
  items: HTMLElement[];
  container: HTMLElement;
  dimOpacity?: number;
  activeOpacity?: number;
  onActiveChange?: (index: number) => void;
}

export interface FocusListController {
  kill: () => void;
  update: () => void;
}

/**
 * Focus List:
 * Scrub-driven highlighting of the row nearest the viewport vertical center.
 * Returns controller with kill() for cleanup.
 */
export const focusList = (options: FocusListOptions): FocusListController => {
  const {
    items,
    container,
    dimOpacity = 0.35,
    activeOpacity = 1.0,
    onActiveChange,
  } = options;

  if (prefersReducedMotion() || items.length === 0) {
    items.forEach((item) => {
      item.style.opacity = `${activeOpacity}`;
    });
    return { kill: () => {}, update: () => {} };
  }

  let activeIndex = -1;

  const update = () => {
    const centerY = window.innerHeight / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(centerY - itemCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      activeIndex = closestIndex;
      onActiveChange?.(closestIndex);

      items.forEach((item, index) => {
        const isActive = index === closestIndex;
        item.style.opacity = isActive ? `${activeOpacity}` : `${dimOpacity}`;
        item.style.transition = 'opacity 0.25s ease-out, transform 0.25s ease-out';
        item.style.transform = isActive ? 'scale(1.02)' : 'scale(1)';
      });
    }
  };

  const st = ScrollTrigger.create({
    trigger: container,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: update,
  });

  // Initial calculation
  update();

  return {
    kill: () => {
      st.kill();
      items.forEach((item) => {
        item.style.opacity = '';
        item.style.transform = '';
        item.style.transition = '';
      });
    },
    update,
  };
};

