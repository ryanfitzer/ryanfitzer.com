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
      props: { title, description, portrait },
    },
  } = await getPage('home');

  return (
    <>
      <main className="lg:grid lg:grid-rows-2 lg:grid-cols-3 lg:grid-flow-col mt-28">
        <div className="lg:row-span-2 mb-8 lg:mb-0">
          <Image
            alt=""
            priority
            src={portrait.path}
            width={portrait.width}
            height={portrait.height}
            className="max-w-[70%] lg:max-w-[200px] rounded-full outline outline-4 outline-offset-[-4px] outline-black mx-auto"
          />
        </div>

        <div className="lg:row-span-2 lg:col-span-2 lg:flex lg:flex-col lg:justify-center lg:pl-4">
          <h1 className="text-4xl lg:text-5xl tracking-tight lg:leading-tight mb-2 font-heading text-balance text-center lg:text-left">
            {description}
          </h1>
          {/* 
          <p className="font-mono text-2xl lg:text-3xl text-gray-700 text-balance lg:text-pretty text-center lg:text-left">
            {description}
          </p> */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Navigation active="home" />
        </div>
        <MDXRemote source={content} components={components} />
      </main>
    </>
  );
}
