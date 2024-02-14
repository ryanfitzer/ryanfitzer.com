import { BLOG_POSTS_COUNT } from '@/constants';
import { getEntries } from '@/library/get-content';
import { PostList } from '~/src/app/(components)/post-list';

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await getEntries({ dir: 'blog' });
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
