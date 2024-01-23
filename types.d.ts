type Archives = {
  [year: string]: [string, number][];
};

type Post = {
  date: Date;
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
  path: [string, string, string, string];
};

type BlogArchiveDates = {
  date: [string, string?];
};

type BlogArchiveParams = {
  params: {
    date: [string, string?];
  };
};

type PostParams = {
  day: string;
  month: string;
  year: string;
  slug: string;
};
