/**
 * Entry (post) properties
 */
type Entry = {
  contentDir: string;
  date: Date;
  dateLong: string;
  day: string;
  id: string;
  month: string;
  route: string;
  slug: string;
  template: string;
  title: string;
  year: string;
  categories?: string[];
  content?: string;
};

type EntriesParams = {
  dir: string /* name of content directory */;
  body?: boolean /* include the content body (converted to HTML) */;
  start?: number /* starting count to `slice()` the array or entries */;
  end?: number /* ending count to `slice()` the array or entries */;
};

type EntryPathParams = {
  dir: string /* name of content directory */;
  day: string;
  month: string;
  year: string;
  slug: string;
};

type EntryParams = EntryPathParams & {
  body?: boolean /* include the content body (converted to HTML) */;
};
