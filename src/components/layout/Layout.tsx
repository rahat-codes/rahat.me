import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import type { SupportedLanguage } from '@/types/portfolio';

export interface LayoutProps {
  children: React.ReactNode;
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  activeSection?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentLang = 'en',
  onLanguageChange,
  activeSection = 'hero',
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-amber selection:text-black">
      {/* WCAG 2.2 Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-sm focus:shadow-amber-glow focus:outline-none"
      >
        [ SKIP TO MAIN CONTENT ]
      </a>

      {/* Persistent Technical Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Persistent Technical Footer */}
      <Footer currentLang={currentLang} onLanguageChange={onLanguageChange} />
    </div>
  );
};
