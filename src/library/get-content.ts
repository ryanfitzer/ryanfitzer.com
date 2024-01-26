import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import { unified } from 'unified';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { capitalize } from '@/library/utils';
import {
  PATHS,
  MONTHS,
  BLOG_POSTS_COUNT,
  REHYPE_SANITIZE_SCHEMA,
} from '@/constants';

// https://github.com/nodeca/js-yaml/issues/91#issuecomment-24515639
const transposeDate = (dateObj: Date) => {
  return new Date(
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth(),
    dateObj.getUTCDate(),
    dateObj.getUTCHours(),
    dateObj.getUTCMinutes(),
    dateObj.getUTCSeconds()
  );
};

const getContentPath = ({ dir, day, month, year, slug }: EntryPathParams) =>
  join(PATHS[dir], [year, month, day, slug].join('-'), 'index.md');

const convertMarkdown = async (fileContent: string, body = false) => {
  const { data, content } = matter(fileContent);

  data.date = transposeDate(data.date);

  if (!body) return data as Entry;

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, REHYPE_SANITIZE_SCHEMA)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    ...data,
    html: processedContent.toString(),
  } as Entry;
};

export async function getEntries({
  dir,
  body,
  start,
  end = BLOG_POSTS_COUNT,
}: EntriesParams) {
  let entryDirs = await readdir(PATHS[dir]);

  if (typeof start !== 'undefined' && start >= 0) {
    entryDirs = entryDirs.slice(start, end);
  }

  const entries = await Promise.all(
    entryDirs.map(async (entryDir) => {
      const filePath = join(PATHS[dir], entryDir, 'index.md');
      const fileContent = await readFile(filePath, 'utf8');
      const { date, ...data } = await convertMarkdown(fileContent, body);
      const day = `${date.getDate()}`.padStart(2, '0');
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const year = `${date.getFullYear()}`;

      return {
        date,
        day,
        month,
        year,
        ...data,
      };
    })
  );

  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getEntry({ body, ...pathParams }: EntryParams) {
  const entryPath = getContentPath(pathParams);
  const fileContent = await readFile(entryPath, 'utf8');

  return fileContent ? await convertMarkdown(fileContent, body) : false;
}

export function filterEntriesByDate(
  entries: Entry[],
  year: string,
  month: string = ''
) {
  const yearNum = Number(year);
  const monthIndex = MONTHS.findIndex((mnth) => capitalize(month) === mnth);
  return entries.filter(({ date }) => {
    const postYear = date.getFullYear();
    const postMonth = date.getMonth();

    if (monthIndex !== -1) {
      return yearNum === postYear && monthIndex === postMonth;
    }

    return yearNum === postYear;
  });
}

export const createEntriesDateArchive = (entries: Entry[]) => {
  const archives = entries.reduce((accum, entry: Entry) => {
    const { date } = entry;
    const month = date.getMonth();
    const year = date.getFullYear().toString();

    accum[year] = accum[year] || [];
    accum[year][month] = accum[year][month] || [MONTHS[month], 0];
    accum[year][month][1] = accum[year][month][1] + 1;

    return accum;
  }, {} as { [year: string]: [string, number][] });

  for (const year in archives) {
    archives[year] = archives[year].filter(Boolean);
  }

  return Object.entries(archives).reverse();
};
