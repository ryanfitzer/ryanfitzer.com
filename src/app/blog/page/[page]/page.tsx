import { BLOG_POSTS_COUNT } from '@/constants';
import { getPostsMeta } from '@/library/get-posts';
import { PostList } from '../../(components)/post-list';

type PageParams = {
  page: string;
};

export const dynamicParams = false;

const getTotalPages = () => {
  const posts = getPostsMeta();

  return Math.floor(posts.length / BLOG_POSTS_COUNT);
};

export function generateStaticParams() {
  return new Array(getTotalPages()).map((val, index) => ({
    page: index,
  }));
}

export async function generateMetadata({
  params: { page },
}: {
  params: PageParams;
}) {
  return {
    title: `Page ${page} | Blog `,
  };
}

export default function Page({ params: { page } }: { params: PageParams }) {
  const end = BLOG_POSTS_COUNT * Number(page);
  const start = end - BLOG_POSTS_COUNT;

  const posts = getPostsMeta().slice(start, end);

  return (
    <>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </>
  );
}
