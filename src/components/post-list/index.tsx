import { twClsx } from '@/library/tw-clsx';
import { PostDefault } from '@/components/post-default';
import { PostQuick } from '@/components/post-quick';
import { Pagination, PaginationProps } from '~/src/components/pagination';

export const PostList = ({
  entries,
  paginationProps,
}: {
  entries: Entry[];
  paginationProps: PaginationProps;
}) => {
  return (
    <>
      {entries.map((entry) => {
        const { id, isQuick } = entry;

        return (
          <div
            key={id}
            className={twClsx(
              'blog-entry-listing flex flex-col items-center mb-24',
              {
                'quick-entry': isQuick,
              }
            )}
          >
            {isQuick ? (
              <PostQuick key={id} permalink layout="listing" {...entry} />
            ) : (
              <PostDefault key={id} permalink layout="listing" {...entry} />
            )}
          </div>
        );
      })}
      {paginationProps && <Pagination {...paginationProps} />}
    </>
  );
};
