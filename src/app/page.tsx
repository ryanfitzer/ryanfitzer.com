import { Metadata } from 'next';
import Image from 'next/image';
import portrait from '~/public/images/portrait_h9qp3j_c_scale,w_800.png';

export const metadata: Metadata = {
  title: 'Home | Ryan Fitzer',
  openGraph: {
    title: 'Ryan Fitzer',
    description: 'Software engineer and artist based in Los Angeles',
    siteName: 'ryanfitzer.com',
    images: [
      {
        url: 'https://nextjs-one-gold-92.vercel.app/images/portrait_h9qp3j_c_scale,w_720.png',
        width: 720,
        height: 720,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <main className="lg:grid lg:grid-rows-2 lg:grid-cols-3 lg:grid-flow-col mt-28">
        <picture className="lg:row-span-2 mb-8 lg:mb-0 block">
          <Image
            alt=""
            src={portrait}
            sizes="(max-width: 800px) 100vw, 800px"
            className="max-w-[70%] lg:max-w-[200px] rounded-full outline outline-4 outline-offset-[-4px] outline-black mx-auto"
          />
        </picture>

        <div className="lg:row-span-2 lg:col-span-2 lg:flex lg:flex-col lg:justify-center lg:pl-8">
          <h1 className="tracking-tight text-4xl lg:text-5xl mb-4 font-display text-balance text-center lg:text-left">
            Hi, I&apos;m Ryan Fitzer
          </h1>

          <p className="font-mono text-2xl lg:text-3xl text-gray-700 text-balance lg:text-pretty text-center lg:text-left">
            Software engineer and artist based in Los Angeles
          </p>
        </div>
      </main>
    </>
  );
}
