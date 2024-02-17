import { ReactNode } from 'react';
import remarkUnwrapImages from 'remark-unwrap-images';
import { Image } from '@/app/(components)/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

const components = ({ entry }: { entry: Entry }) => {
  return {
    img: ({ src = '', alt = '' }: { src?: string; alt?: string }) => (
      <Image src={src} alt={alt} {...entry} />
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-lg mb-4 mx-4 font-body">{children}</p>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="mb-4 mx-4 overflow-x-scroll">{children}</pre>
    ),
  };
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkUnwrapImages],
  },
};

export default function MDX({ source, scope }: any) {
  return (
    <MDXRemote
      source={source}
      options={options}
      components={components(scope)}
    />
  );
}
