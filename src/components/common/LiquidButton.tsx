import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showBrackets?: boolean;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  showBrackets = true,
  className,
  children,
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-xs md:text-sm px-5 py-2.5 gap-2 min-h-[42px]',
    lg: 'text-sm md:text-base px-7 py-3.5 gap-2.5 min-h-[50px]',
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono uppercase tracking-hud font-semibold select-none overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none group';

  const variantStyles = {
    primary:
      'bg-amber text-black border border-amber shadow-amber-glow hover:bg-amber-hover hover:border-amber-hover hover:shadow-amber-glow-lg active:scale-[0.98]',
    secondary:
      'bg-surface-secondary text-foreground border border-border hover:border-amber hover:text-amber active:scale-[0.98]',
    outline:
      'bg-transparent text-foreground border border-border hover:border-amber/80 hover:text-amber active:scale-[0.98]',
    ghost:
      'bg-transparent text-foreground-muted hover:text-foreground hover:bg-surface-secondary/60 active:scale-[0.98]',
  };

  const content = (
    <>
      {/* Corner bracket ticks on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
        {showBrackets && <span className="text-current opacity-40 group-hover:opacity-100 group-hover:text-amber transition-colors">[</span>}
        <span>{children}</span>
        {showBrackets && <span className="text-current opacity-40 group-hover:opacity-100 group-hover:text-amber transition-colors">]</span>}
        {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </span>
    </>
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      {...props}
    >
      {content}
    </button>
  );
};

