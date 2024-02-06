import { resolve, join } from 'path';
import { ReactNode } from 'react';
import sharp from 'sharp';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CONTENT_PATH, PUBLIC_PATH, PATHS } from '@/constants';

const components = (scope: Entry) => {
  return {
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-xl mb-12">{children}</p>
    ),
    img: ({ src, alt }: any) => {
      return <img alt={alt} src={src} />;
    },
    // img: async ({ src, alt }: any) => {
    //   const imgSRC = resolve(scope.contentDir, src);
    //   const imgPath = join(PUBLIC_PATH, imgSRC);
    //   const { width, height } = await sharp(imgPath).metadata();

    //   return <Image alt={alt} width={width} height={height} src={imgSRC} />;
    // },
  };
};

export default function MDX({ source, options, scope }: any) {
  return (
    <MDXRemote
      source={source}
      options={options}
      components={components(scope)}
    />
  );
}
