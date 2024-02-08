import { promisify } from 'util';
import { resolve, join } from 'path';
import { ReactNode } from 'react';
import { v2 as cloudinary } from 'cloudinary';
import { imageSize } from 'image-size';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { PUBLIC_PATH } from '@/constants';

const getImageSize = promisify(imageSize);

const components = ({ entry }: { entry: Entry }) => {
  return {
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-xl mb-12">{children}</p>
    ),
    img: async ({ src, alt, title }: any) => {
      if (/^http/.test(src)) {
        return <img alt={alt} src={src} />;
      }

      return <img alt={alt} src={resolve(entry.contentDir, src)} />;

      // const { width, height, url } = await cloudinary.api.resource(
      //   'content/blog/2020-03-29-test-that-turned-into-a-study/images/original@0.5x'
      // );
      // console.log({ width, height, url });

      // const imgSRC = url;
      // const dims = { width, height };
      // const imgSRC = resolve(entry.contentDir, src);
      // const imgPath = join(PUBLIC_PATH, imgSRC);
      // const dims = await getImageSize(imgPath);

      // return (
      //   <Image
      //     alt={alt}
      //     width={dims?.width}
      //     height={dims?.height}
      //     src={imgSRC}
      //   />
      // );
    },
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
