import { join } from 'path';

/* Paths */
export const GENERATED_DIR = join('src', 'generated');
export const CONTENT_DIR = 'content';
export const PUBLIC_PATH = join(process.cwd(), 'public');
export const CONTENT_PATH = join(process.cwd(), CONTENT_DIR);
export const PATHS = {
  home: join(CONTENT_PATH, 'home'),
  blog: join(CONTENT_PATH, 'blog'),
  photos: join(CONTENT_PATH, 'photos'),
  portfolio: join(CONTENT_PATH, 'portfolio'),
} as { [key: string]: string };

/* Settings */
export const BLOG_PAGED_COUNT = 10;
export const PHOTO_PAGED_COUNT = 10;
export const MAX_POSTS_PER_PAGE = 30;

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
