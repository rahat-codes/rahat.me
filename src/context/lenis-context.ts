import { createContext } from 'react';
import type Lenis from 'lenis';

export interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean; duration?: number }) => void;
  refresh: () => void;
}

export const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
  refresh: () => {},
});
