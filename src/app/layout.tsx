import type { Metadata } from 'next';
import { Caprasimo } from 'next/font/google';
import './globals.css';

const caprasimo = Caprasimo({
  weight: '400',
  display: 'swap',
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false, // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

export const metadata: Metadata = {
  title: 'Home | Ryan Fitzer',
  description: 'Home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${caprasimo.variable} font-sans`}>{children}</body>
    </html>
  );
}
