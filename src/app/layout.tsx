import type { Metadata } from 'next';
import { getImageProps } from 'next/image';
import { Fraunces, Figtree } from 'next/font/google';
import Footer from '@/components/footer';
import './tailwind.css';
import '@wooorm/starry-night/style/both';

const { NEXT_PUBLIC_SITE_URL } = process.env;
const siteURL = `${NEXT_PUBLIC_SITE_URL}`;

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

function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ');
      return `url("${url}") ${dpi}`;
    })
    .join(', ');
  return `image-set(${imageSet})`;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: '',
    quality: 100,
    width: 2048,
    height: 1360,
    src: '/images/bg-blue-movement.jpg',
  });
  const bgImageStyles = {
    '--bg-body-image': getBackgroundImage(srcSet),
    backgroundImage: 'var(--bg-body-image)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href={`${siteURL}/api/blog/rss`}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        style={bgImageStyles}
        className={`${body.variable} ${heading.variable} bg-(--color-body-bg) relative`}
      >
        <div className="flex flex-col h-svh max-w-(--max-width-site) mx-auto">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
