import type { Metadata } from 'next';
import { Caprasimo } from 'next/font/google';
import './globals.css';

const caprasimo = Caprasimo({
  weight: '400',
  display: 'swap',
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

export const metadata: Metadata = {
  title: 'ryanfitzer.com',
  description: 'General layout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${caprasimo.variable} font-sans px-8 py-8 flex flex-col h-[100lvh] max-w-3xl mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
