import { createElement, ReactNode } from 'react';
import Link from 'next/link';
import MDX from '@/components/mdx';

type HeadingProps = Pick<Entry, 'layout'> & {
  children: ReactNode;
};

const Heading = ({ layout, children }: HeadingProps) => {
  const level = layout === 'detail' ? 'h1' : 'h2';
  return createElement(
    level,
    { className: 'font-heading text-gray-800 text-4xl mb-8 mx-4' },
    children
  );
};

export const PostDefault = ({
  permalink = false,
  title,
  dateLong,
  content,
  route,
  layout,
  ...entry
}: Entry & { permalink?: boolean }) => {
  const componentOptions = {
    img: {
      className: 'mx-auto',
    },
  };

  return (
    <>
      <article className="contents">
        <p className="text-gray-500 text-xs mb-1 mx-4">{dateLong}</p>
        <Heading layout={layout}>
          <Link href={route}>{title}</Link>
        </Heading>
        <MDX source={content} scope={{ entry, componentOptions }} />
      </article>
    </>
  );
};
