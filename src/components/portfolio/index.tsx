import { twClsx } from '@/library/tw-clsx';
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

    return `bg-clip-text text-transparent bg-gradient-to-r ${style.title?.className}`;
  };

  return (
    <div className="portfolio-entry-detail flex flex-col items-center">
      <article className="contents">
        <header className="flex justify-center">
          <h1
            className={twClsx(
              titleGradient(),
              'font-heading text-6xl mb-2 text-center'
            )}
          >
            <span>{title}</span>
          </h1>
        </header>

        <p className="text-gray-500 text-xl mb-8 text-center">{year}</p>
        <MDX source={content} scope={{ entry }} />
      </article>
    </div>
  );
};
