import { notFound } from 'next/navigation';
import { PostDefault } from '@/app/(components)/post-default';
import { PostPhoto } from '@/app/(components)/post-photo';
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

  const { categories } = entry;

  const isBlogPost = categories?.includes('blog');
  const isPhotoPost = categories?.includes('photo');
  const isQuickPost = categories?.includes('quick');

  return isPhotoPost ? <PostPhoto {...entry} /> : <PostDefault {...entry} />;
}
