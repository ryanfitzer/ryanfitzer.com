import { Metadata } from 'next';
import { getEntries } from '@/library/get-content';
import { PostList } from '@/components/post-list';
import PageNav from '@/components/page-nav';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function Blog() {
  const { entries } = await getEntries({
    dir: 'blog',
    start: 0,
    end: 10,
    body: true,
  });

  return (
    <>
      <PostList entries={entries} />
      <PageNav nextRoute="/blog/page/2" nextText="Page 2" />
    </>
  );
}
