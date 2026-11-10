import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CornerFrame } from './CornerFrame';

export interface HudCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  tag?: string;
  status?: string;
  statusVariant?: 'active' | 'draft' | 'warning';
  interactive?: boolean;
  children: React.ReactNode;
}

export const HudCard: React.FC<HudCardProps> = ({
  title,
  subtitle,
  tag,
  status,
  statusVariant = 'active',
  interactive = false,
  className,
  children,
  ...props
}) => {
  const statusColors = {
    active: 'bg-emerald-400 text-emerald-400',
    draft: 'bg-amber text-amber',
    warning: 'bg-rose-400 text-rose-400',
  };

  return (
    <CornerFrame
      glowOnHover={interactive}
      className={twMerge(
        clsx(
          'flex flex-col justify-between transition-all duration-300',
          interactive && 'hover:-translate-y-0.5 cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {(title || tag || status) && (
        <div className="flex items-start justify-between gap-2 pb-3 mb-4 border-b border-border-subtle">
          <div className="space-y-0.5">
            {tag && (
              <span className="font-mono text-[10px] uppercase tracking-hud text-amber font-medium">
                {tag}
              </span>
            )}
            {title && (
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-foreground-muted font-mono">{subtitle}</p>
            )}
          </div>

          {status && (
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground-faint bg-surface-secondary px-2 py-0.5 rounded-sm border border-border-subtle">
              <span
                className={clsx(
                  'w-1.5 h-1.5 rounded-full',
                  statusColors[statusVariant].split(' ')[0],
                  statusVariant === 'active' && 'animate-pulse'
                )}
                aria-hidden="true"
              />
              <span>{status}</span>
            </div>
          )}
        </div>
      )}

      <div className="text-sm text-foreground-muted leading-relaxed">{children}</div>
    </CornerFrame>
  );
};

