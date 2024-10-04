import { Metadata } from 'next';
import { getEntries } from '@/library/get-content';
import { PostList } from '~/src/components/post-list';
import { PaginationProps } from '~/src/components/pagination';
import { BLOG_PAGED_COUNT } from '~/src/library/constants';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function Page() {
  const { entries } = await getEntries({
    dir: 'blog',
    start: 0,
    end: 10,
    body: true,
  });

  const paginationProps = {} as PaginationProps;
  const isPaged = entries.length === BLOG_PAGED_COUNT;

  if (isPaged) {
    paginationProps.nextRoute = `/blog/page/2`;
    paginationProps.nextText = 'Page 2';
  }

  return <PostList entries={entries} paginationProps={paginationProps} />;
}
