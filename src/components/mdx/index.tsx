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
      <a
        className="text-link hover:border-0 focus-within:border-0 border-b border-link"
        href={href}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="mx-4 my-8 border-gray-300 border-l-4 italic">
        {children}
      </blockquote>
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
      <p className="text-gray-700 text-lg mx-4 my-3.5 font-body">{children}</p>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="bg-[--color-pre-bg] md:border-l-4 md:border-l-[--color-pre-border] text-[--color-pre-text] !w-full my-8 p-4 md:rounded-md overflow-auto break-normal">
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
