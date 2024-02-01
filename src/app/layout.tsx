import type { Metadata } from 'next';
import { Caprasimo } from 'next/font/google';
import { Alfa_Slab_One } from 'next/font/google';
import Footer from './(components)/footer';
// import 'highlight.js/styles/github.css';
import './globals.css';

const caprasimo = Caprasimo({
  weight: '400',
  display: 'swap',
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false, // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

const testFont = Alfa_Slab_One({
  weight: '400',
  display: 'swap',
  variable: '--font-test',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false, // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Home',
    template: '%s | Ryan Fitzer',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${caprasimo.variable} ${testFont.variable} font-sans bg-[#f8f8f8]`}
      >
        <div className="flex flex-col h-[100lvh] max-w-3xl mx-auto px-8">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
