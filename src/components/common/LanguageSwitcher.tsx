import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Info } from 'lucide-react';
import { clsx } from 'clsx';
import type { SupportedLanguage } from '@/types/portfolio';

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  native: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'ko', label: '한국어', native: '한국어' },
  { code: 'bn', label: 'বাংলা', native: 'বাংলা' },
];

export interface LanguageSwitcherProps {
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  className?: string;
  variant?: 'compact' | 'full';
}

/**
 * Stage 2 Language Switcher:
 * NOTE: Full trilingual i18n routing (/:lang/*) and dynamic react-i18next dictionary
 * swapping will be implemented in Stage 4.
 * In Stage 2, this component renders the accessible HUD UI with an explicit Stage 4 indicator.
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang = 'en',
  onLanguageChange,
  className,
  variant = 'compact',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stageNotice, setStageNotice] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setStageNotice(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setStageNotice(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    // Stage 2 indicator: Notify that full i18n routing activates in Stage 4
    setStageNotice(true);
    onLanguageChange?.(code);
    setTimeout(() => {
      setIsOpen(false);
      setStageNotice(false);
    }, 1200);
  };

  return (
    <div ref={dropdownRef} className={clsx('relative inline-block text-left font-mono', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language (i18n routing active in Stage 4)"
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border bg-surface text-foreground-muted hover:text-foreground hover:border-amber/50 rounded-sm text-xs tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
      >
        <Globe className="w-3.5 h-3.5 text-amber" />
        <span className="font-medium text-foreground">{activeOption.native}</span>
        <ChevronDown
          className={clsx(
            'w-3 h-3 text-foreground-faint transition-transform duration-200',
            isOpen && 'rotate-180 text-amber'
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute right-0 mt-1.5 w-44 border border-border bg-surface shadow-amber-glow rounded-sm py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-2.5 py-1 mb-1 border-b border-border-subtle flex items-center gap-1 text-[10px] text-amber font-semibold tracking-wider">
            <Info className="w-3 h-3" />
            <span>STAGE 4 i18n PREVIEW</span>
          </div>

          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(lang.code)}
                className={clsx(
                  'w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-surface-secondary transition-colors',
                  isSelected ? 'text-amber font-semibold bg-surface-secondary/60' : 'text-foreground-muted hover:text-foreground'
                )}
              >
                <span>{variant === 'compact' ? lang.native : lang.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
                )}
              </button>
            );
          })}

          {stageNotice && (
            <div className="mt-1 px-2.5 py-1 border-t border-border-subtle bg-surface-secondary/70 text-[10px] text-foreground-muted leading-tight">
              Routing activates in Stage 4
            </div>
          )}
        </div>
      )}
    </div>
  );
};
