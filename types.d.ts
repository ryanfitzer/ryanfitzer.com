type Entry = {
  date: Date;
  title: string;
  slug: string;
  route: string;
  id?: string;
  layout?: string;
  categories?: string[];
  content?: string;
  day: string;
  month: string;
  year: string;
  dateLong: string;
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
