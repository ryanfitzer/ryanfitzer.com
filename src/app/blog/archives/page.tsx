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
      <h1 className="font-heading text-gray-700 text-3xl mb-12 px-4 md:text-right">
        Blog Archives
      </h1>

      <ul className="flex flex-col space-y-12 mb-16 px-4">
        {archives.map(([year, months]) => (
          <li
            key={year}
            className="grid grid-cols-[7rem_auto] md:grid-cols-[9rem_auto] grid-rows-1"
          >
            <h2 className="font-body text-2xl font-bold text-gray-700 mt-4 pt-3 border-t-2 mr-4">
              <Link href={`archives/${year}`}>{year}</Link>
            </h2>
            <ul className="col-start-2 columns-[8rem] mt-4 pt-4 space-y-2 uppercase text-gray-700 border-t-2">
              {months.map(([month, count]) => (
                <li key={`${year}-${month}`}>
                  <Link href={`archives/${year}/${month.toLowerCase()}`}>
                    <span className="">
                      {month}{' '}
                      <sup className="text-xs text-gray-500">{count}</sup>
                    </span>
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
