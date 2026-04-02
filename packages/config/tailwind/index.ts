import type { Config } from 'tailwindcss';

export const aqpTailwindPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        // Cabinet palette
        navy: {
          50: '#E8ECF3',
          100: '#C5CEDF',
          200: '#9EAFC8',
          300: '#7790B1',
          400: '#5A799F',
          500: '#3D628D',
          600: '#2E4D73',
          700: '#1B2A4A', // Primary
          800: '#131E35',
          900: '#0B1220',
        },
        gold: {
          50: '#FBF6E8',
          100: '#F5E8C2',
          200: '#EED998',
          300: '#E6C96D',
          400: '#D9B85A',
          500: '#C9A84C', // Accent
          600: '#B89440',
          700: '#9A7A34',
          800: '#7C6229',
          900: '#5E4A1F',
        },
        // Foundation palette
        forest: {
          50: '#E8F3EB',
          100: '#C5DFCC',
          200: '#9EC8A9',
          300: '#77B186',
          400: '#5A9F6C',
          500: '#3D8D52',
          600: '#2E7340',
          700: '#1B4A2A', // Foundation primary
          800: '#13351E',
          900: '#0B2012',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Foundation accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Shared neutrals
        slate: {
          50: '#F8FAFC',  // Fond blanc cassé
          100: '#F1F5F9',
          200: '#E2E8F0', // Dark mode text
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155', // Main text color
          800: '#1E293B',
          900: '#0F172A',
          950: '#0D1117', // Dark mode background
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.3' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(27, 42, 74, 0.1), 0 2px 4px -2px rgba(27, 42, 74, 0.1)',
        'premium-lg': '0 10px 15px -3px rgba(27, 42, 74, 0.1), 0 4px 6px -4px rgba(27, 42, 74, 0.1)',
        'premium-xl': '0 20px 25px -5px rgba(27, 42, 74, 0.1), 0 8px 10px -6px rgba(27, 42, 74, 0.1)',
        'gold': '0 4px 14px 0 rgba(201, 168, 76, 0.25)',
        'gold-lg': '0 10px 25px 0 rgba(201, 168, 76, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default aqpTailwindPreset;
