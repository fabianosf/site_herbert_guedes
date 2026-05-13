import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Surface scale (semantic: 950 = page bg, ascending = elevated). Theme-aware via CSS vars.
        ink: {
          950: 'rgb(var(--ink-950) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
        },
        // Text scale (50 = strongest, 400 = muted). Theme-aware.
        bone: {
          50: 'rgb(var(--bone-50) / <alpha-value>)',
          100: 'rgb(var(--bone-100) / <alpha-value>)',
          200: 'rgb(var(--bone-200) / <alpha-value>)',
          300: 'rgb(var(--bone-300) / <alpha-value>)',
          400: 'rgb(var(--bone-400) / <alpha-value>)',
        },
        // Subtle contrast color (replaces `white/X` so it also works in light mode).
        chrome: 'rgb(var(--chrome) / <alpha-value>)',
        accent: {
          DEFAULT: '#8b6dff',
          soft: '#6f54e0',
          glow: '#b69bff',
        },
        nebula: {
          violet: '#7c5cff',
          indigo: '#5b6dff',
          pink: '#ff6ec7',
          cyan: '#5ce1ff',
        },
      },
      backgroundImage: {
        nebula:
          'radial-gradient(60% 60% at 30% 20%, rgba(124,92,255,0.25) 0%, transparent 60%), radial-gradient(50% 50% at 75% 30%, rgba(255,110,199,0.18) 0%, transparent 60%), radial-gradient(70% 60% at 50% 90%, rgba(92,225,255,0.12) 0%, transparent 60%)',
        'nebula-soft':
          'radial-gradient(40% 40% at 50% 30%, rgba(124,92,255,0.18) 0%, transparent 70%)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.65' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee 40s linear infinite',
        'pulse-soft': 'pulse-soft 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
