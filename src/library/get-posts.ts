import fs from 'fs';
import path from 'path';
import html from 'remark-html';
import { remark } from 'remark';
import matter from 'gray-matter';
import { capitalize } from '@/library/utils';
import { POSTS_PATH, MONTHS } from '@/constants';

export const getFileName = ({ day, month, year, slug }: PostParams) =>
  [year, month, day, `${slug}.md`].join('-');

export const getPostsMeta = () => {
  const fileNames = fs.readdirSync(POSTS_PATH);

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(POSTS_PATH, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const {
      data: { title, slug, date, id, categories },
    } = matter(fileContent);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = `${date.getFullYear()}`;

    return {
      id,
      date,
      day,
      month,
      year,
      slug,
      title,
      fileName,
      categories,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostMeta = (params: PostParams) => {
  const fileName = getFileName(params);
  const post = getPostsMeta().find((post) => post.fileName === fileName);

  return post || false;
};

export const getPost = async (params: PostParams) => {
  const fullPath = path.join(POSTS_PATH, getFileName(params));
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {
    data: { date, title, categories },
    content,
  } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);

  return {
    title,
    date,
    categories,
    html: processedContent.toString(),
  };
};

export const getPostsByDate = (
  posts: Posts,
  year: string,
  month: string = ''
) => {
  const yearNum = Number(year);
  const monthIndex = MONTHS.findIndex((mnth) => capitalize(month) === mnth);
  return posts.filter(({ date }) => {
    const postYear = date.getFullYear();
    const postMonth = date.getMonth();

    if (monthIndex !== -1) {
      return yearNum === postYear && monthIndex === postMonth;
    }

    return yearNum === postYear;
  });
};

export const getBlogPostsMeta = () => {
  return getPostsMeta().filter(({ categories }) => {
    return !['Photos', 'Portfolio'].some((cat) => categories.includes(cat));
  });
};

export const getPhotosPostsMeta = () => {
  return getPostsMeta().filter(({ categories }) => {
    return categories.includes('Photos');
  });
};

export const createDateArchive = (posts: Posts) => {
  const archives = posts.reduce((accum, post: Post) => {
    const { date } = post;
    const month = date.getMonth();
    const year = date.getFullYear().toString();

    accum[year] = accum[year] || [];
    accum[year][month] = accum[year][month] || [MONTHS[month], 0];
    accum[year][month][1] = accum[year][month][1] + 1;

    return accum;
  }, {} as Archives);

  for (const year in archives) {
    archives[year] = archives[year].filter(Boolean);
  }

  return Object.entries(archives).reverse();
};
