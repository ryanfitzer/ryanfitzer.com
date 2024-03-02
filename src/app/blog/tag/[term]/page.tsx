import PageNav from '@/app/(components)/page-nav';
import { PostList } from '@/app/(components)/post-list';
import { getEntries, filterEntriesByTag } from '@/library/get-content';
import {
  MAX_POSTS_PER_PAGE,
  BLOG_PAGED_COUNT,
  PHOTO_PAGED_COUNT,
} from '~/src/library/constants';

type TagParams = {
  params: {
    term: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { tags } = await getEntries({ dir: 'blog' });

  return Object.keys(tags).map((tag) => {
    return {
      path: tag,
    };
  });
}

export async function generateMetadata({ params: { term } }: TagParams) {
  const { tags } = await getEntries({ dir: 'blog' });
  const tagsArray = Object.keys(tags);

  if (!tagsArray.includes(term)) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `Tag ${term}`,
  };
}

export default async function PostsByTag({ params: { term } }: TagParams) {
  const { entries, tags } = await getEntries({ dir: 'blog', body: true });
  const pagedCount = term === 'photo' ? PHOTO_PAGED_COUNT : BLOG_PAGED_COUNT;
  const isPaged = tags[term] > MAX_POSTS_PER_PAGE;
  let filteredEntries = filterEntriesByTag(entries, term);

  if (isPaged) {
    filteredEntries = filteredEntries.slice(0, pagedCount);
  }

  return (
    <>
      <PostList entries={filteredEntries} />
      {isPaged && (
        <PageNav nextRoute={`/blog/tag/${term}/page/2`} nextText="Page 2" />
      )}
    </>
  );
}
