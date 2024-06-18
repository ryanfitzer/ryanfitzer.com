import clsx from 'clsx';
import MDX from '@/components/mdx';

export const Portfolio = ({
  title,
  year,
  content,
  style,
  ...entry
}: Entry & { permalink?: boolean }) => {
  const titleGradient = () => {
    if (!style?.title?.className) return;

    return `${style.title?.className} bg-clip-text text-transparent bg-gradient-to-r`;
  };

  return (
    <>
      <article>
        <h1
          className={clsx(
            titleGradient(),
            'font-heading text-4xl mb-2 text-center'
          )}
        >
          <span>{title}</span>
        </h1>
        <p className="text-gray-500 text-xl mb-8 text-center">{year}</p>
        <MDX source={content} scope={{ entry }} />
      </article>
    </>
  );
};
