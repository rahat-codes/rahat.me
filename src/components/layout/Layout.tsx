import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { HudStatusStrip } from '@/components/common/HudStatusStrip';
import { AmbientCursor } from '@/components/common/AmbientCursor';

export interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeSection = 'hero' }) => {
  const { t } = useTranslation('nav');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-amber selection:text-black pt-6">
      {/* Ambient UI: Slim Top HUD Strip (Asia/Seoul Clock + Status line) */}
      <HudStatusStrip />

      {/* Ambient UI: Smooth Custom Cursor on Fine-Pointer Devices */}
      <AmbientCursor />

      {/* WCAG 2.2 Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-8 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-amber focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-sm focus:shadow-amber-glow focus:outline-none"
      >
        {t('skipToContent')}
      </a>

      {/* Persistent Technical Header */}
      <Header activeSection={activeSection} />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Persistent Technical Footer */}
      <Footer />
    </div>
  );
};
