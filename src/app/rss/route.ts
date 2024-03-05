// import { Feed } from 'feed';
import RSS from 'rss';
import { getEntries, getPage } from '@/library/get-content';

async function generateRSS() {
  const {
    data: { author },
  } = await getPage('home');
  const { entries } = await getEntries({ dir: 'blog', start: 0, end: 10 });
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

  const feed = new RSS({
    title: `${author} | RSS`,
    description: 'Blog',
    site_url: `${siteURL}/`,
    feed_url: `${siteURL}/rss`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    language: 'en-US',
    pubDate: new Date(),
  });

  entries.forEach(({ date, id, title, route }) => {
    feed.item({
      date,
      title,
      author,
      guid: `${siteURL}${route}`,
      url: `${siteURL}${route}`,
      description: '',
    });
  });

  return feed;
}

export async function GET() {
  const feed = await generateRSS();

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
