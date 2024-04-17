import PageNav from '@/components/page-nav';
import { PostList } from '@/components/post-list';
import { getEntries, filterEntriesByTag } from '@/library/get-content';
import { BLOG_PAGED_COUNT, PHOTO_PAGED_COUNT } from '~/src/library/constants';

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
    const pagedCount = tag === 'photo' ? PHOTO_PAGED_COUNT : BLOG_PAGED_COUNT;
    let totalPages = Math.ceil(tags[tag] / pagedCount);

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
  let pageNavProps = {} as Pagination;
  const pagedCount = term === 'photo' ? PHOTO_PAGED_COUNT : BLOG_PAGED_COUNT;
  const prevPage = Number(number) - 1;
  const nextPage = Number(number) + 1;
  const end = pagedCount * Number(number);
  const start = end - pagedCount;

  if (prevPage) {
    pageNavProps['prevText'] = `Page ${prevPage}`;
    pageNavProps['prevRoute'] = `/blog/tag/${term}/page/${prevPage}`;
  }

  if (nextPage) {
    pageNavProps['nextText'] = `Page ${nextPage}`;
    pageNavProps['nextRoute'] = `/blog/tag/${term}/page/${nextPage}`;
  }

  const { entries } = await getEntries({ dir: 'blog', body: true });
  let filteredEntries = filterEntriesByTag(entries, term);
  filteredEntries = filteredEntries.slice(start, end);

  return (
    <>
      <PostList entries={filteredEntries} />
      <PageNav {...pageNavProps} />
    </>
  );
}
