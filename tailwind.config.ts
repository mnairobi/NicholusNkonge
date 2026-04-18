import type { Config } from 'tailwindcss'

const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
 content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  './lib/**/*.{js,ts,jsx,tsx,mdx}',
  './data/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    extend: {
      colors: {
        // Core palette
        'deep-black': '#050508',
        'deep-charcoal': '#0A0A0F',
        'charcoal': '#12121A',
        'charcoal-light': '#1A1A26',
        'charcoal-border': '#252535',
        // Accent colors
        'electric-blue': '#00F0FF',
        'electric-blue-dim': '#00B8CC',
        'electric-blue-glow': 'rgba(0, 240, 255, 0.15)',
        'neon-green': '#00FF99',
        'neon-green-dim': '#00CC7A',
        // Text
        'text-primary': '#F0F0F8',
        'text-secondary': '#A0A0B8',
        'text-muted': '#606078',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
        'blue-glow-card': 'radial-gradient(ellipse at top left, rgba(0, 240, 255, 0.06) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid-size': '60px 60px',
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)',
        'blue-glow-sm': '0 0 10px rgba(0, 240, 255, 0.25)',
        'blue-glow-lg': '0 0 40px rgba(0, 240, 255, 0.4), 0 0 80px rgba(0, 240, 255, 0.15)',
        'green-glow': '0 0 20px rgba(0, 255, 153, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 240, 255, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-scroll': 'gridScroll 20s linear infinite',
        'cursor-trail': 'cursorTrail 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(0, 240, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        cursorTrail: {
          '0%': { opacity: '0.8', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}

export default config