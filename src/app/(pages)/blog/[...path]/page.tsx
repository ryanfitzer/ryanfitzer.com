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

export default async function Page({
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

  const { isQuick } = entry;

  return (
    <div className="blog-entry-detail flex flex-col items-center">
      {isQuick ? (
        <PostQuick {...entry} layout="detail" />
      ) : (
        <PostDefault {...entry} layout="detail" />
      )}
    </div>
  );
  // if (isQuick) return <PostQuick {...entry} layout="detail" />;
  // else return <PostDefault {...entry} layout="detail" />;
}
