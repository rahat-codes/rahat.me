import { useContext } from 'react';
import { LenisContext, type LenisContextType } from '@/context/lenis-context';

export const useLenis = (): LenisContextType => {
  return useContext(LenisContext);
};

