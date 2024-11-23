import { PostList } from '~/src/components/post-list';
import { PaginationProps } from '~/src/components/pagination';
import { getEntries, filterEntriesByCategory } from '@/library/get-content';
import { BLOG_PAGED_COUNT, PHOTO_PAGED_COUNT } from '~/src/library/constants';

type PagedParams = {
  params: Promise<{
    term: string;
    number: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { categories } = await getEntries({ dir: 'blog' });

  const params = Object.keys(categories).map((cat) => {
    const pagedCount = cat === 'photo' ? PHOTO_PAGED_COUNT : BLOG_PAGED_COUNT;
    let totalPages = Math.ceil(categories[cat] / pagedCount);

    return Array.from({ length: totalPages }, (_, index) => {
      return {
        term: cat,
        number: (index + 1).toString(),
      };
    });
  });

  return params.flat();
}

export async function generateMetadata(props: PagedParams) {
  const params = await props.params;

  const {
    term,
    number
  } = params;

  return {
    title: `Category ${term} | Page ${number} | Blog `,
  };
}

export default async function Page(props: PagedParams) {
  const params = await props.params;

  const {
    term,
    number
  } = params;

  const paginationProps = {} as PaginationProps;
  const prevPage = Number(number) - 1;
  const nextPage = Number(number) + 1;
  const end = BLOG_PAGED_COUNT * Number(number);
  const start = end - BLOG_PAGED_COUNT;

  if (prevPage) {
    paginationProps['prevText'] = `Page ${prevPage}`;
    paginationProps['prevRoute'] = `/blog/category/${term}/page/${prevPage}`;
  }

  if (nextPage) {
    paginationProps['nextText'] = `Page ${nextPage}`;
    paginationProps['nextRoute'] = `/blog/category/${term}/page/${nextPage}`;
  }

  const { entries } = await getEntries({ dir: 'blog', body: true });
  let filteredEntries = filterEntriesByCategory(entries, term);
  filteredEntries = filteredEntries.slice(start, end);

  return (
    <PostList entries={filteredEntries} paginationProps={paginationProps} />
  );
}
