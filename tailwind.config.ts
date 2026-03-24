import type { Config } from 'tailwindcss'

const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E90FF',
          gold: '#FFA500',
          dark: '#0A1628',
          light: '#F0F8FF',
          success: '#22C55E',
          muted: '#94A3B8',
        },
      },
      boxShadow: {
        ocean: '0 10px 30px -15px rgba(10, 22, 40, 0.35)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
} satisfies Config

export default config
