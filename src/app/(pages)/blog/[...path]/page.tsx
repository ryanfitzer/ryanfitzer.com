import { notFound } from 'next/navigation';
import { PostDefault } from '@/components/post-default';
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

export async function generateMetadata(
  props: {
    params: Promise<{ path: string[] }>;
  }
) {
  const params = await props.params;

  const {
    path: [year, month, day, slug]
  } = params;

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

export default async function Page(
  props: {
    params: Promise<{
      path: string[];
    }>;
  }
) {
  const params = await props.params;

  const {
    path: [year, month, day, slug]
  } = params;

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
}
