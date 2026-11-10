import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { LiquidButton } from '@/components/common/LiquidButton';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { MobileNavSheet, type NavItem } from './MobileNavSheet';
import type { SupportedLanguage } from '@/types/portfolio';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'location', label: 'Location', href: '#location' },
];

export interface HeaderProps {
  currentLang?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang = 'en',
  onLanguageChange,
  activeSection = 'hero',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full transition-all duration-300 border-b',
          isScrolled
            ? 'bg-background/85 backdrop-blur-md border-border shadow-sm'
            : 'bg-background/60 backdrop-blur-sm border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Monogram / Avatar */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
          >
            <div className="relative w-8 h-8 rounded-sm bg-surface border border-border group-hover:border-amber transition-colors flex items-center justify-center overflow-hidden">
              <span className="font-mono text-sm font-bold text-amber tracking-wider">R</span>
              <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-amber rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-wider text-foreground group-hover:text-amber transition-colors">
                RAHAT.ME
              </span>
              <span className="font-mono text-[9px] text-foreground-faint tracking-widest hidden sm:inline">
                AI &amp; COMPUTER ENG.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={clsx(
                    'font-mono text-xs tracking-hud transition-colors uppercase relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber rounded-sm',
                    isActive
                      ? 'text-amber font-semibold'
                      : 'text-foreground-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
              className="hidden sm:inline-block"
            />
            <ThemeToggle className="hidden sm:inline-flex" />

            <LiquidButton
              as="a"
              href="#contact"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              Contact
            </LiquidButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="lg:hidden p-2 border border-border bg-surface text-foreground-muted hover:text-amber hover:border-amber rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sheet */}
      <MobileNavSheet
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={NAV_ITEMS}
        activeSection={activeSection}
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
      />
    </>
  );
};
