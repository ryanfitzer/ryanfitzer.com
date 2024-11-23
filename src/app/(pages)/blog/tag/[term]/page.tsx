import { PostList } from '~/src/components/post-list';
import { PaginationProps } from '~/src/components/pagination';
import { getEntries, filterEntriesByTag } from '@/library/get-content';
import { BLOG_PAGED_COUNT, MAX_POSTS_PER_PAGE } from '~/src/library/constants';

type TagParams = {
  params: Promise<{
    term: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { tags } = await getEntries({ dir: 'blog' });

  return Object.keys(tags).map((tag) => {
    return {
      term: tag,
    };
  });
}

export async function generateMetadata(props: TagParams) {
  const params = await props.params;

  const {
    term
  } = params;

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

export default async function Page(props: TagParams) {
  const params = await props.params;

  const {
    term
  } = params;

  const paginationProps = {} as PaginationProps;
  const { entries, tags } = await getEntries({ dir: 'blog', body: true });
  const isPaged = tags[term] > MAX_POSTS_PER_PAGE;
  let filteredEntries = filterEntriesByTag(entries, term);

  if (isPaged) {
    filteredEntries = filteredEntries.slice(0, BLOG_PAGED_COUNT);
    paginationProps.nextRoute = `/blog/tag/${term}/page/2`;
    paginationProps.nextText = 'Page 2';
  }

  return (
    <PostList entries={filteredEntries} paginationProps={paginationProps} />
  );
}
