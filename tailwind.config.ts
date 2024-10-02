import type { Config } from 'tailwindcss';

const config: Config = {
  // important: true,
  content: [
    './content/**/*.md',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        link: '#d04704',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
    },
    screens: {
      sm: '0',
      md: '50.5625rem', // 809px
      lg: '59.375em', // 950px
    },
  },
  plugins: [],
};

export default config;
