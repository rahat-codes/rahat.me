import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@/context';
import { LenisProvider } from '@/context/LenisProvider';
import { Layout } from '@/components/layout/Layout';
import { StyleguidePage } from '@/pages/StyleguidePage';
import { MotionTestPage } from '@/pages/MotionTestPage';
import { CornerFrame } from '@/components/common/CornerFrame';
import { LiquidButton } from '@/components/common/LiquidButton';
import { TechBadge } from '@/components/common/TechBadge';
import { seedProfile } from '@/data/seed';
import { Terminal, ArrowRight, BookOpen, Activity } from 'lucide-react';

const HomePagePreview: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Preview Frame */}
      <section className="relative pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <TechBadge variant="amber" size="sm" dot>
                {seedProfile.currentlyChip.en}
              </TechBadge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {seedProfile.name.en}
              </h1>
              <p className="font-mono text-sm sm:text-base text-amber tracking-wider">
                {seedProfile.heroRoles.map((r) => r.en).join(' · ')}
              </p>
              <p className="text-lg text-foreground-muted max-w-xl leading-relaxed">
                {seedProfile.tagline.en}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <LiquidButton variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                View Projects
              </LiquidButton>
              <Link to="/motion-test">
                <LiquidButton variant="secondary" size="md" icon={<Activity className="w-4 h-4" />}>
                  Motion Test Engine
                </LiquidButton>
              </Link>
              <Link to="/styleguide">
                <LiquidButton variant="outline" size="md" icon={<BookOpen className="w-4 h-4" />}>
                  Styleguide
                </LiquidButton>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Portrait Card Placeholder with 4:5 ratio and HUD Corner Frame */}
            <CornerFrame
              label="SYS.PORTRAIT // 4:5"
              sublabel="PUBLIC // ASSET"
              cornerSize="lg"
              className="w-full max-w-sm aspect-[4/5] p-3 flex flex-col justify-between overflow-hidden shadow-amber-glow"
            >
              <picture className="w-full h-full block relative bg-surface-secondary rounded-sm overflow-hidden border border-border-subtle">
                <img
                  src="/images/profile-hero-4x5.svg"
                  alt={`${seedProfile.name.en} - Profile Portrait`}
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
            <span>STAGE 3 MOTION FOUNDATION // ONLINE</span>
          </div>
          <Link
            to="/motion-test"
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
                Lenis autoRaf: false driven from gsap.ticker. lagSmoothing(0) ensures zero scroll de-sync.
              </p>
            </div>
          </CornerFrame>

          <CornerFrame label="AMBIENT UI" sublabel="CUSTOM CURSOR &amp; HUD">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Seoul Time &amp; Cursor Dot</h4>
              <p className="text-xs text-foreground-muted">
                Live Asia/Seoul clock and crossfading status lines in the top HUD strip. Pointer-events none.
              </p>
            </div>
          </CornerFrame>

          <CornerFrame label="ZERO MEMORY LEAKS" sublabel="LIFECYCLE MANAGEMENT">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Deterministic Cleanups</h4>
              <p className="text-xs text-foreground-muted">
                All ScrollTrigger instances, timelines, and ticker callbacks dispose cleanly on route navigation.
              </p>
            </div>
          </CornerFrame>
        </div>
      </section>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LenisProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePagePreview />} />
              <Route path="/styleguide" element={<StyleguidePage />} />
              <Route path="/motion-test" element={<MotionTestPage />} />
              <Route path="*" element={<HomePagePreview />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  );
};

export default App;
