import { ReactNode } from 'react';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeStarryNight from 'rehype-starry-night';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { twClsx } from '~/src/library/tw-clsx';
import { Gallery } from '@/components/gallery';
import { Figure, FigureProps } from '@/components/figure';
import { Image, ImageProps } from '@/components/image';

const defaultComponents = ({
  entry,
  componentOptions = {
    // TODO Why do I need defaults here?
    Gallery: {},
    a: {},
    blockquote: {},
    code: {},
    Figure: {},
    img: {},
    Image: {},
    p: {},
    pre: {},
  },
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
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="m-4 border-s-2 italic">{children}</blockquote>
    ),
    code: ({
      children,
      className,
    }: {
      children?: ReactNode;
      className?: string;
    }) => {
      return (
        <code
          className={twClsx(
            className
              ? `${className} font-mono text-base`
              : 'p-1 font-mono text-base bg-slate-200 rounded-md'
          )}
        >
          {children}
        </code>
      );
    },
    Figure: (props: FigureProps) => {
      return <Figure {...props} {...componentOptions.img} {...entry} />;
    },
    img: (props: ImageProps) => {
      return <Image {...props} {...componentOptions.img} {...entry} />;
    },
    Image: (props: ImageProps) => {
      return <Image {...props} {...componentOptions.img} {...entry} />;
    },
    p: ({ children }: { children?: ReactNode }) => (
      <p className="text-gray-700 text-lg m-4 font-body">{children}</p>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="bg-slate-200 p-4 lg:rounded-md overflow-auto break-normal">
        {children}
      </pre>
    ),
  };
};

// Note: some rehype/remark plugins can cause a TS error when they use different version of `unified` than `next-mdx-remote` due the Pluggable/Pluggin types mismatching. Use @ts-expect-error above the `options` to ignore the error.
// more info: https://github.com/hashicorp/next-mdx-remote/issues/86
const options = {
  mdxOptions: {
    remarkPlugins: [remarkUnwrapImages, remarkGfm],
    rehypePlugins: [rehypeStarryNight],
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
