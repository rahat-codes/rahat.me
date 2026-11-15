import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// EN
import enNav from '@/locales/en/nav.json';
import enHero from '@/locales/en/hero.json';
import enAbout from '@/locales/en/about.json';
import enProjects from '@/locales/en/projects.json';
import enResearch from '@/locales/en/research.json';
import enContact from '@/locales/en/contact.json';
import enFooter from '@/locales/en/footer.json';
import enErrors from '@/locales/en/errors.json';
import enAdmin from '@/locales/en/admin.json';

// KO
import koNav from '@/locales/ko/nav.json';
import koHero from '@/locales/ko/hero.json';
import koAbout from '@/locales/ko/about.json';
import koProjects from '@/locales/ko/projects.json';
import koResearch from '@/locales/ko/research.json';
import koContact from '@/locales/ko/contact.json';
import koFooter from '@/locales/ko/footer.json';
import koErrors from '@/locales/ko/errors.json';
import koAdmin from '@/locales/ko/admin.json';

// BN
import bnNav from '@/locales/bn/nav.json';
import bnHero from '@/locales/bn/hero.json';
import bnAbout from '@/locales/bn/about.json';
import bnProjects from '@/locales/bn/projects.json';
import bnResearch from '@/locales/bn/research.json';
import bnContact from '@/locales/bn/contact.json';
import bnFooter from '@/locales/bn/footer.json';
import bnErrors from '@/locales/bn/errors.json';
import bnAdmin from '@/locales/bn/admin.json';

export const SUPPORTED_LANGS = ['en', 'ko', 'bn'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: SupportedLang = 'en';

/** Map lang code → BCP-47 locale for <html lang> and hreflang */
export const LANG_LOCALE: Record<SupportedLang, string> = {
  en: 'en',
  ko: 'ko',
  bn: 'bn',
};

/** Human-readable labels for the language switcher */
export const LANG_LABELS: Record<SupportedLang, { short: string; native: string; label: string }> =
  {
    en: { short: 'EN', native: 'EN', label: 'English' },
    ko: { short: 'KO', native: '한국어', label: 'Korean' },
    bn: { short: 'BN', native: 'বাংলা', label: 'Bengali' },
  };

/** Tailwind font-family class applied per language for body text */
export const LANG_FONT_CLASS: Record<SupportedLang, string> = {
  en: 'font-sans',
  ko: 'font-korean',
  bn: 'font-bengali',
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        nav: enNav,
        hero: enHero,
        about: enAbout,
        projects: enProjects,
        research: enResearch,
        contact: enContact,
        footer: enFooter,
        errors: enErrors,
        admin: enAdmin,
      },
      ko: {
        nav: koNav,
        hero: koHero,
        about: koAbout,
        projects: koProjects,
        research: koResearch,
        contact: koContact,
        footer: koFooter,
        errors: koErrors,
        admin: koAdmin,
      },
      bn: {
        nav: bnNav,
        hero: bnHero,
        about: bnAbout,
        projects: bnProjects,
        research: bnResearch,
        contact: bnContact,
        footer: bnFooter,
        errors: bnErrors,
        admin: bnAdmin,
      },
    },
    // The URL prefix (/:lang/) is the canonical source of truth.
    // LanguageDetector is used only as a fallback when no prefix is present.
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupLocalStorage: 'rahat_lang',
      caches: ['localStorage'],
    },
    supportedLngs: SUPPORTED_LANGS,
    fallbackLng: DEFAULT_LANG,
    defaultNS: 'nav',
    ns: ['nav', 'hero', 'about', 'projects', 'research', 'contact', 'footer', 'errors', 'admin'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    parseMissingKeyHandler: (_key) => {
      // Rule 8.5: Never render raw key syntax (e.g. "hero.missing") on the public site
      return '';
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

