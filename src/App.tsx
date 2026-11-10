import React from 'react';
import { Terminal, Shield, Globe, Cpu } from 'lucide-react';
import { seedProfile } from '@/data/seed';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground bg-hud-grid flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full p-8 bg-surface border border-border corner-ticks shadow-amber-glow relative">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber" />
            <span className="font-mono text-xs tracking-hud text-foreground-muted uppercase">
              RAHAT.ME // KERNEL SCAFFOLD
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-foreground-muted">STAGE 1 READY</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {seedProfile.name.en}
          </h1>
          <p className="text-amber font-mono text-sm">
            {seedProfile.title.en} · {seedProfile.location.en}
          </p>
          <p className="text-foreground-muted text-base leading-relaxed">
            {seedProfile.tagline.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
          <div className="p-3 bg-surface-secondary border border-border-subtle rounded flex items-center gap-3">
            <Globe className="w-4 h-4 text-amber" />
            <span className="font-mono text-xs text-foreground-muted">Trilingual EN/KO/BN</span>
          </div>
          <div className="p-3 bg-surface-secondary border border-border-subtle rounded flex items-center gap-3">
            <Cpu className="w-4 h-4 text-amber" />
            <span className="font-mono text-xs text-foreground-muted">Lenis + GSAP Loop</span>
          </div>
          <div className="p-3 bg-surface-secondary border border-border-subtle rounded flex items-center gap-3">
            <Shield className="w-4 h-4 text-amber" />
            <span className="font-mono text-xs text-foreground-muted">Vercel + Firebase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
