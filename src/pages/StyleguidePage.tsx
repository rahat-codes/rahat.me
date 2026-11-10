import React, { useState } from 'react';
import {
  Terminal,
  Shield,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { CornerFrame } from '@/components/common/CornerFrame';
import { LiquidButton } from '@/components/common/LiquidButton';
import { TechBadge } from '@/components/common/TechBadge';
import { HudCard } from '@/components/common/HudCard';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useTheme } from '@/hooks/useTheme';
import type { SupportedLanguage } from '@/types/portfolio';

export const StyleguidePage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');

  return (
    <div className="min-h-screen bg-background text-foreground bg-hud-grid py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Styleguide Header */}
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amber uppercase tracking-hud">
              <Terminal className="w-4 h-4" />
              <span>DESIGN SYSTEM SPECIFICATION // V1.0</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              HUD &amp; Technical Styleguide
            </h1>
            <p className="text-sm text-foreground-muted font-mono mt-1">
              Active Theme: <span className="text-amber font-semibold uppercase">{theme}</span> · Target: WCAG 2.2 AA Contrast Compliant
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLang={selectedLang} onLanguageChange={setSelectedLang} />
            <ThemeToggle />
            <LiquidButton as="a" href="/" variant="secondary" size="sm">
              Back to Home
            </LiquidButton>
          </div>
        </div>

        {/* Section 1: Color Tokens */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Layers className="w-4 h-4 text-amber" />
            <h2 className="font-mono text-sm uppercase tracking-hud font-semibold text-foreground">
              01 // Design Tokens &amp; Theme Palettes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-background border border-border rounded-sm space-y-2">
              <div className="w-full h-12 bg-background border border-border rounded-sm" />
              <div className="font-mono text-xs">
                <p className="font-semibold text-foreground">Background</p>
                <p className="text-[10px] text-foreground-faint">#0E0F11 / #F7F7F6</p>
              </div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-sm space-y-2">
              <div className="w-full h-12 bg-surface border border-border rounded-sm" />
              <div className="font-mono text-xs">
                <p className="font-semibold text-foreground">Surface</p>
                <p className="text-[10px] text-foreground-faint">#16181B / #FFFFFF</p>
              </div>
            </div>

            <div className="p-4 bg-surface-secondary border border-border rounded-sm space-y-2">
              <div className="w-full h-12 bg-surface-secondary border border-border-subtle rounded-sm" />
              <div className="font-mono text-xs">
                <p className="font-semibold text-foreground">Surface Sub</p>
                <p className="text-[10px] text-foreground-faint">#1F2227 / #EFEFEF</p>
              </div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-sm space-y-2">
              <div className="w-full h-12 bg-border rounded-sm" />
              <div className="font-mono text-xs">
                <p className="font-semibold text-foreground">Border 1px</p>
                <p className="text-[10px] text-foreground-faint">#23262B / #E2E2E0</p>
              </div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-sm space-y-2">
              <div className="w-full h-12 bg-amber rounded-sm shadow-amber-glow" />
              <div className="font-mono text-xs">
                <p className="font-semibold text-amber">Accent Amber</p>
                <p className="text-[10px] text-foreground-faint">Text AAA &gt; 7.0:1</p>
              </div>
            </div>

            <div className="p-4 bg-surface border border-border rounded-sm space-y-2">
              <div className="w-full h-12 bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold rounded-sm">
                Aa
              </div>
              <div className="font-mono text-xs">
                <p className="font-semibold text-foreground">Foreground</p>
                <p className="text-[10px] text-foreground-faint">AAA &gt; 15.0:1</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Trilingual Typography */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Cpu className="w-4 h-4 text-amber" />
            <h2 className="font-mono text-sm uppercase tracking-hud font-semibold text-foreground">
              02 // Trilingual Typography Specimens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CornerFrame label="EN // LATIN SPECIMEN" sublabel="INTER + JETBRAINS">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">
                  Building reliable AI systems and the apps around them.
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Rigorous nested cross-validation, computer vision pipelines, and full-stack architecture built for real deployments.
                </p>
                <p className="font-mono text-[11px] text-amber">
                  LAT 35.1278° N · LON 129.0888° E · KST
                </p>
              </div>
            </CornerFrame>

            <CornerFrame label="KO // 한국어 서체" sublabel="PRETENDARD / NOTO SANS KR">
              <div className="space-y-3" lang="ko">
                <h3 className="text-xl font-bold text-foreground">
                  신뢰할 수 있는 AI 시스템과 이를 둘러싼 애플리케이션을 구축합니다.
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  단일 분할의 착시를 넘어, 50회 반복 중첩 교차 검증과 통계적 유의성 검정을 거친 견고한 인공지능 엔지니어링을 지향합니다.
                </p>
                <p className="font-mono text-[11px] text-amber">
                  부산광역시 남구 신선로 428 동명대학교
                </p>
              </div>
            </CornerFrame>

            <CornerFrame label="BN // বাংলা টাইপোগ্রাফি" sublabel="NOTO SANS BENGALI (LH 1.78)">
              <div className="space-y-3" lang="bn">
                <h3 className="text-xl font-bold text-foreground">
                  নির্ভরযোগ্য এআই সিস্টেম এবং তার চারপাশের অ্যাপ্লিকেশন তৈরি করছি।
                </h3>
                <p className="text-xs text-foreground-muted leading-[1.78]">
                  পরিসংখ্যানভিত্তিক মেশিন লার্নিং, কম্পিউটার ভিশন এবং অফলাইন-ফার্স্ট মোবাইল সিস্টেমের সমন্বয়ে বাস্তব সমস্যার টেকসই সমাধান।
                </p>
                <p className="font-mono text-[11px] text-amber">
                  টংমিয়ং বিশ্ববিদ্যালয় · বুসান, দক্ষিণ কোরিয়া
                </p>
              </div>
            </CornerFrame>
          </div>
        </section>

        {/* Section 3: Liquid Buttons */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Terminal className="w-4 h-4 text-amber" />
            <h2 className="font-mono text-sm uppercase tracking-hud font-semibold text-foreground">
              03 // Liquid Buttons &amp; Interactive Controls
            </h2>
          </div>

          <div className="p-6 bg-surface border border-border corner-ticks space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Button Variants</p>
              <div className="flex flex-wrap items-center gap-4">
                <LiquidButton variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  View Projects
                </LiquidButton>

                <LiquidButton variant="secondary" icon={<Download className="w-4 h-4" />}>
                  Download CV
                </LiquidButton>

                <LiquidButton variant="outline" icon={<ExternalLink className="w-4 h-4" />}>
                  Live Demo
                </LiquidButton>

                <LiquidButton variant="ghost">
                  Ghost Action
                </LiquidButton>

                <LiquidButton variant="primary" disabled>
                  Disabled
                </LiquidButton>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border-subtle">
              <p className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Size Scale</p>
              <div className="flex flex-wrap items-center gap-4">
                <LiquidButton size="sm" variant="secondary">
                  Small Button
                </LiquidButton>
                <LiquidButton size="md" variant="secondary">
                  Medium Button
                </LiquidButton>
                <LiquidButton size="lg" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Large Primary CTA
                </LiquidButton>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tech Badges & Chips */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Shield className="w-4 h-4 text-amber" />
            <h2 className="font-mono text-sm uppercase tracking-hud font-semibold text-foreground">
              04 // Tech Badges, Chips &amp; Level Indicators
            </h2>
          </div>

          <div className="p-6 bg-surface border border-border corner-ticks space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Variants &amp; Status</p>
              <div className="flex flex-wrap gap-2.5">
                <TechBadge variant="default">TypeScript</TechBadge>
                <TechBadge variant="amber" dot dotPulse>Active Project</TechBadge>
                <TechBadge variant="success" dot>Published Paper</TechBadge>
                <TechBadge variant="outline">Docker</TechBadge>
                <TechBadge variant="muted">Archived</TechBadge>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border-subtle">
              <p className="font-mono text-xs text-foreground-muted uppercase tracking-wider">Proficiency Levels (1 - 5)</p>
              <div className="flex flex-wrap gap-3">
                <TechBadge variant="default" level={5}>Python</TechBadge>
                <TechBadge variant="default" level={5}>Statistical Learning</TechBadge>
                <TechBadge variant="default" level={4}>FastAPI</TechBadge>
                <TechBadge variant="default" level={4}>Flutter / Dart</TechBadge>
                <TechBadge variant="default" level={4}>C++ Embedded</TechBadge>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: HUD Cards & Frames */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <Layers className="w-4 h-4 text-amber" />
            <h2 className="font-mono text-sm uppercase tracking-hud font-semibold text-foreground">
              05 // HUD Corner Frames &amp; Cards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HudCard
              tag="PROJECT // 01"
              title="DOB Attendance"
              subtitle="React · FastAPI · PostgreSQL"
              status="Live"
              statusVariant="active"
              interactive
            >
              <p>
                QR-based token attendance system with anti-proxy validation and monthly membership engagement tracking.
              </p>
            </HudCard>

            <HudCard
              tag="RESEARCH // FEATURED"
              title="Single-Split Illusions"
              subtitle="Nadeau-Bengio Corrected Testing"
              status="Preprint"
              statusVariant="draft"
              interactive
            >
              <p>
                Cross-dataset re-evaluation uncovering 97% accuracy anomalies via 50-fold repeated nested cross-validation.
              </p>
            </HudCard>

            <HudCard
              tag="EXPERIENCE // 2026"
              title="Den of Builders (DOB)"
              subtitle="President &amp; Co-Founder"
              status="Ongoing"
              statusVariant="active"
              interactive
            >
              <p>
                Leading Tongmyong University student developer community, organizing workshops and AI study cohorts.
              </p>
            </HudCard>
          </div>
        </section>

        {/* Section 6: 360px Mobile Guard Test Box */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="font-mono text-sm uppercase tracking-hud font-semibold text-foreground">
              06 // 360px Viewport Guard Simulation
            </h2>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-foreground-muted font-mono">
              The container below is clamped to precisely 360px width to prove zero horizontal scrolling, no clipped Korean words, and proper line wrapping:
            </p>
            <div className="w-[360px] max-w-full mx-auto p-4 bg-surface border-2 border-amber/60 corner-ticks space-y-4 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-border pb-2">
                <span className="text-amber">360px VIEWPORT TEST</span>
                <span className="text-emerald-400">NO OVERFLOW</span>
              </div>
              <h4 className="text-sm font-bold text-foreground">
                라하트 마하디 하산 (AI &amp; Computer Engineering)
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed" lang="ko">
                신뢰할 수 있는 AI 시스템과 이를 둘러싼 애플리케이션을 구축합니다. 단어 중간 줄바꿈 방지 적용.
              </p>
              <div className="flex items-center gap-2">
                <LiquidButton size="sm" variant="primary" className="w-full">
                  Contact Me
                </LiquidButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

