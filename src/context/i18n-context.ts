import { createContext } from 'react';
import type { SupportedLang } from '@/lib/i18n';

export interface I18nContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
}

export const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  setLang: () => void 0,
});

