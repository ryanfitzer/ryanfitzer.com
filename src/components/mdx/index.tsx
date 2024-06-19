import { ReactNode } from 'react';
import remarkUnwrapImages from 'remark-unwrap-images';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Gallery } from '@/components/gallery';
import { Figure, FigureProps } from '@/components/figure';
import { Image, ImageProps } from '@/components/image';

const defaultComponents = ({
  entry,
  scope = { img: {} },
}: {
  entry: Entry;
  scope: Record<string, any>;
}) => {
  return {
    Gallery,
    a: ({ href, children }: { href?: string; children?: ReactNode }) => (
      <a className="text-link" href={href}>
        {children}
      </a>
    ),
    Figure: (props: FigureProps) => {
      return <Figure {...props} {...scope.img} {...entry} />;
    },
    img: (props: ImageProps) => {
      return <Image {...props} {...scope.img} {...entry} />;
    },
    Image: (props: ImageProps) => {
      return <Image {...props} {...scope.img} {...entry} />;
    },
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-lg m-4 font-body">{children}</p>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="mb-4 mx-4 overflow-x-scroll">{children}</pre>
    ),
  };
};

// Note: some rehype/remark plugins can cause a TS error when they use different version of `unified` than `next-mdx-remote` due the Pluggable/Pluggin types mismatching. Use @ts-expect-error above the `options` to ignore the error.
// more info: https://github.com/hashicorp/next-mdx-remote/issues/86
const options = {
  mdxOptions: {
    remarkPlugins: [remarkUnwrapImages],
  },
};

export default function MDX({
  scope,
  source,
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
