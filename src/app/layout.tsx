import type { Metadata } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import Footer from './(components)/footer';
import './globals.css';

const { NEXT_PUBLIC_SITE_PROTOCOL, NEXT_PUBLIC_SITE_URL } = process.env;
const siteURL = `${NEXT_PUBLIC_SITE_PROTOCOL}${NEXT_PUBLIC_SITE_URL}`;

const heading = Fraunces({
  weight: '800',
  display: 'swap',
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  adjustFontFallback: false, // https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912
});

const body = Figtree({
  weight: '400',
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
      <body
        className={`${body.variable} ${heading.variable} font-sans bg-[#f8f8f8]`}
      >
        <div className="flex flex-col h-[100lvh] max-w-[63.75rem] mx-auto">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
