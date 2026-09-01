import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0f',
        secondary: '#0f0f1a',
        tertiary: '#14141f',
        cyan: '#22d3ee',
        blue: '#3b82f6',
        indigo: '#6366f1',
        purple: '#8b5cf6',
        violet: '#a855f7',
        magenta: '#d946ef',
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(34,211,238,0.15)',
        'glow-purple': '0 0 40px rgba(139,92,246,0.15)',
        'glow-magenta': '0 0 40px rgba(217,70,239,0.12)',
        'glow-combined': '0 8px 32px rgba(139,92,246,0.12), 0 0 60px rgba(34,211,238,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;