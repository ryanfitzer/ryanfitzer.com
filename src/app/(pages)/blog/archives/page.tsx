import { Metadata } from 'next';
import Link from 'next/link';
import { getEntries, createEntriesDateArchive } from '@/library/get-content';

export const metadata: Metadata = {
  title: 'Archives | Blog',
};

export default async function Page() {
  const { entries } = await getEntries({ dir: 'blog' });
  const archives = createEntriesDateArchive(entries);

  return (
    <>
      <h1 className="font-heading text-gray-800 text-4xl mb-12 px-4 mx-auto text-center md:text-left max-w-[calc(var(--max-width-column)+2rem)]">
        Blog Archives
      </h1>

      <ul className="flex flex-col space-y-12 mb-16 px-4 mx-auto max-w-[calc(var(--max-width-column)+2rem)] w-full">
        {archives.map(([year, months]) => (
          <li
            key={year}
            className="grid grid-cols-[7rem_auto] md:grid-cols-[9rem_auto] grid-rows-1 w-full"
          >
            <h2 className="font-body text-2xl font-bold text-gray-700 mt-4 pt-3 border-t-2 mr-4">
              <Link href={`archives/${year}`}>{year}</Link>
            </h2>
            <ul className="col-start-2 columns-[8rem] mt-4 pt-4 space-y-2 border-t-2 list-none">
              {months.map(([month, count]) => (
                <li key={`${year}-${month}`}>
                  <Link
                    className="text-link hover:text-gray-700"
                    href={`archives/${year}/${month.toLowerCase()}`}
                  >
                    {month} <sup className="text-xs">{count}</sup>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
