import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        page: '#0B0E11',
        card: '#1E2329',
        border: '#2B3139',
        green: '#0ECB81',
        red: '#F6465D',
        cyan: '#00F0FF',
        amber: '#FFB800',
        muted: '#848E9C',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [animate],
};

export default config;
