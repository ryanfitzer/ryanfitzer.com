import { notFound } from 'next/navigation';
import MDX from '../(components)/mdx';
import { getEntry, getEntries } from '@/library/get-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getEntries({ dir: 'blog' });

  return posts.map(({ year, month, day, slug }) => {
    return {
      path: [year, month, day, slug],
    };
  });
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
  const entry = await getEntry({
    dir: 'blog',
    day,
    month,
    year,
    slug,
    body: true,
  });

  if (!entry) notFound();

  const { content = '', dateLong, title } = entry;

  return (
    <>
      <h1 className="font-mono text-gray-700 text-3xl mb-12">{title}</h1>
      <p className="mt-0">{dateLong}</p>
      <article>
        <MDX source={content} scope={{ entry }} />
      </article>
    </>
  );
}
