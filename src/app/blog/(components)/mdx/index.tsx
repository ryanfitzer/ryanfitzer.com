import { promisify } from 'util';
import { resolve, join } from 'path';
import { ReactNode } from 'react';
import { imageSize } from 'image-size';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { PUBLIC_PATH } from '@/constants';

const getImageSize = promisify(imageSize);

const components = (scope: Entry) => {
  return {
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-xl mb-12">{children}</p>
    ),
    img: async ({ src, alt, title }: any) => {
      if (/^http/.test(src)) {
        return <img alt={alt} src={src} />;
      }

      const imgSRC = resolve(scope.contentDir, src);
      const imgPath = join(PUBLIC_PATH, imgSRC);
      const dims = await getImageSize(imgPath);

      return (
        <Image
          alt={alt}
          width={dims?.width}
          height={dims?.height}
          src={imgSRC}
        />
      );
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
