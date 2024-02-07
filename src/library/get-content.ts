import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { capitalize } from '@/library/utils';
import {
  getLongDate,
  parseDate,
  parseDisplayDate,
} from '@/library/format-dates';
import { PATHS, CONTENT_DIR, MONTHS, BLOG_POSTS_COUNT } from '@/constants';

const getContentPath = ({ dir, day, month, year, slug }: EntryPathParams) =>
  join(PATHS[dir], [year, month, day, slug].join('-'), 'index.md');

const getPagePath = (pageName: string) => join(PATHS[pageName], 'index.md');

const getEntryMarkdown = (fileContent: string, body = false) => {
  const { data, content } = matter(fileContent);

  if (!body) return { ...data } as Entry;

  return { ...data, content } as Entry;
};

const getEntryRoute = ({
  dir,
  year,
  month,
  day,
  slug,
}: {
  dir: string;
  year: string;
  month: string;
  day: string;
  slug: string;
}) => {
  return `/${dir}/${year}/${month}/${day}/${slug}`;
};

const getEntryContentDir = ({
  dir,
  year,
  month,
  day,
  slug,
}: {
  dir: string;
  year: string;
  month: string;
  day: string;
  slug: string;
}) => {
  return `/${CONTENT_DIR}/${dir}/${year}-${month}-${day}-${slug}`;
};

const parseEntry = (dir: string, content: string, body: boolean = false) => {
  const { date, slug, ...data } = getEntryMarkdown(content, body);

  const { day, month, year } = parseDisplayDate(date);

  return {
    ...data,
    day,
    month,
    year,
    slug,
    date,
    dateLong: getLongDate(date),
    route: getEntryRoute({
      dir,
      year,
      month,
      day,
      slug,
    }),
    contentDir: getEntryContentDir({
      dir,
      year,
      month,
      day,
      slug,
    }),
  };
};

export async function getEntries({
  dir,
  body,
  start,
  end = BLOG_POSTS_COUNT,
}: EntriesParams) {
  let entryDirs = await readdir(PATHS[dir]);
  entryDirs = entryDirs.filter((dir) => dir !== '.DS_Store');

  entryDirs.reverse();

  if (typeof start !== 'undefined' && start >= 0) {
    entryDirs = entryDirs.slice(start, end);
  }

  const entries = entryDirs.map(async (entryDir) => {
    const filePath = join(PATHS[dir], entryDir, 'index.md');
    const fileContent = await readFile(filePath, 'utf8');

    return parseEntry(dir, fileContent);
  });

  return await Promise.all(entries);
}

export async function getEntry({ body, dir, ...pathParams }: EntryParams) {
  const entryPath = getContentPath({ dir, ...pathParams });
  const fileContent = await readFile(entryPath, 'utf8');

  if (!fileContent) return false;

  return {
    ...parseEntry(dir, fileContent, true),
  };
}

export function filterEntriesByDate(
  entries: Entry[],
  year: string,
  month: string = ''
) {
  const yearNum = Number(year);
  const monthIndex = MONTHS.findIndex((mnth) => capitalize(month) === mnth);
  return entries.filter(({ date }) => {
    const { month: postMonth, year: postYear } = parseDate(date);

    if (monthIndex !== -1) {
      return yearNum === postYear && monthIndex === postMonth;
    }

    return yearNum === postYear;
  });
}

export async function getPage(pageName: string) {
  const fileContent = await readFile(getPagePath(pageName), 'utf8');

  return matter(fileContent);
}

export const createEntriesDateArchive = (entries: Entry[]) => {
  const archives = entries.reduce((accum, entry: Entry) => {
    const { date } = entry;
    const { month, year } = parseDate(date);

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
