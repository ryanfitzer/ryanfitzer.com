import Link from 'next/link';
import {
  getBlogPostsMeta,
  createDateArchive,
  getPostsByDate,
} from '@/library/get-posts';
import { capitalize } from '@/library/utils';
import { PostList } from '../../(components)/post-list';

export const dynamicParams = false;

export async function generateMetadata({
  params: {
    date: [year, month],
  },
}: BlogArchiveParams) {
  if (month) {
    return {
      title: `Archive for ${month} ${year} | Blog`,
    };
  }

  return {
    title: `Archive for ${year} | Blog`,
  };
}

export function generateStaticParams() {
  const archives = createDateArchive(getBlogPostsMeta());

  return archives.reduce((accum, [year, months]) => {
    accum.push({ date: [year] });

    months.map(([month]) => {
      accum.push({ date: [year, month.toLowerCase()] });
    });

    return accum;
  }, [] as BlogArchiveDates[]);
}

export default function BlogDateArchives({
  params: {
    date: [year, month],
  },
}: BlogArchiveParams) {
  const posts = getPostsByDate(getBlogPostsMeta(), year, month);

  return (
    <>
      <h1>
        Blog Archives: {month && capitalize(month)} {year}
      </h1>
      <PostList posts={posts} />
    </>
  );
}
