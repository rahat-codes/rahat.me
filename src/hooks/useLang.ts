import { useContext } from 'react';
import { I18nContext } from '@/context/i18n-context';

/**
 * Returns { lang, setLang } from the nearest LangRouter context.
 * `setLang` navigates to /<newLang>/<currentSubPath> with preventScrollReset.
 */
export function useLang() {
  return useContext(I18nContext);
}

