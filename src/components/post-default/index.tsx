import Link from 'next/link';
import MDX from '@/components/mdx';

export const PostDefault = ({
  permalink = false,
  title,
  dateLong,
  content,
  route,
  ...entry
}: Entry & { permalink?: boolean }) => {
  const componentOptions = {
    img: {
      className: 'mx-auto',
    },
  };

  return (
    <>
      <article>
        <p className="text-gray-500 text-xs mb-1 mx-4">{dateLong}</p>
        <h1 className="font-heading text-gray-600 text-3xl mb-8 mx-4">
          <Link href={route}>{title}</Link>
        </h1>
        <MDX source={content} scope={{ entry, componentOptions }} />
      </article>
    </>
  );
};
