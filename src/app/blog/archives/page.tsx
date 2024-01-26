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
      <h1 className="font-test text-6xl text-center mb-12">Blog Archives</h1>

      <ul className="flex flex-col text-center space-y-12">
        {archives.map(([year, months]) => (
          <li key={year}>
            <h2 className="font-test text-3xl mb-4">
              <Link href={`archives/${year}`}>{year}</Link>
            </h2>
            <ul className="flex justify-center space-x-4">
              {months.map(([month, count]) => (
                <li key={`${year}-${month}`} className="">
                  <Link href={`archives/${year}/${month.toLowerCase()}`}>
                    <span className="text-nowrap">
                      {month} ({count})
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
