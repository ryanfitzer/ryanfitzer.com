import MDX from '@/app/(components)/mdx';

export const PostDefault = ({ title, dateLong, content, ...entry }: Entry) => {
  return (
    <>
      <article>
        <p className="text-gray-500 text-xs mb-1 mx-4">{dateLong}</p>
        <h1 className="font-heading text-gray-600 text-4xl mb-8 mx-4">
          {title}
        </h1>
        <MDX source={content} scope={{ entry }} />
      </article>
    </>
  );
};
