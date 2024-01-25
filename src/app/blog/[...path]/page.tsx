import { notFound } from 'next/navigation';
import { getLongDate } from '@/library/format-dates';
import { getPostMeta, getPost, getPostsMeta } from '@/library/get-posts';

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPostsMeta();

  return posts.map(({ year, month, day, slug }) => ({
    path: [year, month, day, slug],
  }));
}

export async function generateMetadata({
  params: {
    path: [year, month, day, slug],
  },
}: {
  params: BlogParams;
}) {
  const post = getPostMeta({ day, month, year, slug });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title}`,
  };
}

export default async function Post({
  params: {
    path: [year, month, day, slug],
  },
}: {
  params: BlogParams;
}) {
  if (!getPostMeta({ day, month, year, slug })) notFound();

  const { title, date, categories, html } = await getPost({
    day,
    month,
    year,
    slug,
  });

  const pubDate = getLongDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
