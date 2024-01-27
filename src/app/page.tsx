import { Metadata } from 'next';
import Image from 'next/image';
import github from '../../public/images/github.svg';
import npm from '../../public/images/npm.svg';
import portrait from '../../public/images/portrait_h9qp3j_c_scale,w_800.png';

export const metadata: Metadata = {
  title: 'Home | Ryan Fitzer',
  openGraph: {
    title: 'Ryan Fitzer',
    description: 'Software engineer and artist based in Los Angeles',
    siteName: 'ryanfitzer.com',
    images: [
      {
        url: '/images/portrait_h9qp3j_c_scale,w_720.png', // Must be an absolute URL
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
    <div className="">
      <div className="flex flex-col h-[100lvh] max-w-3xl mx-auto px-8 py-8">
        <main className="lg:grid lg:grid-rows-2 lg:grid-cols-3 lg:grid-flow-col my-16">
          <picture className="lg:row-span-2 mr-8">
            <Image
              alt=""
              src={portrait}
              sizes="(max-width: 800px) 100vw, 800px"
              className="max-w-[70%] lg:max-w-[200px] rounded-full outline outline-4 outline-offset-[-4px] outline-black mx-auto"
            />
          </picture>

          <div className="lg:row-span-2 lg:col-span-2 lg:flex lg:flex-col lg:justify-center">
            <h1 className="tracking-tight text-4xl lg:text-5xl mb-4 font-display text-balance text-center lg:text-left">
              Hi, I&apos;m Ryan Fitzer
            </h1>

            <p className="font-mono text-2xl lg:text-3xl text-gray-700 text-balance lg:text-pretty text-center lg:text-left">
              Software engineer and artist based in Los Angeles
            </p>
          </div>
        </main>

        <footer className="flex flex-grow justify-center items-end mt-16 pb-8 text-gray-500">
          <p className="flex flex-col lg:flex-row lg:space-x-2 text-center">
            <span>© 2024 Ryan Fitzer</span>
            <span>
              ryan@ryanfitzer
              <span className="hidden">no-spam!</span>.com
            </span>
            <span className="flex mt-2 lg:mt-0 space-x-2 justify-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ryanfitzer"
                aria-label="Github"
              >
                <Image className="inline" alt="Github" src={github} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.npmjs.com/~ryanfitzer"
                aria-label="NPM"
              >
                <Image className="inline" alt="NPM" src={npm} />
              </a>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
