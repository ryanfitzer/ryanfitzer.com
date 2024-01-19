type Post = {
  date: string;
  id: string;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  slug?: string;
  layout?: string;
  categories?: string[];
};

type Posts = Post[];

type BlogParams = {
  path: string[];
};

type PostParams = {
  day: string;
  month: string;
  year: string;
  slug: string;
};
