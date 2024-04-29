import Pagination from '~/src/components/pagination';
import { PostList } from '@/components/post-list';
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
  const { entries, categories } = await getEntries({ dir: 'blog', body: true });
  const pagedCount = term === 'photo' ? PHOTO_PAGED_COUNT : BLOG_PAGED_COUNT;
  const isPaged = categories[term] > MAX_POSTS_PER_PAGE;
  let filteredEntries = filterEntriesByCategory(entries, term);

  if (isPaged) {
    filteredEntries = filteredEntries.slice(0, pagedCount);
  }

  return (
    <>
      <PostList entries={filteredEntries} />
      {isPaged && (
        <Pagination
          nextRoute={`/blog/category/${term}/page/2`}
          nextText="Page 2"
        />
      )}
    </>
  );
}
