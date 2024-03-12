import { join } from 'path';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import matter from 'gray-matter';

const BLOG_CONTENT_PATH = join('content', 'blog');
const GENERATED_PATH = join('src', 'generated');
const INDEX_FILE_PATH = join(GENERATED_PATH, 'entries-search-data.json');

export const transposeDate = (date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const parseDisplayDate = (date) => {
  return {
    day: `${date.getUTCDate()}`.padStart(2, '0'),
    month: `${date.getUTCMonth() + 1}`.padStart(2, '0'),
    year: `${date.getUTCFullYear()}`,
  };
};

const getEntryRoute = ({ year, month, day, slug }) => {
  return `/blog/${year}/${month}/${day}/${slug}`;
};

const getEntryMarkdown = (fileContent) => {
  const {
    data: { title, date, slug },
    content,
  } = matter(fileContent);

  const { day, month, year } = parseDisplayDate(transposeDate(date));

  return {
    title,
    url: getEntryRoute({ day, month, year, slug }),
    body: content,
  };
};

const allDirs = await readdir(BLOG_CONTENT_PATH);
const dirs = allDirs.filter((dir) => {
  const pathArr = dir.split('/');
  const validDir = pathArr.indexOf('.DS_Store');

  return validDir === -1;
});

const entryFiles = dirs.map((dir) => `${dir}/index.md`);

const entries = await Promise.all(
  entryFiles.map(async (filePath) => {
    const entryPath = join(BLOG_CONTENT_PATH, filePath);
    const fileContent = await readFile(entryPath, 'utf8');

    return getEntryMarkdown(fileContent);
  })
);

await mkdir(GENERATED_PATH, { recursive: true });

await writeFile(INDEX_FILE_PATH, JSON.stringify(entries, null, 2)).catch(
  (error) => console.log('\n[Error: Write]', error)
);

console.log(`\n[Write] File created: ${INDEX_FILE_PATH}\n`);
