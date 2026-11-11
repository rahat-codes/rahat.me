// Initialize i18n before any component renders
import '@/lib/i18n';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context';
import { LenisProvider } from '@/context/LenisProvider';
import { LangRouter } from '@/components/routing/LangRouter';
import { Layout } from '@/components/layout/Layout';
import { StyleguidePage } from '@/pages/StyleguidePage';
import { MotionTestPage } from '@/pages/MotionTestPage';
import { CornerFrame } from '@/components/common/CornerFrame';
import { LiquidButton } from '@/components/common/LiquidButton';
import { TechBadge } from '@/components/common/TechBadge';
import { seedProfile } from '@/data/seed';
import { useTranslation } from 'react-i18next';
import { Terminal, ArrowRight, BookOpen, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';

// ─── Home page preview (stage placeholder until Stage 6) ─────────────────────

const HomePagePreview: React.FC = () => {
  const { t } = useTranslation('hero');
  const { lang } = useLang();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Preview Frame */}
      <section className="relative pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <TechBadge variant="amber" size="sm" dot>
                {t('currentlyChip')}
              </TechBadge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {t('name')}
              </h1>
              <p className="font-mono text-sm sm:text-base text-amber tracking-wider">
                {(t('roles', { returnObjects: true }) as string[]).join(' · ')}
              </p>
              <p className="text-lg text-foreground-muted max-w-xl leading-relaxed">
                {t('tagline')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <LiquidButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                {t('cta_projects')}
              </LiquidButton>
              <Link to={`/${lang}/motion-test`}>
                <LiquidButton variant="secondary" size="md" icon={<Activity className="w-4 h-4" />}>
                  Motion Test Engine
                </LiquidButton>
              </Link>
              <Link to={`/${lang}/styleguide`}>
                <LiquidButton variant="outline" size="md" icon={<BookOpen className="w-4 h-4" />}>
                  Styleguide
                </LiquidButton>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <CornerFrame
              label="SYS.PORTRAIT // 4:5"
              sublabel="PUBLIC // ASSET"
              cornerSize="lg"
              className="w-full max-w-sm aspect-[4/5] p-3 flex flex-col justify-between overflow-hidden shadow-amber-glow"
            >
              <picture className="w-full h-full block relative bg-surface-secondary rounded-sm overflow-hidden border border-border-subtle">
                <img
                  src="/images/profile-hero-4x5.svg"
                  alt={t('imgAlt')}
                  width={800}
                  height={1000}
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </picture>
            </CornerFrame>
          </div>
        </div>
      </section>

      {/* Stage 3 Verification Shortcuts */}
      <section className="border-t border-border pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-amber tracking-hud">
            <Terminal className="w-4 h-4" />
            <span>STAGE 4 i18n // ONLINE · STAGE 3 MOTION // ONLINE</span>
          </div>
          <Link
            to={`/${lang}/motion-test`}
            className="font-mono text-xs text-foreground-muted hover:text-amber transition-colors flex items-center gap-1"
          >
            <span>OPEN DIAGNOSTICS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CornerFrame label="SHARED RAF TICKER" sublabel="GSAP + LENIS">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Single Animation Loop</h4>
              <p className="text-xs text-foreground-muted">
                Lenis autoRaf: false driven from gsap.ticker. lagSmoothing(0) ensures zero scroll
                de-sync.
              </p>
            </div>
          </CornerFrame>

          <CornerFrame label="TRILINGUAL i18n" sublabel="EN / 한국어 / বাংলা">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Language-Prefix Routing</h4>
              <p className="text-xs text-foreground-muted">
                URL: /{seedProfile.name.en.split(' ')[0].toLowerCase()}/{lang}/... · instant switch
                · no scroll loss · persisted in localStorage.
              </p>
            </div>
          </CornerFrame>

          <CornerFrame label="ZERO MEMORY LEAKS" sublabel="LIFECYCLE MANAGEMENT">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Deterministic Cleanups</h4>
              <p className="text-xs text-foreground-muted">
                All ScrollTrigger instances, timelines, and ticker callbacks dispose cleanly on
                route navigation.
              </p>
            </div>
          </CornerFrame>
        </div>
      </section>
    </div>
  );
};

// ─── App shell ────────────────────────────────────────────────────────────────

/**
 * Inner routes rendered inside LangRouter (which provides I18nContext).
 * All paths here are relative to /:lang — react-router's nested Routes handles that.
 */
const LangRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePagePreview />} />
        <Route path="/styleguide" element={<StyleguidePage />} />
        <Route path="/motion-test" element={<MotionTestPage />} />
        <Route path="*" element={<HomePagePreview />} />
      </Routes>
    </Layout>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LenisProvider>
        <BrowserRouter>
          <LangRouter>
            <LangRoutes />
          </LangRouter>
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  );
};

export default App;
