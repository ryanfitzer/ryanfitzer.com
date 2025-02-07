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

export async function generateMetadata(
  props: {
    params: Promise<{
      date: [string, string?];
    }>;
  }
) {
  const params = await props.params;

  const {
    date: [year, month]
  } = params;

  if (month) {
    return {
      title: `Archive for ${month} ${year} | Blog`,
    };
  }

  return {
    title: `Archive for ${year} | Blog`,
  };
}

export default async function Page(
  props: {
    params: Promise<{
      date: [string, string?];
    }>;
  }
) {
  const params = await props.params;

  const {
    date: [year, month]
  } = params;

  let { entries } = await getEntries({ dir: 'blog' });
  entries = filterEntriesByDate(entries, year, month);

  return (
    <>
      <h1 className="font-heading text-gray-800 text-4xl mb-12 px-4 text-center">
        Blog Archives: {month && capitalize(month)} {year}
      </h1>
      <PostList entries={entries} paginationProps={{}} />
    </>
  );
}
