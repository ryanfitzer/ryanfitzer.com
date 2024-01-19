import Link from 'next/link';
import { blogPostsCount } from '@/constants';
import { getPostsMeta } from '@/library/get-posts';
import { getLongDate } from '@/library/format-dates';

export const Posts = ({ posts }: { posts: Posts }) => {
  return (
    <ul className="w-full">
      {posts.map((post) => (
        <li key={post.id} className="mt-4 text-2xl dark:text-white/90">
          <Link
            className="underline hover:text-black/70 dark:hover:text-white"
            href={`/blog/${post.year}/${post.month}/${post.day}/${post.slug}`}
          >
            {post.title}
          </Link>
          <br />
          <p className="text-sm mt-1">{getLongDate(post.date)}</p>
        </li>
      ))}
    </ul>
  );
};

export default function Blog({ page = 1 }) {
  const end = blogPostsCount * Number(page);
  const start = end - blogPostsCount;

  const posts = getPostsMeta().slice(start, end);

  return (
    <>
      <h1>Blog</h1>
      <Posts posts={posts} />
    </>
  );
}
