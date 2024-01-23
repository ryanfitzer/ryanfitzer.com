import { Metadata } from 'next';
import { getPostsMeta } from '@/library/get-posts';
import { PostList } from './(components)/post-list';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function Blog() {
  const posts = getPostsMeta().slice(0, 10);

  return (
    <>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </>
  );
}
