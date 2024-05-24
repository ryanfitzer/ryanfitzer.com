import MDX from '@/components/mdx';

export const Portfolio = ({
  title,
  year,
  content,
  ...entry
}: Entry & { permalink?: boolean }) => {
  return (
    <>
      <article>
        <h1 className="font-heading text-gray-600 text-3xl mb-2 text-center">
          {title}
        </h1>
        <p className="text-gray-500 text-xl mb-8 text-center">{year}</p>
        <MDX source={content} scope={{ entry }} />
      </article>
    </>
  );
};
