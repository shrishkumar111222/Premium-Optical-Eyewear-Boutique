import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#000000',
          soft: '#111111',
          charcoal: '#252525',
          muted: '#3A3A3A',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          warm: '#FAFAF8',
          soft: '#F4F2ED',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8D7A5',
          deep: '#8C6F16',
          /* Small gold text on warm white: #C9A227 is only 2.4:1, this is 4.9:1. */
          ink: '#7A5F12',
        },
        line: '#E5E5E5',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      letterSpacing: {
        luxe: '0.28em',
        wide2: '0.16em',
      },
      maxWidth: {
        content: '1280px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.08)' },
        },
        'gold-sweep': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slow-zoom': 'slow-zoom 18s ease-out forwards',
        'gold-sweep': 'gold-sweep 7s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
