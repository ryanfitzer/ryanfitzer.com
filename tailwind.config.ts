import type { Config } from 'tailwindcss';

export default {
  // important: true,
  content: [
    './content/**/*.md',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config;
