import { join } from 'path';
import { defaultSchema } from 'rehype-sanitize';

/* Paths */
export const POSTS_PATH = join(process.cwd(), 'src/content/posts');

/* Settings */
export const BLOG_POSTS_COUNT = 10;
export const PHOTOS_POSTS_COUNT = 10;
export const REHYPE_SANITIZE_SCHEMA = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    video: ['loop', 'autoPlay'],
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
