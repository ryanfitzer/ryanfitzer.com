import { notFound } from 'next/navigation';
import { PostDefault } from '@/components/post-default';
import { PostPhotoDetail } from '@/components/post-photo';
import { PostQuick } from '@/components/post-quick';
import { getEntry, getEntries } from '@/library/get-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { entries } = await getEntries({ dir: 'blog' });

  return entries.map(({ year, month, day, slug }) => {
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
    path: string[];
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

  const { isBlog, isPhoto, isQuick } = entry;

  if (isPhoto) return <PostPhotoDetail {...entry} />;
  else if (isQuick) return <PostQuick {...entry} />;
  else return <PostDefault {...entry} />;
}
