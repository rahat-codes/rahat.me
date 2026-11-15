/**
 * LangRouter — wraps the app with language-prefix routing.
 *
 * URL structure: /:lang/*  (e.g. /en/projects, /ko/, /bn/about)
 *
 * On mount at `/`:
 *   1. Reads saved preference from localStorage (key: rahat_lang)
 *   2. Falls back to navigator.language matching
 *   3. Redirects to /<best_lang>/ instantly (replace, no history entry)
 *
 * Language switching: navigate to /<new_lang>/<current_sub_path>
 *   with preventScrollReset so the user stays at their position.
 *
 * <html lang> and document.title are updated reactively.
 */

import React, { useEffect, useCallback } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18nContext } from '@/context/i18n-context';
import { SUPPORTED_LANGS, DEFAULT_LANG, LANG_LOCALE, LANG_FONT_CLASS } from '@/lib/i18n';
import type { SupportedLang } from '@/lib/i18n';

// ─── helpers ─────────────────────────────────────────────────────────────────

const LS_KEY = 'rahat_lang';

function detectBestLang(): SupportedLang {
  // 1. localStorage
  const stored = localStorage.getItem(LS_KEY) as SupportedLang | null;
  if (stored && (SUPPORTED_LANGS as readonly string[]).includes(stored)) return stored;

  // 2. navigator
  for (const nav of navigator.languages ?? [navigator.language]) {
    const prefix = nav.slice(0, 2).toLowerCase() as SupportedLang;
    if ((SUPPORTED_LANGS as readonly string[]).includes(prefix)) return prefix;
  }

  return DEFAULT_LANG;
}

function isValidLang(segment: string | undefined): segment is SupportedLang {
  return !!segment && (SUPPORTED_LANGS as readonly string[]).includes(segment);
}

// ─── inner component (must be inside Router so hooks work) ───────────────────

interface LangShellProps {
  children: React.ReactNode;
}

const TITLES: Record<SupportedLang, string> = {
  en: 'Rahat Md Mahadi Hasan | AI & Computer Engineering',
  ko: '라하트 마하디 하산 | AI 및 컴퓨터공학',
  bn: 'রাহাত মো. মেহেদী হাসান | এআই ও কম্পিউটার ইঞ্জিনিয়ারিং',
};

const LangShell: React.FC<LangShellProps> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const activeLang: SupportedLang = isValidLang(lang) ? lang : DEFAULT_LANG;

  // Sync i18n language
  useEffect(() => {
    if (i18n.language !== activeLang) {
      void i18n.changeLanguage(activeLang);
    }
    localStorage.setItem(LS_KEY, activeLang);

    // Update <html lang>
    document.documentElement.lang = LANG_LOCALE[activeLang];

    // Update document title
    document.title = TITLES[activeLang];

    // Update body font class
    const body = document.body;
    Object.values(LANG_FONT_CLASS).forEach((cls) => body.classList.remove(cls));
    body.classList.add(LANG_FONT_CLASS[activeLang]);
  }, [activeLang, i18n]);

  const setLang = useCallback(
    (newLang: SupportedLang) => {
      if (newLang === activeLang) return;
      // Replace /<activeLang>/ prefix with /<newLang>/
      const currentPath = location.pathname; // e.g. /en/projects
      const subPath = currentPath.replace(new RegExp(`^\\/${activeLang}`), '');
      navigate(`/${newLang}${subPath || '/'}${location.search}${location.hash}`, {
        replace: false,
        preventScrollReset: true,
      });
    },
    [activeLang, location, navigate]
  );

  return <I18nContext.Provider value={{ lang: activeLang, setLang }}>{children}</I18nContext.Provider>;
};

// ─── Redirect at / to best language ─────────────────────────────────────────

const RootRedirect: React.FC = () => {
  const best = detectBestLang();
  return <Navigate to={`/${best}/`} replace />;
};

// ─── Public export ───────────────────────────────────────────────────────────

interface LangRouterProps {
  children: React.ReactNode;
}

/**
 * Renders the /:lang/* route tree.
 * Place this inside <BrowserRouter> as the top-level <Routes>.
 */
export const LangRouter: React.FC<LangRouterProps> = ({ children }) => {
  return (
    <Routes>
      {/* Root: redirect to best language */}
      <Route path="/" element={<RootRedirect />} />

      {/* Language-prefixed routes */}
      <Route
        path="/:lang/*"
        element={<LangShell>{children}</LangShell>}
      />
    </Routes>
  );
};

