import { notFound } from 'next/navigation';
import { Portfolio } from '@/components/portfolio';
import { getEntries } from '@/library/get-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { entries } = await getEntries({ dir: 'portfolio' });

  return entries.map(({ slug }) => {
    return { slug };
  });
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const { entries } = await getEntries({ dir: 'portfolio' });

  const [entry] = entries.filter((entry) => {
    return entry.slug === slug;
  });

  if (!entry) {
    return {
      title: 'Not Found | Ryan Fitzer',
    };
  }

  return {
    title: `${entry.title} | Ryan Fitzer`,
  };
}

export default async function Page(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const { entries } = await getEntries({ dir: 'portfolio', body: true });

  const [entry] = entries.filter((entry) => {
    return entry.slug === slug;
  });

  if (!entry) notFound();

  return <Portfolio {...entry} />;
}
