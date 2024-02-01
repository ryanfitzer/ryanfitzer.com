import { BLOG_POSTS_COUNT } from '@/constants';
import { getEntries } from '@/library/get-content';
import { PostList } from '../../(components)/post-list';

export const dynamicParams = false;

const getTotalPages = async () => {
  const posts = await getEntries({ dir: 'blog' });

  return Math.floor(posts.length / BLOG_POSTS_COUNT);
};

export async function generateStaticParams() {
  return new Array(await getTotalPages()).map((val, index) => ({
    page: index,
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
  const end = BLOG_POSTS_COUNT * Number(page);
  const start = end - BLOG_POSTS_COUNT;

  const posts = await getEntries({ dir: 'blog', start, end });

  return (
    <>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </>
  );
}
