import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-main)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          secondary: 'var(--bg-surface-sub)',
        },
        border: {
          DEFAULT: 'var(--border-main)',
          subtle: 'var(--border-subtle)',
        },
        foreground: {
          DEFAULT: 'var(--text-main)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          hover: '#FB923C',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        korean: ['var(--font-korean)', 'sans-serif'],
        bengali: ['var(--font-bengali)', 'sans-serif'],
      },
      letterSpacing: {
        hud: '0.12em',
      },
      boxShadow: {
        'amber-glow': '0 0 20px -3px rgba(245, 158, 11, 0.25)',
        'amber-glow-lg': '0 0 35px -5px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
