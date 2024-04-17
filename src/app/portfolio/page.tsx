import Link from 'next/link';
import { getEntries } from '~/src/library/get-content';
import { Image } from '@/components/image';

export default async function Page() {
  const { entries } = await getEntries({ dir: 'portfolio' });

  return (
    <div className="mx-auto grid grid-cols-2 gap-5 px-4">
      {entries.map((entry) => {
        const { id, title, year, cover, route } = entry;
        return (
          <div key={id} className="">
            <Link href={route}>
              <Image src={cover!} alt="" {...entry} />
            </Link>
            <div className="flex justify-between">
              <Link href={route}>
                <h2 className="title">{title}</h2>
              </Link>
              <p className="date">{year}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
