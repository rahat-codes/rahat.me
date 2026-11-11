import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CornerFrame } from '@/components/common/CornerFrame';
import { LiquidButton } from '@/components/common/LiquidButton';
import { TechBadge } from '@/components/common/TechBadge';
import { useLenis } from '@/hooks/useLenis';
import { getLenisDiagnosticStats } from '@/lib/motion/diagnostics';
import { scrambleText, type ScrambleController } from '@/lib/motion/scrambleText';
import { countUp } from '@/lib/motion/countUp';
import { drawPath } from '@/lib/motion/drawPath';
import { focusList, type FocusListController } from '@/lib/motion/focusList';
import { pixelTransition } from '@/lib/motion/pixelTransition';
import { Activity, RefreshCw, Terminal, Play, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const MotionTestPage: React.FC = () => {
  const { refresh, lenis } = useLenis();
  const [diagnostics, setDiagnostics] = useState({
    triggerCount: 0,
    instanceCount: 0,
    hasTicker: false,
    scrollPos: 0,
  });

  // Diagnostics Poller
  useEffect(() => {
    const updateStats = () => {
      const stats = getLenisDiagnosticStats();
      setDiagnostics({
        triggerCount: ScrollTrigger.getAll().length,
        instanceCount: stats.instanceCount,
        hasTicker: stats.hasActiveTicker,
        scrollPos: Math.round(window.scrollY),
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 500);
    return () => clearInterval(interval);
  }, []);

  // 1. Scramble Text Test
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const scrambleCtrlRef = useRef<ScrambleController | null>(null);

  const runScramble = () => {
    if (!scrambleRef.current) return;
    scrambleCtrlRef.current?.kill();
    scrambleCtrlRef.current = scrambleText(
      scrambleRef.current,
      'RAHAT MD MAHADI HASAN // AI & COMPUTER ENGINEERING'
    );
  };

  useEffect(() => {
    runScramble();
    return () => {
      scrambleCtrlRef.current?.kill();
    };
  }, []);

  // 2. CountUp Test
  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);
  const count3Ref = useRef<HTMLSpanElement>(null);
  const count4Ref = useRef<HTMLSpanElement>(null);

  const runCounters = () => {
    if (count1Ref.current) countUp(count1Ref.current, 6, { prefix: '0' });
    if (count2Ref.current) countUp(count2Ref.current, 4, { prefix: '0' });
    if (count3Ref.current) countUp(count3Ref.current, 5, { prefix: '0' });
    if (count4Ref.current) countUp(count4Ref.current, 12, { suffix: '+' });
  };

  useEffect(() => {
    runCounters();
  }, []);

  // 3. SVG Living Circuit Draw Path Test
  const circuitPathRef = useRef<SVGPathElement>(null);
  const circuitContainerRef = useRef<HTMLDivElement>(null);
  const circuitTipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = circuitPathRef.current;
    const trigger = circuitContainerRef.current;
    const tip = circuitTipRef.current;
    if (!path || !trigger) return;

    const tween = drawPath(path, {
      trigger,
      start: 'top 75%',
      end: 'bottom 25%',
      scrub: 0.5,
      tipElement: tip,
    });

    return () => {
      tween?.kill();
    };
  }, []);

  // 4. Focus List Scrub Test
  const focusContainerRef = useRef<HTMLDivElement>(null);
  const focusItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFocusIndex, setActiveFocusIndex] = useState(0);

  useEffect(() => {
    const container = focusContainerRef.current;
    const validItems = focusItemsRef.current.filter((it): it is HTMLDivElement => it !== null);
    if (!container || validItems.length === 0) return;

    const ctrl: FocusListController = focusList({
      container,
      items: validItems,
      onActiveChange: (idx) => setActiveFocusIndex(idx),
    });

    return () => {
      ctrl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground bg-hud-grid pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header & Navigation */}
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber uppercase tracking-hud mb-1">
              <Activity className="w-4 h-4" />
              <span>MOTION FOUNDATION TEST &amp; DIAGNOSTICS</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Motion System Sandbox
            </h1>
            <p className="text-sm text-foreground-muted font-mono mt-1">
              Validating Lenis + GSAP unified ticker, zero memory leaks, and composable motion helpers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/styleguide">
              <LiquidButton variant="secondary" size="sm">
                To Styleguide
              </LiquidButton>
            </Link>
            <Link to="/">
              <LiquidButton variant="outline" size="sm">
                To Home
              </LiquidButton>
            </Link>
          </div>
        </div>

        {/* 1. Diagnostics Panel (Requirement 5) */}
        <section aria-labelledby="diagnostics-heading">
          <CornerFrame
            label="DIAGNOSTICS // ENGINE TELEMETRY"
            sublabel="GSAP TICKER &amp; LENIS STATE"
            borderVariant="amber"
            className="shadow-amber-glow"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div className="p-3 bg-surface-secondary border border-border-subtle rounded-sm">
                <p className="font-mono text-[10px] text-foreground-faint uppercase">ScrollTrigger Count</p>
                <p className="font-mono text-2xl font-bold text-amber mt-1">
                  {diagnostics.triggerCount}
                </p>
              </div>

              <div className="p-3 bg-surface-secondary border border-border-subtle rounded-sm">
                <p className="font-mono text-[10px] text-foreground-faint uppercase">Lenis Instances</p>
                <p className="font-mono text-2xl font-bold text-foreground mt-1">
                  {diagnostics.instanceCount} <span className="text-xs text-emerald-400 font-normal">[SINGLE]</span>
                </p>
              </div>

              <div className="p-3 bg-surface-secondary border border-border-subtle rounded-sm">
                <p className="font-mono text-[10px] text-foreground-faint uppercase">Shared RAF Ticker</p>
                <p className="font-mono text-2xl font-bold text-foreground mt-1">
                  {diagnostics.hasTicker ? (
                    <span className="text-emerald-400 text-lg">CONNECTED</span>
                  ) : (
                    <span className="text-rose-400 text-lg">STANDALONE</span>
                  )}
                </p>
              </div>

              <div className="p-3 bg-surface-secondary border border-border-subtle rounded-sm">
                <p className="font-mono text-[10px] text-foreground-faint uppercase">Scroll Position</p>
                <p className="font-mono text-2xl font-bold text-foreground mt-1">
                  {diagnostics.scrollPos}px
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border-subtle">
              <p className="font-mono text-xs text-foreground-muted">
                Lenis Status: {lenis ? 'Active & Driving RAF' : 'Ready'} · lagSmoothing(0)
              </p>
              <LiquidButton
                variant="primary"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={() => {
                  refresh();
                  setDiagnostics((prev) => ({
                    ...prev,
                    triggerCount: ScrollTrigger.getAll().length,
                  }));
                }}
              >
                Force Recalculate
              </LiquidButton>
            </div>
          </CornerFrame>
        </section>

        {/* 2. Scramble Text Decoder Test */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <h2 className="font-mono text-xs uppercase tracking-hud text-foreground font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber" />
              <span>01 // Accessible Text Scramble Decoder</span>
            </h2>
            <LiquidButton
              variant="secondary"
              size="sm"
              icon={<Play className="w-3.5 h-3.5" />}
              onClick={runScramble}
            >
              Replay Decode
            </LiquidButton>
          </div>

          <div
            className="p-8 bg-surface border border-border corner-ticks flex flex-col justify-center min-h-[120px]"
            aria-label="RAHAT MD MAHADI HASAN // AI & COMPUTER ENGINEERING"
          >
            <span
              ref={scrambleRef}
              aria-hidden="true"
              className="font-mono text-lg sm:text-2xl text-amber font-bold tracking-widest"
            >
              INITIALIZING DECODE...
            </span>
            <p className="font-mono text-[11px] text-foreground-faint mt-2">
              Accessible pattern: real text remains readable by screen-readers; optical scramble renders in aria-hidden layer.
            </p>
          </div>
        </section>

        {/* 3. CountUp Animation Test */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <h2 className="font-mono text-xs uppercase tracking-hud text-foreground font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber" />
              <span>02 // Stat Counters (countUp helper)</span>
            </h2>
            <LiquidButton
              variant="secondary"
              size="sm"
              icon={<Play className="w-3.5 h-3.5" />}
              onClick={runCounters}
            >
              Replay Counts
            </LiquidButton>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CornerFrame label="ACADEMIC" sublabel="ENROLLED">
              <p className="font-mono text-3xl font-bold text-foreground">
                <span ref={count1Ref}>06</span>
              </p>
              <p className="font-mono text-xs text-foreground-muted mt-1">Completed Semesters</p>
            </CornerFrame>

            <CornerFrame label="HONORS" sublabel="ACADEMIC">
              <p className="font-mono text-3xl font-bold text-amber">
                <span ref={count2Ref}>04</span>
              </p>
              <p className="font-mono text-xs text-foreground-muted mt-1">Dean&apos;s List Awards</p>
            </CornerFrame>

            <CornerFrame label="CODEBASES" sublabel="VERIFIED">
              <p className="font-mono text-3xl font-bold text-foreground">
                <span ref={count3Ref}>05</span>
              </p>
              <p className="font-mono text-xs text-foreground-muted mt-1">Major Projects</p>
            </CornerFrame>

            <CornerFrame label="CREDENTIALS" sublabel="ISSUED">
              <p className="font-mono text-3xl font-bold text-foreground">
                <span ref={count4Ref}>12+</span>
              </p>
              <p className="font-mono text-xs text-foreground-muted mt-1">Certifications</p>
            </CornerFrame>
          </div>
        </section>

        {/* 4. Living Circuit SVG Draw Path Scrub */}
        <section className="space-y-4">
          <div className="border-b border-border-subtle pb-2">
            <h2 className="font-mono text-xs uppercase tracking-hud text-foreground font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber" />
              <span>03 // Living Circuit SVG Path Draw (Scroll Scrub)</span>
            </h2>
          </div>

          <div
            ref={circuitContainerRef}
            className="p-6 bg-surface border border-border corner-ticks relative overflow-hidden"
          >
            <p className="font-mono text-xs text-foreground-muted mb-4">
              Scroll down to scrub the SVG circuit line drawn by stroke-dashoffset:
            </p>
            <div className="relative h-64 flex items-center justify-center">
              <svg viewBox="0 0 800 200" className="w-full h-full" fill="none">
                {/* Background track */}
                <path
                  d="M 50 100 H 250 L 320 40 H 500 L 570 160 H 750"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
                {/* Scrubbed draw path */}
                <path
                  ref={circuitPathRef}
                  d="M 50 100 H 250 L 320 40 H 500 L 570 160 H 750"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              {/* Circuit tip follower */}
              <div
                ref={circuitTipRef}
                className="absolute w-3 h-3 rounded-full bg-amber shadow-amber-glow pointer-events-none -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </section>

        {/* 5. Focus List Scroll Scrub */}
        <section className="space-y-4">
          <div className="border-b border-border-subtle pb-2">
            <h2 className="font-mono text-xs uppercase tracking-hud text-foreground font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber" />
              <span>04 // Scroll-Scrubbed Focus List (Center Row Highlight)</span>
            </h2>
          </div>

          <div
            ref={focusContainerRef}
            className="p-6 bg-surface border border-border corner-ticks space-y-4"
          >
            <p className="font-mono text-xs text-foreground-muted mb-4">
              As you scroll through this list, the row closest to the viewport center line lights up while others dim:
            </p>

            {[
              { id: '01', title: 'DOB Attendance', tech: 'React · FastAPI · PostgreSQL' },
              { id: '02', title: 'CampusAR', tech: 'Flutter · Dart · A* Search' },
              { id: '03', title: 'Chicken Disease Classification', tech: 'Python · Deep Learning · DVC' },
              { id: '04', title: 'Adaptive Smart Desk', tech: 'C++ · Sensors · PWM' },
              { id: '05', title: 'Automotive Classification Code', tech: 'Python · scikit-learn · 50-Fold CV' },
            ].map((proj, idx) => (
              <div
                key={proj.id}
                ref={(el) => {
                  focusItemsRef.current[idx] = el;
                }}
                className={`p-4 border rounded-sm transition-all duration-300 ${
                  activeFocusIndex === idx
                    ? 'border-amber bg-surface-secondary/80'
                    : 'border-border-subtle bg-surface/50 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-amber font-semibold">
                      [{proj.id}] // {proj.title}
                    </span>
                    <p className="font-mono text-xs text-foreground-muted mt-0.5">{proj.tech}</p>
                  </div>
                  {activeFocusIndex === idx && (
                    <TechBadge variant="amber" size="sm" dot dotPulse>
                      IN FOCUS
                    </TechBadge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Pixel Transition Test */}
        <section className="space-y-4">
          <div className="border-b border-border-subtle pb-2 flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-hud text-foreground font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber" />
              <span>05 // Pixel Grid Transition (Route Dissolve)</span>
            </h2>
            <LiquidButton
              variant="primary"
              size="sm"
              onClick={() => pixelTransition({ rows: 8, cols: 12 })}
            >
              Trigger Pixel Transition
            </LiquidButton>
          </div>
        </section>
      </div>
    </div>
  );
};
