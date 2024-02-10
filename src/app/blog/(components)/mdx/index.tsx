import { join } from 'path';
import { ReactNode } from 'react';
import { v2 as cloudinary } from 'cloudinary';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import imageMeta from '~/content/image-meta.json';

const components = ({ entry }: { entry: Entry }) => {
  return {
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-xl mb-12">{children}</p>
    ),
    img: async ({ src, alt }: any) => {
      if (/^http/.test(src)) {
        return <img alt={alt} src={src} />;
      }

      const contentPath = join(
        entry.contentDir,
        src.split('.').slice(0, -1).join('.')
      );

      const { width, height, secure_url } = imageMeta[
        contentPath as keyof typeof imageMeta
      ] as ImageMeta;

      return (
        <Image
          priority
          alt={alt}
          width={width}
          height={height}
          src={secure_url}
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
