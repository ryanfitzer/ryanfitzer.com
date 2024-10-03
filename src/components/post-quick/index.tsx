import { createElement, ReactNode } from 'react';
import MDX from '@/components/mdx';

type HeadingProps = Pick<Entry, 'layout'> & {
  children: ReactNode;
};

const Heading = ({ layout, children }: HeadingProps) => {
  const level = layout === 'detail' ? 'h1' : 'h2';
  return createElement(
    level,
    { className: 'font-heading text-gray-800 text-2xl mb-8 mx-4' },
    children
  );
};

export const PostQuick = ({
  permalink = false,
  title,
  dateLong,
  content,
  layout,
  ...entry
}: Entry & { permalink?: boolean }) => {
  return (
    <div className="flex flex-col md:max-w-[calc(var(--max-width-column)+2rem)] w-full">
      <article className="py-4 border-t-[#eee] border-x-[#ddd] border-b-[#bbb] border mx-4 md:mx-0 rounded-md md:self-start w-full">
        <p className="text-gray-500 text-xs mb-1 mx-4">{dateLong}</p>
        <Heading layout={layout}>{title}</Heading>
        <MDX source={content} scope={{ entry }} />
      </article>
    </div>
  );
};
