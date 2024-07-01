import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { capitalize } from '@/library/utils';
import {
  getLongDate,
  parseDate,
  parseDisplayDate,
} from '@/library/format-dates';
import {
  PATHS,
  CONTENT_DIR,
  MONTHS,
  BLOG_PAGED_COUNT,
} from '~/src/library/constants';

const getContentPath = ({ dir, day, month, year, slug }: EntryPathParams) =>
  join(PATHS[dir], [year, month, day, slug].join('-'), 'index.md');

const getDocumentPath = (pageName: string) => join(PATHS[pageName], 'index.md');

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
  categories,
}: {
  dir: string;
  year: string;
  month: string;
  day: string;
  slug: string;
  categories: string[];
}) => {
  if (categories.includes('portfolio')) {
    return `/${dir}/${slug}`;
  }
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
  return `${CONTENT_DIR}/${dir}/${year}-${month}-${day}-${slug}`;
};

const parseEntry = (
  dir: string,
  content: string,
  body: boolean = false
): Entry => {
  const {
    date,
    slug,
    categories = [],
    ...data
  } = getEntryMarkdown(content, body);

  const { day, month, year } = parseDisplayDate(date);

  return {
    ...data,
    day,
    month,
    year,
    slug,
    date,
    categories,
    isBlog: categories.includes('blog'),
    isPhoto: categories.includes('photo'),
    isQuick: categories.includes('quick'),
    dateLong: getLongDate(date),
    route: getEntryRoute({
      dir,
      year,
      month,
      day,
      slug,
      categories,
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

function getEntriesCategories(entries: Entry[]) {
  return entries.reduce((accum, { categories = [] }) => {
    categories.forEach((cat) => {
      accum[cat] = accum[cat] || 0;
      accum[cat] = accum[cat] + 1;
    });

    return accum;
  }, {} as { [category: string]: number });
}

function getEntriesTags(entries: Entry[]) {
  return entries.reduce((accum, { tags = [] }) => {
    tags.forEach((tag) => {
      accum[tag] = accum[tag] || 0;
      accum[tag] = accum[tag] + 1;
    });

    return accum;
  }, {} as { [tag: string]: number });
}

export async function getEntries({
  dir,
  start,
  body = false,
  end = BLOG_PAGED_COUNT,
}: EntriesParams) {
  let entryDirs = await readdir(PATHS[dir]);
  entryDirs = entryDirs.filter((dir) => dir !== '.DS_Store');
  const totalPages = Math.ceil(entryDirs.length / BLOG_PAGED_COUNT);

  entryDirs.reverse();

  if (typeof start !== 'undefined' && start >= 0) {
    entryDirs = entryDirs.slice(start, end);
  }

  const entries = await Promise.all(
    entryDirs.map(async (entryDir) => {
      const filePath = join(PATHS[dir], entryDir, 'index.md');
      const fileContent = await readFile(filePath, 'utf8');

      return parseEntry(dir, fileContent, body);
    })
  );

  return {
    entries: entries.filter(({ draft }) => !draft),
    totalPages,
    tags: getEntriesTags(entries),
    categories: getEntriesCategories(entries),
  };
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

export function filterEntriesByCategory(entries: Entry[], category: string) {
  return entries.filter(({ categories }) => categories?.includes(category));
}

export function filterEntriesByTag(entries: Entry[], tag: string) {
  return entries.filter(({ tags }) => tags?.includes(tag));
}

export const createEntriesDateArchive = (entries: Entry[]) => {
  const archives = entries.reduce((accum, entry: Entry) => {
    const { date } = entry;
    const { month, year } = parseDate(date);

    accum[year] = accum[year] || [];
    accum[year][month] = accum[year][month] || [MONTHS[month], 0];
    accum[year][month][1] = accum[year][month][1] + 1;

    return accum;
  }, {} as { [year: string]: [month: string, count: number][] });

  for (const year in archives) {
    archives[year] = archives[year].filter(Boolean);
  }

  return Object.entries(archives).reverse();
};

export async function getPage(pageName: string) {
  const fileContent = await readFile(getDocumentPath(pageName), 'utf8');

  return matter(fileContent);
}
