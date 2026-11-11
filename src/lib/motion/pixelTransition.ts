import { gsap } from 'gsap';
import { motionTokens, prefersReducedMotion } from './tokens';

export interface PixelTransitionOptions {
  container?: HTMLElement;
  rows?: number;
  cols?: number;
  duration?: number;
  onMidpoint?: () => void;
  onComplete?: () => void;
}

/**
 * Pixel Transition:
 * HUD grid of digital blocks dissolving and assembling.
 * Returns the GSAP Timeline for cleanup.
 */
export const pixelTransition = (
  options: PixelTransitionOptions = {}
): gsap.core.Timeline | null => {
  const {
    rows = 6,
    cols = 8,
    duration = motionTokens.duration.standard,
    onMidpoint,
    onComplete,
  } = options;

  if (prefersReducedMotion()) {
    onMidpoint?.();
    onComplete?.();
    return null;
  }

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.className =
    'fixed inset-0 z-[100] pointer-events-none grid';
  overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  overlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  const cells: HTMLDivElement[] = [];
  const totalCells = rows * cols;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'bg-surface border border-border/40';
    cell.style.opacity = '0';
    overlay.appendChild(cell);
    cells.push(cell);
  }

  document.body.appendChild(overlay);

  const tl = gsap.timeline({
    onComplete: () => {
      overlay.remove();
      onComplete?.();
    },
  });

  // Assemble phase (cells fade in with random stagger)
  tl.to(cells, {
    opacity: 1,
    duration: duration * 0.4,
    stagger: {
      amount: duration * 0.3,
      from: 'random',
    },
    ease: 'power2.in',
  });

  // Midpoint hook (for swapping route content or scroll offset)
  tl.add(() => {
    onMidpoint?.();
  });

  // Dissolve phase (cells fade out)
  tl.to(cells, {
    opacity: 0,
    duration: duration * 0.4,
    stagger: {
      amount: duration * 0.3,
      from: 'random',
    },
    ease: 'power2.out',
  });

  return tl;
};

