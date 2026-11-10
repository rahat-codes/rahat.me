import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@/context';
import { Layout } from '@/components/layout/Layout';
import { StyleguidePage } from '@/pages/StyleguidePage';
import { CornerFrame } from '@/components/common/CornerFrame';
import { LiquidButton } from '@/components/common/LiquidButton';
import { TechBadge } from '@/components/common/TechBadge';
import { seedProfile } from '@/data/seed';
import { Terminal, ArrowRight, BookOpen } from 'lucide-react';

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
              <LiquidButton variant="secondary" size="md" as="a" href="#about">
                Download CV
              </LiquidButton>
              <Link to="/styleguide">
                <LiquidButton variant="outline" size="md" icon={<BookOpen className="w-4 h-4" />}>
                  Explore Styleguide
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

      {/* Stage 2 Component Test Section */}
      <section className="border-t border-border pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-amber tracking-hud">
            <Terminal className="w-4 h-4" />
            <span>STAGE 2 DESIGN SYSTEM // VERIFIED</span>
          </div>
          <Link
            to="/styleguide"
            className="font-mono text-xs text-foreground-muted hover:text-amber transition-colors flex items-center gap-1"
          >
            <span>FULL SPECIFICATION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CornerFrame label="HUD CONTAINER" sublabel="TICKED BORDERS">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Corner Ticks &amp; Micro Labels</h4>
              <p className="text-xs text-foreground-muted">
                1px border with amber corner ticks and configurable labels. Scales fluidly above 1440px.
              </p>
            </div>
          </CornerFrame>

          <CornerFrame label="WCAG 2.2 AA" sublabel="CONTRAST &amp; ACCESSIBILITY">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">High Contrast &amp; Focus Rings</h4>
              <p className="text-xs text-foreground-muted">
                Focus-visible amber rings, skip-to-content keyboard link, and dual charcoal/warm-white palettes.
              </p>
            </div>
          </CornerFrame>

          <CornerFrame label="TRILINGUAL READY" sublabel="EN / KO / BN">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Typographic Isolation</h4>
              <p className="text-xs text-foreground-muted">
                Korean word-break keep-all, Bengali 1.78 line-heights, and zero text overflow down to 360px.
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
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePagePreview />} />
            <Route path="/styleguide" element={<StyleguidePage />} />
            <Route path="*" element={<HomePagePreview />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
