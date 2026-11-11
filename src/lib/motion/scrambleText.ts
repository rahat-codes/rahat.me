import { gsap } from 'gsap';
import { motionTokens, prefersReducedMotion } from './tokens';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#<>[]{}/*~';

export interface ScrambleOptions {
  duration?: number;
  chars?: string;
  delay?: number;
  onComplete?: () => void;
}

export interface ScrambleController {
  kill: () => void;
  tween: gsap.core.Tween | null;
}

/**
 * Text Scramble Decoder:
 * Locks characters left-to-right.
 * Accessible: The target container must preserve the real text in an accessible attribute
 * or child span, with visual animation performed in an aria-hidden layer.
 */
export const scrambleText = (
  element: HTMLElement,
  finalText: string,
  options: ScrambleOptions = {}
): ScrambleController => {
  if (prefersReducedMotion()) {
    element.textContent = finalText;
    options.onComplete?.();
    return { kill: () => {}, tween: null };
  }

  const {
    duration = motionTokens.duration.scan,
    chars = DEFAULT_CHARS,
    delay = 0,
    onComplete,
  } = options;

  const length = finalText.length;
  const progressObj = { progress: 0 };

  const tween = gsap.to(progressObj, {
    progress: 1,
    duration,
    delay,
    ease: 'power2.inOut',
    onUpdate: () => {
      const lockedLength = Math.floor(progressObj.progress * length);
      let output = finalText.substring(0, lockedLength);

      for (let i = lockedLength; i < length; i++) {
        if (finalText[i] === ' ' || finalText[i] === '\n') {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      element.textContent = output;
    },
    onComplete: () => {
      element.textContent = finalText;
      onComplete?.();
    },
  });

  return {
    kill: () => tween.kill(),
    tween,
  };
};

