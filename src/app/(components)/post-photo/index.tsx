import MDX from '@/app/(components)/mdx';

export const PostPhoto = ({ title, dateLong, content, ...entry }: Entry) => {
  return (
    <>
      <article>
        <MDX source={content} scope={{ entry }} />
        <h1 className="font-body text-gray-600 text-lg text-center mt-4 mb-4 mx-4">
          {title}
        </h1>
        <p className="text-gray-500 text-sm text-center">{dateLong}</p>
      </article>
    </>
  );
};
