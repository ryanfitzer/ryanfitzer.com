import { Metadata } from 'next';
import { getEntries } from '@/library/get-content';
import { PostList } from './(components)/post-list';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function Blog() {
  const posts = await getEntries({
    dir: 'blog',
    start: 0,
    end: 10,
    body: true,
  });

  return (
    <>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </>
  );
}
