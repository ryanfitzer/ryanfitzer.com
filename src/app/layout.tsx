import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import Footer from '@/components/footer';
import './tailwind.css';
import './starry-night.css';

const { NEXT_PUBLIC_SITE_PROTOCOL, NEXT_PUBLIC_SITE_URL } = process.env;
const siteURL = `${NEXT_PUBLIC_SITE_PROTOCOL}${NEXT_PUBLIC_SITE_URL}`;

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// https://fonts.google.com/specimen/Fraunces?query=Fraunces
const heading = Fraunces({
  weight: '800',
  display: 'swap',
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false, // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

// https://fonts.google.com/specimen/Figtree?query=Figtree
const body = Figtree({
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false, // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
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
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href={`${siteURL}/api/blog/rss`}
        />
      </head>
      <body className={`${body.variable} ${heading.variable} bg-white`}>
        <div className="flex flex-col h-[100lvh] max-w-[--width-site] mx-auto">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
