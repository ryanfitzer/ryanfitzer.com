import { notFound } from 'next/navigation';
import { getLongDate } from '@/library/format-dates';
import { getEntry, getEntries } from '@/library/get-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getEntries({ dir: 'blog' });

  return posts.map(({ year, month, day, slug }) => ({
    path: [year, month, day, slug],
  }));
}

export async function generateMetadata({
  params: {
    path: [year, month, day, slug],
  },
}: {
  params: { path: string[] };
}) {
  const post = await getEntry({
    dir: 'blog',
    day,
    month,
    year,
    slug,
  });

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title}`,
  };
}

export default async function BlogPost({
  params: {
    path: [year, month, day, slug],
  },
}: {
  params: {
    path: [string, string, string, string];
  };
}) {
  const post = await getEntry({
    dir: 'blog',
    day,
    month,
    year,
    slug,
    body: true,
  });

  if (!post) notFound();

  const { title, date, html = '' } = post;

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{getLongDate(date)}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
