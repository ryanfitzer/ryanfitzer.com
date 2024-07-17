import { PostDefault } from '@/components/post-default';
import { PostPhotoPLP } from '@/components/post-photo';
import { PostQuick } from '@/components/post-quick';

export const PostList = ({ entries }: { entries: Entry[] }) => {
  return (
    <div className="w-full">
      {entries.map((entry) => {
        const { id, isBlog, isPhoto, isQuick } = entry;

        return (
          <article key={id} className="flex flex-col">
            {isQuick ? (
              <PostQuick key={id} permalink {...entry} />
            ) : (
              <PostDefault key={id} permalink {...entry} />
            )}

            <hr className="mx-28 mt-10 mb-6 border-t-2" />
          </article>
        );
      })}
    </div>
  );
};
