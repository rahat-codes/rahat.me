import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useLang } from '@/hooks/useLang';
import { LANG_LABELS, SUPPORTED_LANGS } from '@/lib/i18n';
import type { SupportedLang } from '@/lib/i18n';

export interface LanguageSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'compact',
}) => {
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLabel = LANG_LABELS[lang];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (code: SupportedLang) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={clsx('relative inline-block text-left font-mono', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${activeLabel.label}. Select language.`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border bg-surface text-foreground-muted hover:text-foreground hover:border-amber/50 rounded-sm text-xs tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
      >
        <Globe className="w-3.5 h-3.5 text-amber" />
        <span className="font-medium text-foreground">{activeLabel.native}</span>
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
          aria-label="Select language"
          tabIndex={-1}
          className="absolute right-0 mt-1.5 w-40 border border-border bg-surface shadow-amber-glow rounded-sm py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {SUPPORTED_LANGS.map((code) => {
            const opt = LANG_LABELS[code];
            const isSelected = code === lang;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(code)}
                className={clsx(
                  'w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-surface-secondary transition-colors',
                  isSelected
                    ? 'text-amber font-semibold bg-surface-secondary/60'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                <span>{variant === 'compact' ? opt.native : opt.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
