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
  isBlog: boolean;
  isPhoto: boolean;
  isQuick: boolean;
  categories?: string[];
  content?: string;
  cover?: string;
  tags?: string[];
};

type Entries = {
  entries: Entries[];
  totalPages: number;
  categories: {
    [category: string]: number;
  };
  tags: {
    [tag: string]: number;
  };
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

type Page = {
  id: number;
  route: string;
  slug: string;
  page: string;
  author?: string;
  props?: Record<string, any>;
};

type Pagination = {
  prevText: string;
  prevRoute: string;
  nextText: string;
  nextRoute: string;
};

type ImageMeta = {
  width: number;
  height: number;
  secure_url: string;
  metadata: {
    model?: string;
    iso?: string;
    exposure?: string;
    aperture?: string;
    focalLength?: string;
    focalLengthIn35mmFormat?: string;
  };
  error?: {
    message: string;
    name: string;
    http_code: number;
  };
};

type ImagesMeta = {
  [publicID: string]: ImageMeta;
};
