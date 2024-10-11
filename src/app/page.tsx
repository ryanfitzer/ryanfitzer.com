import { Metadata } from 'next';
import Image from 'next/image';
import { getPage } from '@/library/get-content';
import Navigation from '@/components/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata: Metadata = {
  title: 'Home | Ryan Fitzer',
  openGraph: {
    title: 'Ryan Fitzer',
    description: 'Software engineer and artist based in Los Angeles',
    siteName: 'ryanfitzer.com',
    images: [
      {
        url: 'https://nextjs-one-gold-92.vercel.app/images/portrait_h9qp3j_c_scale,w_800.png',
        width: 800,
        height: 800,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const components = {
  Image,
};

export default async function Home() {
  const {
    content,
    data: {
      props: { title, description, background },
    },
  } = await getPage('home');

  return (
    <>
      <main className="h-lvh">
        <div className="text-gray-900 relative max-w-[39rem] mx-auto mt-[4vh] px-6 pb-6 border-1 border-transparent rounded-3xl before:backdrop-blur-md before:w-full before:h-full before:absolute before:top-0 before:left-0 before:-z-10 before:mask-image-[radial-gradient(ellipse_closest-corner,black,transparent)]">
          <h1 className="text-4xl tracking-tight text-left font-heading text-balance my-6">
            {title}
          </h1>
          <p className="text-lg">{description}</p>
          <Navigation />
        </div>
        <MDXRemote source={content} components={components} />
      </main>
    </>
  );
}
