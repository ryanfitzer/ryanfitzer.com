import { PostList } from '~/src/components/post-list';
import { PaginationProps } from '~/src/components/pagination';
import { getEntries, filterEntriesByCategory } from '@/library/get-content';
import { MAX_POSTS_PER_PAGE, BLOG_PAGED_COUNT } from '~/src/library/constants';

type CatParams = {
  params: Promise<{
    term: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { categories } = await getEntries({ dir: 'blog' });

  return Object.keys(categories).map((cat) => {
    return {
      term: cat,
    };
  });
}

export async function generateMetadata(props: CatParams) {
  const params = await props.params;

  const {
    term
  } = params;

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

export default async function Page(props: CatParams) {
  const params = await props.params;

  const {
    term
  } = params;

  const { entries } = await getEntries({ dir: 'blog', body: true });
  const isPaged = entries.length > MAX_POSTS_PER_PAGE;
  const paginationProps = {} as PaginationProps;
  let filteredEntries = filterEntriesByCategory(entries, term);

  if (isPaged) {
    filteredEntries = filteredEntries.slice(0, BLOG_PAGED_COUNT);
    paginationProps.nextRoute = `/blog/category/${term}/page/2`;
    paginationProps.nextText = 'Page 2';
  }

  return (
    <PostList entries={filteredEntries} paginationProps={paginationProps} />
  );
}
