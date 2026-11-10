import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { seedProfile } from '@/data/seed';
import type { SupportedLanguage } from '@/types/portfolio';

export interface FooterProps {
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang = 'en',
  onLanguageChange,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border bg-surface text-foreground-muted mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border">
          {/* Brand & Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-amber" />
              <span className="font-mono text-sm font-bold text-foreground tracking-wider">
                RAHAT MD MAHADI HASAN
              </span>
            </div>
            <p className="text-xs text-foreground-muted max-w-md leading-relaxed font-mono">
              AI &amp; Computer Engineering student at Tongmyong University, Busan, South Korea.
              Focusing on computer vision, statistical learning reproducibility, and full-stack systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={seedProfile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="p-2 border border-border bg-surface-secondary text-foreground-muted hover:text-amber hover:border-amber rounded-sm transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={seedProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 border border-border bg-surface-secondary text-foreground-muted hover:text-amber hover:border-amber rounded-sm transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${seedProfile.email}`}
                aria-label="Send direct email"
                className="p-2 border border-border bg-surface-secondary text-foreground-muted hover:text-amber hover:border-amber rounded-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-foreground font-semibold uppercase tracking-hud">
              Navigation
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <a href="#about" className="hover:text-amber transition-colors">
                  01 // About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-amber transition-colors">
                  02 // Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber transition-colors">
                  03 // Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber transition-colors">
                  04 // Projects
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-amber transition-colors">
                  05 // Research
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber transition-colors">
                  06 // Location
                </a>
              </li>
              <li>
                <a href="/styleguide" className="hover:text-amber transition-colors text-amber/80">
                  [!] Styleguide
                </a>
              </li>
            </ul>
          </div>

          {/* System Status & Actions */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs text-foreground font-semibold uppercase tracking-hud">
                Locale &amp; Time
              </h4>
              <div className="mt-2 space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-foreground-muted">KST (UTC+9) · BUSAN</span>
                </div>
                <div className="pt-2">
                  <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-amber transition-colors border border-border bg-surface-secondary px-3 py-2 rounded-sm w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-foreground-faint">
          <p>© {new Date().getFullYear()} Rahat Md Mahadi Hasan. All rights reserved.</p>
          <p className="flex items-center gap-2 text-center sm:text-right">
            <span>Built with React, TypeScript &amp; Firebase</span>
            <span>·</span>
            <span>Zero Tracking Cookies</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
