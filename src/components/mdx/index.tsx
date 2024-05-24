import { ReactNode } from 'react';
import remarkUnwrapImages from 'remark-unwrap-images';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Image } from '@/components/image';
import { Gallery } from '@/components/gallery';
// import pluginGallery from './plugin-gallery';

// Note: some rehype/remark plugins can cause a TS error when they use different version of `unified` than `next-mdx-remote` due the Pluggable/Pluggin types mismatching. Use @ts-expect-error above the `options` to ignore the error.
// more info: https://github.com/hashicorp/next-mdx-remote/issues/86

const defaultComponents = ({
  entry,
  componentOptions = {},
}: {
  entry: Entry;
  componentOptions: Record<string, any>;
}) => {
  return {
    Gallery,
    a: ({ href, children }: { href?: string; children?: ReactNode }) => (
      <a className="text-link" href={href}>
        {children}
      </a>
    ),
    img: ({
      src = '',
      alt = '',
      className = '',
    }: {
      src?: string;
      alt?: string;
      className?: string;
    }) => {
      const { img: imgOpts = {} } = componentOptions;

      return (
        <Image
          className={className}
          src={src}
          alt={alt}
          {...imgOpts}
          {...entry}
        />
      );
    },
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
    // rehypePlugins: [pluginGallery],
  },
};

export default function MDX({
  source,
  scope,
  components = defaultComponents,
}: any) {
  const mergedComponents = {
    ...defaultComponents(scope),
    ...components(scope),
  };
  return (
    <MDXRemote
      source={source}
      options={options}
      components={mergedComponents}
    />
  );
}
