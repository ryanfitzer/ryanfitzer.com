import { join } from 'path';

/* Paths */
export const CONTENT_DIR = 'content';
export const CONTENT_PATH = join(process.cwd(), 'public', CONTENT_DIR);
export const PATHS = {
  home: join(CONTENT_PATH, 'home'),
  blog: join(CONTENT_PATH, 'blog'),
  photos: join(CONTENT_PATH, 'photos'),
  portfolio: join(CONTENT_PATH, 'portfolio'),
} as { [key: string]: string };

/* Settings */
export const BLOG_POSTS_COUNT = 10;
export const PHOTOS_POSTS_COUNT = 10;

/* Strings */
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
