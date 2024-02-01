import { Metadata } from 'next';
import Link from 'next/link';
import { getEntries, createEntriesDateArchive } from '@/library/get-content';

export const metadata: Metadata = {
  title: 'Archives | Blog',
};

export default async function BlogArchives() {
  const archives = createEntriesDateArchive(await getEntries({ dir: 'blog' }));

  return (
    <>
      <h1 className="font-mono text-gray-700 text-3xl mb-12">Blog Archives</h1>

      <ul className="flex flex-col space-y-12 mb-16">
        {archives.map(([year, months]) => (
          <li
            key={year}
            className="grid grid-cols-[9rem_auto] grid-rows-1 border-t-2"
          >
            <h2 className="font-mono text-2xl text-gray-700 mt-4">
              <Link href={`archives/${year}`}>{year}</Link>
            </h2>
            <ul className="col-start-2 columns-[8rem] mt-4 space-y-2 uppercase text-gray-700">
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
