import { join, resolve } from 'path';
import { readdir, readFile } from 'fs/promises';
import { move } from 'fs-extra';
import matter from 'gray-matter';
import { getLongDate, parseDisplayDate } from './format-dates.mjs';

export const CONTENT_DIR = 'content';
export const CONTENT_PATH = join(process.cwd(), CONTENT_DIR);
export const PATHS = {
  home: join(CONTENT_PATH, 'home'),
  blog: join(CONTENT_PATH, 'blog'),
  photo: join(CONTENT_PATH, 'photo'),
  portfolio: join(CONTENT_PATH, 'portfolio'),
};

const getEntryRoute = ({ dir, year, month, day, slug, categories }) => {
  if (categories.includes('portfolio')) {
    return `/${dir}/${slug}`;
  }
  return `/${dir}/${year}/${month}/${day}/${slug}`;
};

const getEntryContentDir = ({ dir, year, month, day, slug }) => {
  return `${CONTENT_DIR}/${dir}/${year}-${month}-${day}-${slug}`;
};

const getEntryMarkdown = (fileContent, body = false) => {
  const { data, content } = matter(fileContent);

  if (!body) return { ...data };

  return { ...data, content };
};

const parseEntry = (dir, content, body = false) => {
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

function getEntriesCategories(entries) {
  return entries.reduce((accum, { categories = [] }) => {
    categories.forEach((cat) => {
      accum[cat] = accum[cat] || 0;
      accum[cat] = accum[cat] + 1;
    });

    return accum;
  }, {});
}

function getEntriesTags(entries) {
  return entries.reduce((accum, { tags = [] }) => {
    tags.forEach((tag) => {
      accum[tag] = accum[tag] || 0;
      accum[tag] = accum[tag] + 1;
    });

    return accum;
  }, {});
}

async function getEntries({ dir, body = false }) {
  let entryDirs = await readdir(PATHS[dir]);
  entryDirs = entryDirs.filter((dir) => dir !== '.DS_Store');

  const entries = await Promise.all(
    entryDirs.map(async (entryDir) => {
      const filePath = join(PATHS[dir], entryDir, 'index.md');
      const fileContent = await readFile(filePath, 'utf8');

      return parseEntry(dir, fileContent, body);
    })
  );

  return {
    entries: entries.filter(({ draft }) => !draft),
    tags: getEntriesTags(entries),
    categories: getEntriesCategories(entries),
  };
}

function filterEntriesByCategory(entries, category) {
  return entries.filter(({ categories }) => categories?.includes(category));
}

async function moveEntries(entries, src, dest) {
  return Promise.all(
    entries.map(async ({ contentDir }) => {
      const dir = contentDir.split('/').pop();
      const source = resolve(src, dir);
      const destination = join(dest, dir);

      await move(source, destination, (err) => {
        if (err) console.log('Error', source, err);
        console.log('Success', ` From: ${source}`, `\n  To: ${destination}\n`);
      });
    })
  );
}

const allEntries = await getEntries({ dir: 'blog' });
const photoEntries = filterEntriesByCategory(allEntries.entries, 'photo');
console.log(JSON.stringify(photoEntries, null, 2));
// await moveEntries(photoEntries, PATHS['blog'], PATHS['photo']);
