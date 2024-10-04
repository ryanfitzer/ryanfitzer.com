import { PostList } from '~/src/components/post-list';
import { PaginationProps } from '~/src/components/pagination';
import { getEntries, filterEntriesByTag } from '@/library/get-content';
import { BLOG_PAGED_COUNT } from '~/src/library/constants';

type PagedParams = {
  params: {
    term: string;
    number: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { tags } = await getEntries({ dir: 'blog' });

  const params = Object.keys(tags).map((tag) => {
    let totalPages = Math.ceil(tags[tag] / BLOG_PAGED_COUNT);

    return Array.from({ length: totalPages }, (_, index) => {
      return {
        term: tag,
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
  const paginationProps = {} as PaginationProps;
  const prevPage = Number(number) - 1;
  const nextPage = Number(number) + 1;
  const end = BLOG_PAGED_COUNT * Number(number);
  const start = end - BLOG_PAGED_COUNT;

  if (prevPage) {
    paginationProps['prevText'] = `Page ${prevPage}`;
    paginationProps['prevRoute'] = `/blog/tag/${term}/page/${prevPage}`;
  }

  if (nextPage) {
    paginationProps['nextText'] = `Page ${nextPage}`;
    paginationProps['nextRoute'] = `/blog/tag/${term}/page/${nextPage}`;
  }

  const { entries } = await getEntries({ dir: 'blog', body: true });
  let filteredEntries = filterEntriesByTag(entries, term);
  filteredEntries = filteredEntries.slice(start, end);

  return (
    <PostList entries={filteredEntries} paginationProps={paginationProps} />
  );
}
