import Pagination from '~/src/components/pagination';
import { twClsx } from '~/src/library/tw-clsx';
import { PostQuick } from '@/components/post-quick';
import { PostDefault } from '@/components/post-default';
import { getEntries, filterEntriesByCategory } from '@/library/get-content';
import {
  MAX_POSTS_PER_PAGE,
  BLOG_PAGED_COUNT,
  PHOTO_PAGED_COUNT,
} from '~/src/library/constants';

type CatParams = {
  params: {
    term: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { categories } = await getEntries({ dir: 'blog' });

  return Object.keys(categories).map((cat) => {
    return {
      path: cat,
    };
  });
}

export async function generateMetadata({ params: { term } }: CatParams) {
  const { categories } = await getEntries({ dir: 'blog' });
  const cats = Object.keys(categories);

  if (!cats.includes(term)) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `Category ${term}`,
  };
}

export default async function Page({ params: { term } }: CatParams) {
  const { entries } = await getEntries({ dir: 'blog', body: true });
  const isPaged = entries.length > MAX_POSTS_PER_PAGE;
  let filteredEntries = filterEntriesByCategory(entries, term);

  if (isPaged) {
    filteredEntries = filteredEntries.slice(0, BLOG_PAGED_COUNT);
  }

  return (
    <>
      {filteredEntries.map((entry, index) => {
        const { id, isQuick } = entry;

        return (
          <div
            key={id}
            className={twClsx(
              'blog-entry-listing flex flex-col items-center mb-24',
              {
                'quick-entry': isQuick,
              }
            )}
          >
            {isQuick ? (
              <PostQuick key={id} permalink layout="listing" {...entry} />
            ) : (
              <PostDefault key={id} permalink layout="listing" {...entry} />
            )}
          </div>
        );
      })}
      {isPaged && (
        <Pagination
          nextRoute={`/blog/category/${term}/page/2`}
          nextText="Page 2"
        />
      )}
    </>
  );

  // return (
  //   <>
  //     <PostList entries={filteredEntries} />
  //     {isPaged && (
  //       <Pagination
  //         nextRoute={`/blog/category/${term}/page/2`}
  //         nextText="Page 2"
  //       />
  //     )}
  //   </>
  // );
}
