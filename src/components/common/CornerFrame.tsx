import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CornerFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section' | 'aside';
  label?: string;
  sublabel?: string;
  glowOnHover?: boolean;
  borderVariant?: 'default' | 'subtle' | 'amber';
  cornerSize?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const CornerFrame: React.FC<CornerFrameProps> = ({
  as: Component = 'div',
  label,
  sublabel,
  glowOnHover = false,
  borderVariant = 'default',
  cornerSize = 'md',
  className,
  children,
  ...props
}) => {
  const tickSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
  };

  const borderStyles = {
    default: 'border-border',
    subtle: 'border-border-subtle',
    amber: 'border-amber/40',
  };

  return (
    <Component
      className={twMerge(
        clsx(
          'relative border bg-surface p-5 transition-all duration-300',
          borderStyles[borderVariant],
          glowOnHover && 'hover:border-amber/50 hover:shadow-amber-glow',
          className
        )
      )}
      {...props}
    >
      {/* 4 Corner Ticks */}
      <span
        aria-hidden="true"
        className={clsx(
          'absolute -top-[1px] -left-[1px] border-t-2 border-l-2 border-amber pointer-events-none transition-transform duration-200',
          tickSizes[cornerSize]
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          'absolute -top-[1px] -right-[1px] border-t-2 border-r-2 border-amber pointer-events-none transition-transform duration-200',
          tickSizes[cornerSize]
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          'absolute -bottom-[1px] -left-[1px] border-b-2 border-l-2 border-amber pointer-events-none transition-transform duration-200',
          tickSizes[cornerSize]
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          'absolute -bottom-[1px] -right-[1px] border-b-2 border-r-2 border-amber pointer-events-none transition-transform duration-200',
          tickSizes[cornerSize]
        )}
      />

      {/* Optional Top HUD micro-label */}
      {(label || sublabel) && (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle font-mono text-[11px] uppercase tracking-hud text-foreground-muted select-none">
          {label && (
            <span className="flex items-center gap-1.5 text-foreground/90 font-medium">
              <span className="inline-block w-1.5 h-1.5 bg-amber rounded-sm" />
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-foreground-faint text-[10px]">{sublabel}</span>
          )}
        </div>
      )}

      {children}
    </Component>
  );
};

