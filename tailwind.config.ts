import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: [
    './content/**/*.md',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        link: '#ff8f04',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      spacing: {
        gallery: 'var(--left-gallery)',
      },
      width: {
        site: 'var(--width-site)',
        gallery: 'var(--width-gallery-responsive)',
      },
    },
    screens: {
      sm: '0',
      md: '48.75em', // 780px
      lg: '59.375em', // 950px
    },
  },
  plugins: [],
};

export default config;
