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
        <h1 className="font-heading text-gray-600 text-5xl mb-4 mx-4">
          <Link href={route}>{title}</Link>
        </h1>
        <p className="text-gray-500 text-xs mb-16 mx-4">{dateLong}</p>
        <MDX source={content} scope={{ entry, componentOptions }} />
      </article>
    </>
  );
};
