import { Metadata } from 'next';
import { getEntries } from '@/library/get-content';
import { PostDefault } from '@/components/post-default';
import { PostQuick } from '@/components/post-quick';
import Pagination from '~/src/components/pagination';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function Page() {
  const { entries } = await getEntries({
    dir: 'blog',
    start: 0,
    end: 10,
    body: true,
  });

  return (
    <>
      {entries.map((entry) => {
        const { id, isQuick } = entry;

        return (
          <div
            key={id}
            className="blog-entry-listing flex flex-col items-center"
          >
            {isQuick ? (
              <PostQuick key={id} permalink layout="listing" {...entry} />
            ) : (
              <PostDefault key={id} permalink layout="listing" {...entry} />
            )}

            <hr className="mx-28 mt-10 mb-6 border-t-2" />
          </div>
        );
      })}
      <Pagination nextRoute="/blog/page/2" nextText="Page 2" />
    </>
  );
}
