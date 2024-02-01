import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getEntry, getEntries } from '@/library/get-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getEntries({ dir: 'blog' });

  return posts.map(({ date, year, month, day, slug }) => {
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

const components = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-gray-700 text-xl mb-12">{children}</p>
  ),
};

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

  const { title, dateLong, content = '' } = post;

  return (
    <>
      <h1 className="font-mono text-gray-700 text-3xl mb-12">{title}</h1>
      <p className="mt-0">{dateLong}</p>
      <article>
        <MDXRemote source={content} components={components} />
      </article>
    </>
  );
}
