import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './client/index.html',
    './client/src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'ph-red': '#FF2A2A',
        'ph-cream': '#FFFDF0',
        'ph-yellow': '#FFD600',
        'ph-teal': '#2DD4BF',
        'ph-black': '#1a1a1a',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        border: 'hsl(var(--border))'
      },
      fontFamily: {
        display: ['"Bangers"', 'cursive'],
        body: ['"Public Sans"', 'sans-serif']
      },
      boxShadow: {
        'hard': '6px 6px 0px 0px rgba(0,0,0,1)',
        'hard-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
        'hard-xl': '12px 12px 0px 0px rgba(0,0,0,1)'
      }
    }
  },
  plugins: []
} satisfies Config;
