import {
  getEntries,
  filterEntriesByDate,
  createEntriesDateArchive,
} from '@/library/get-content';
import { capitalize } from '@/library/utils';
import { PostList } from '@/components/post-list';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { entries } = await getEntries({ dir: 'blog' });
  const archives = createEntriesDateArchive(entries);

  return archives.reduce((accum, [year, months]) => {
    accum.push({ date: [year] });

    months.map(([month]) => {
      accum.push({ date: [year, month.toLowerCase()] });
    });

    return accum;
  }, [] as { [date: string]: [string, string?] }[]);
}

export async function generateMetadata({
  params: {
    date: [year, month],
  },
}: {
  params: {
    date: [string, string?];
  };
}) {
  if (month) {
    return {
      title: `Archive for ${month} ${year} | Blog`,
    };
  }

  return {
    title: `Archive for ${year} | Blog`,
  };
}

export default async function Page({
  params: {
    date: [year, month],
  },
}: {
  params: {
    date: [string, string?];
  };
}) {
  let { entries } = await getEntries({ dir: 'blog' });
  entries = filterEntriesByDate(entries, year, month);

  return (
    <>
      <h1>
        Blog Archives: {month && capitalize(month)} {year}
      </h1>
      <PostList entries={entries} />
    </>
  );
}
