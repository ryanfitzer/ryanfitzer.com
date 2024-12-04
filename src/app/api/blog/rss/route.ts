import RSS from 'rss';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getEntries, getPage } from '@/library/get-content';
import rehypeImage from '@/library/rehype-image';

async function getEntryHTML(content: string, contentDir: string) {
  const vfile = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeImage, { contentDir })
    .use(rehypeStringify)
    .process(content);

  return vfile.value as string;
}

async function generateRSS() {
  const {
    data: { author },
  } = await getPage('home');
  const { entries } = await getEntries({
    dir: 'blog',
    body: true,
    start: 0,
    end: 10,
  });
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

  const feed = new RSS({
    title: `${author}`,
    description: 'Blog Entries',
    site_url: `${siteURL}/`,
    feed_url: `${siteURL}/api/blog/rss`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    language: 'en-US',
    pubDate: new Date(),
  });

  await entries.forEach(
    async ({ date, content = '', contentDir, title, route }) => {
      feed.item({
        date,
        title,
        author,
        guid: `${siteURL}${route}`,
        url: `${siteURL}${route}`,
        description: await getEntryHTML(content, contentDir),
      });
    }
  );

  return feed;
}

export async function GET() {
  const feed = await generateRSS();

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
