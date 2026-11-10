import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { LiquidButton } from '@/components/common/LiquidButton';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import type { SupportedLanguage } from '@/types/portfolio';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface MobileNavSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeSection?: string;
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const MobileNavSheet: React.FC<MobileNavSheetProps> = ({
  isOpen,
  onClose,
  items,
  activeSection,
  currentLang = 'en',
  onLanguageChange,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-surface border-l border-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
              <span className="font-mono text-xs tracking-hud text-foreground font-semibold">
                SYS.NAV // MENU
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="p-1.5 border border-border text-foreground-muted hover:text-amber hover:border-amber rounded-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1">
            {items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    'flex items-center justify-between px-3 py-2.5 rounded-sm font-mono text-sm tracking-wider transition-colors',
                    isActive
                      ? 'text-amber bg-surface-secondary border-l-2 border-amber font-semibold'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface-secondary/50'
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between gap-3">
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
            <ThemeToggle />
          </div>

          <LiquidButton
            as="a"
            href="#contact"
            variant="primary"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            Contact
          </LiquidButton>

          <p className="font-mono text-[10px] text-center text-foreground-faint tracking-wider">
            TONGMYONG UNIV · BUSAN
          </p>
        </div>
      </div>
    </div>
  );
};
