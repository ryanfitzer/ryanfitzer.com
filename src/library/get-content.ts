import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { capitalize } from '@/library/utils';
import { getLongDate, parseDate, transposeDate } from '@/library/format-dates';
import { PATHS, MONTHS, BLOG_POSTS_COUNT } from '@/constants';

const getContentPath = ({ dir, day, month, year, slug }: EntryPathParams) =>
  join(PATHS[dir], [year, month, day, slug].join('-'), 'index.md');

const getMarkdown = (fileContent: string, body = false) => {
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

const parseEntry = (content: string, body: boolean = false) => {
  const { date, ...data } = getMarkdown(content, body);
  const localDate = transposeDate(date);
  const { day, month, year } = parseDate(localDate);

  return {
    ...data,
    date: localDate,
    day,
    month,
    year,
    dateLong: getLongDate(localDate),
  };
};

export async function getEntries({
  dir,
  body,
  start,
  end = BLOG_POSTS_COUNT,
}: EntriesParams) {
  let entryDirs = await readdir(PATHS[dir]);

  entryDirs.reverse();

  if (typeof start !== 'undefined' && start >= 0) {
    entryDirs = entryDirs.slice(start, end);
  }

  const entries = entryDirs.map(async (entryDir) => {
    const filePath = join(PATHS[dir], entryDir, 'index.md');
    const fileContent = await readFile(filePath, 'utf8');
    const entryData = parseEntry(fileContent);

    return {
      ...entryData,
      route: getEntryRoute({ dir, ...entryData }),
    };
  });

  return await Promise.all(entries);
}

export async function getEntry({ body, ...pathParams }: EntryParams) {
  const entryPath = getContentPath(pathParams);
  const fileContent = await readFile(entryPath, 'utf8');

  if (!fileContent) return false;

  return parseEntry(fileContent, true);
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
