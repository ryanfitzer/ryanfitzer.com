import Pagination from '~/src/components/pagination';
import { PostList } from '@/components/post-list';
import { getEntries, filterEntriesByCategory } from '@/library/get-content';
import { BLOG_PAGED_COUNT, PHOTO_PAGED_COUNT } from '~/src/library/constants';

type PagedParams = {
  params: {
    term: string;
    number: string;
  };
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

export async function generateMetadata({
  params: { term, number },
}: PagedParams) {
  return {
    title: `Category ${term} | Page ${number} | Blog `,
  };
}

export default async function Page({ params: { term, number } }: PagedParams) {
  let pageNavProps = {} as Pagination;
  const pagedCount = term === 'photo' ? PHOTO_PAGED_COUNT : BLOG_PAGED_COUNT;
  const prevPage = Number(number) - 1;
  const nextPage = Number(number) + 1;
  const end = pagedCount * Number(number);
  const start = end - pagedCount;

  if (prevPage) {
    pageNavProps['prevText'] = `Page ${prevPage}`;
    pageNavProps['prevRoute'] = `/blog/category/${term}/page/${prevPage}`;
  }

  if (nextPage) {
    pageNavProps['nextText'] = `Page ${nextPage}`;
    pageNavProps['nextRoute'] = `/blog/category/${term}/page/${nextPage}`;
  }

  const { entries } = await getEntries({ dir: 'blog', body: true });
  let filteredEntries = filterEntriesByCategory(entries, term);
  filteredEntries = filteredEntries.slice(start, end);

  return (
    <>
      <PostList entries={filteredEntries} />
      <Pagination {...pageNavProps} />
    </>
  );
}
