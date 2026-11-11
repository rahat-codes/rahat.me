import React, { useState, useEffect } from 'react';
import { seedSettings } from '@/data/seed';
import { prefersReducedMotion } from '@/lib/motion/tokens';

export const HudStatusStrip: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const statusLines = seedSettings.hudStatusLines.map((line) => line.en);

  // Live Asia/Seoul Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Seoul',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTimeString(formatter.format(now));
      } catch {
        setTimeString(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Crossfading Status Line
  useEffect(() => {
    if (prefersReducedMotion() || statusLines.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % statusLines.length);
        setIsFading(false);
      }, 400);
    }, 4500);

    return () => clearInterval(interval);
  }, [statusLines.length]);

  return (
    <aside
      aria-label="System status bar"
      className="fixed top-0 inset-x-0 h-6 bg-background/90 backdrop-blur-md border-b border-border/60 z-50 pointer-events-none select-none text-[10px] font-mono tracking-widest text-foreground-faint px-4 flex items-center justify-between"
    >
      {/* Left: Geolocation & Coordinate Marker */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" aria-hidden="true" />
        <span className="hidden sm:inline text-foreground-muted">
          SYS.LOC // 35.1278° N, 129.0888° E
        </span>
        <span className="sm:hidden text-foreground-muted">BUSAN, KR</span>
      </div>

      {/* Center: Crossfading Status line */}
      <div
        className={`transition-opacity duration-300 text-foreground-muted text-center font-medium ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span>[ {statusLines[statusIndex]} ]</span>
      </div>

      {/* Right: Live Asia/Seoul Clock */}
      <div className="flex items-center gap-1.5">
        <span className="text-amber font-semibold">{timeString || '00:00:00'}</span>
        <span className="hidden sm:inline text-foreground-faint">KST (UTC+9)</span>
      </div>
    </aside>
  );
};

