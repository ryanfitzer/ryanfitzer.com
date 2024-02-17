import { BLOG_POSTS_COUNT } from '@/constants';
import { getEntries } from '@/library/get-content';
import { PostList } from '@/app/(components)/post-list';
import PageNav from '@/app/(components)/page-nav';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { entries } = await getEntries({ dir: 'blog' });
  const totalPages = Math.ceil(entries.length / BLOG_POSTS_COUNT);

  return Array.from({ length: totalPages }, (_, index) => ({
    page: (index + 1).toString(),
  }));
}

export async function generateMetadata({
  params: { page },
}: {
  params: { page: string };
}) {
  return {
    title: `Page ${page} | Blog `,
  };
}

export default async function Page({
  params: { page },
}: {
  params: { page: string };
}) {
  let pageNavProps = {} as Record<string, string>;
  const end = BLOG_POSTS_COUNT * Number(page);
  const start = end - BLOG_POSTS_COUNT;
  const prevPage = Number(page) - 1;
  const nextPage = Number(page) + 1;

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
      <PageNav {...pageNavProps} />
    </>
  );
}
