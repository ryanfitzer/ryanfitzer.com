import fs from 'fs';
import path from 'path';
import html from 'remark-html';
import { remark } from 'remark';
import matter from 'gray-matter';
import { postsPath } from '@/constants';

export const getFileName = ({ day, month, year, slug }: PostParams) =>
  [year, month, day, `${slug}.md`].join('-');

export const getPostsMeta = () => {
  const fileNames = fs.readdirSync(postsPath);

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsPath, fileName);
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
  const fullPath = path.join(postsPath, getFileName(params));
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
