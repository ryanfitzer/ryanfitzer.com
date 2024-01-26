import { join } from 'path';
import { defaultSchema } from 'rehype-sanitize';

/* Paths */
export const CONTENT_PATH = join(process.cwd(), 'src', 'content');
export const PATHS = {
  home: join(CONTENT_PATH, 'home'),
  blog: join(CONTENT_PATH, 'blog'),
  photos: join(CONTENT_PATH, 'photos'),
  portfolio: join(CONTENT_PATH, 'portfolio'),
} as { [key: string]: string };

/* Settings */
export const BLOG_POSTS_COUNT = 10;
export const PHOTOS_POSTS_COUNT = 10;
export const REHYPE_SANITIZE_SCHEMA = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    video: ['loop', 'autoPlay', 'controls', 'preload', 'controlsList'],
    source: ['src', 'srcSet', 'type'],
  },
  tagNames: Array.isArray(defaultSchema.tagNames)
    ? [...defaultSchema.tagNames, 'video']
    : [],
};

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
