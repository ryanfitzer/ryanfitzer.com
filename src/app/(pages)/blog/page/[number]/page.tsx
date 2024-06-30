import { BLOG_PAGED_COUNT } from '~/src/library/constants';
import { getEntries } from '@/library/get-content';
import { PostList } from '@/components/post-list';
import Pagination from '~/src/components/pagination';

type PagedParams = {
  params: {
    number: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { entries } = await getEntries({ dir: 'blog' });
  const totalPages = Math.ceil(entries.length / BLOG_PAGED_COUNT);

  return Array.from({ length: totalPages }, (_, index) => ({
    number: (index + 1).toString(),
  }));
}

export async function generateMetadata({ params: { number } }: PagedParams) {
  return {
    title: `Page ${number} | Blog `,
  };
}

export default async function Page({ params: { number } }: PagedParams) {
  let pageNavProps = {} as Record<string, string>;
  const end = BLOG_PAGED_COUNT * Number(number);
  const start = end - BLOG_PAGED_COUNT;
  const prevPage = Number(number) - 1;
  const nextPage = Number(number) + 1;

  if (prevPage) {
    pageNavProps['prevText'] = `Page ${prevPage}`;
    pageNavProps['prevRoute'] = `/blog/page/${prevPage}`;
  }

  if (nextPage) {
    pageNavProps['nextText'] = `Page ${nextPage}`;
    pageNavProps['nextRoute'] = `/blog/page/${nextPage}`;
  }

  const { entries } = await getEntries({ dir: 'blog', start, end, body: true });

  return (
    <>
      <PostList entries={entries} />
      <Pagination {...pageNavProps} />
    </>
  );
}
