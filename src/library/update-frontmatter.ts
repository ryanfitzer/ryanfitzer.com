/* 
    https://stackoverflow.com/a/70046609
*/
import matter from 'gray-matter';
import { stringify } from 'yaml';
import { readdir, readFile, writeFile } from 'fs/promises';
import { POSTS_PATH } from '@/constants';

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

  console.log(`- [x] ${filepath}`);
}

async function main() {
  const filenames = await readdir(POSTS_PATH);
  const markdownFilenames = filenames.filter((f) => f.endsWith('.md'));

  await Promise.all(markdownFilenames.map(updateFrontMatter));
}

main().catch(console.error);
