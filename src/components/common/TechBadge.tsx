import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TechBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'amber' | 'outline' | 'success' | 'muted';
  size?: 'sm' | 'md';
  dot?: boolean;
  dotPulse?: boolean;
  level?: number; // 1 to 5 dots
  children: React.ReactNode;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  dotPulse = false,
  level,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-surface-secondary text-foreground/90 border-border-subtle',
    amber: 'bg-amber/10 text-amber border-amber/30',
    outline: 'bg-transparent text-foreground-muted border-border hover:border-foreground-muted',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    muted: 'bg-surface text-foreground-faint border-border-subtle',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wider',
  };

  const dotColors = {
    default: 'bg-foreground-muted',
    amber: 'bg-amber',
    outline: 'bg-foreground-muted',
    success: 'bg-emerald-400',
    muted: 'bg-foreground-faint',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-mono uppercase border rounded-sm font-medium transition-colors select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            'inline-block w-1.5 h-1.5 rounded-full',
            dotColors[variant],
            dotPulse && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      {level !== undefined && (
        <span className="flex items-center gap-0.5 ml-1" aria-label={`Proficiency level ${level} out of 5`}>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <span
              key={lvl}
              className={clsx(
                'w-1 h-2 rounded-[1px]',
                lvl <= level ? 'bg-amber' : 'bg-border'
              )}
            />
          ))}
        </span>
      )}
    </span>
  );
};

