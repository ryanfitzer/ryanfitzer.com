import { PostList } from '~/src/components/post-list';
import { PaginationProps } from '~/src/components/pagination';
import { getEntries } from '@/library/get-content';
import { BLOG_PAGED_COUNT } from '~/src/library/constants';

type PagedParams = {
  params: Promise<{
    number: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { entries } = await getEntries({ dir: 'blog' });
  const totalPages = Math.ceil(entries.length / BLOG_PAGED_COUNT);

  return Array.from({ length: totalPages }, (_, index) => ({
    number: (index + 1).toString(),
  }));
}

export async function generateMetadata(props: PagedParams) {
  const params = await props.params;

  const {
    number
  } = params;

  return {
    title: `Page ${number} | Blog `,
  };
}

export default async function Page(props: PagedParams) {
  const params = await props.params;

  const {
    number
  } = params;

  const paginationProps = {} as PaginationProps;
  const end = BLOG_PAGED_COUNT * Number(number);
  const start = end - BLOG_PAGED_COUNT;
  const prevPage = Number(number) - 1;
  const nextPage = Number(number) + 1;

  if (prevPage) {
    paginationProps['prevText'] = `Page ${prevPage}`;
    paginationProps['prevRoute'] = `/blog/page/${prevPage}`;
  }

  if (nextPage) {
    paginationProps['nextText'] = `Page ${nextPage}`;
    paginationProps['nextRoute'] = `/blog/page/${nextPage}`;
  }

  const { entries } = await getEntries({ dir: 'blog', start, end, body: true });

  return <PostList entries={entries} paginationProps={paginationProps} />;
}
