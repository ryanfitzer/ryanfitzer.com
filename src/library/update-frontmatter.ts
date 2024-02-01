/* 
    https://stackoverflow.com/a/70046609
*/
import { join } from 'path';
import { readdir, readFile, writeFile } from 'fs/promises';
import matter from 'gray-matter';
import { stringify } from 'yaml';

const CONTENT_PATH = join(process.cwd(), 'src', 'content');
const POSTS_PATH = join(CONTENT_PATH, 'blog');

async function updateFrontMatter(filename: string) {
  const filepath = `${POSTS_PATH}/${filename}`;

  const { data: frontMatter, content } = matter(await readFile(filepath));

  // remove desc attribute
  if (frontMatter.desc === '') {
    delete frontMatter['desc'];
  }

  // parse created date attribute and convert it as timestamp
  if (typeof frontMatter.created === 'string') {
    frontMatter.created = new Date(frontMatter.created).getTime();
  }

  const newContent = `---\n${stringify(frontMatter)}---\n${content}`;

  await writeFile(filepath, newContent);
}

async function main() {
  const filenames = await readdir(POSTS_PATH);
  const markdownFilenames = filenames.filter((f) => f.endsWith('.md'));

  await Promise.all(markdownFilenames.map(updateFrontMatter));
}

main().catch(console.error);
