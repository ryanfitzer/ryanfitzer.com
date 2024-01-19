import { blogPostsCount } from '@/constants';
import { getPostsMeta } from '@/library/get-posts';
import Blog from '@/app/blog/page';

type PageParams = {
  page: string;
};

const getTotalPages = () => {
  const posts = getPostsMeta();

  return Math.floor(posts.length / blogPostsCount);
};

export function generateMetadata({ params: { page } }: { params: PageParams }) {
  if (Number(page) > getTotalPages()) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `Blog | Page ${page} | Ryan Fitzer`,
  };
}

export function generateStaticParams() {
  return new Array(getTotalPages()).map((val, index) => ({
    page: index,
  }));
}

export default async function Page({
  params: { page },
}: {
  params: PageParams;
}) {
  return <Blog page={Number(page)} />;
}
