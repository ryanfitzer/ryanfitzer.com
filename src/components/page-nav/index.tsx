import Link from 'next/link';

export default function PageNav({
  prevRoute,
  prevText = 'Recent',
  nextRoute,
  nextText = 'Earlier',
}: {
  prevRoute?: string | undefined;
  prevText?: string;
  nextRoute?: string;
  nextText?: string | undefined;
}) {
  return (
    <div className="flex justify-around mt-12 space-x-8 font-body text-base text-gray-600">
      {prevRoute && <Link href={prevRoute}>&larr; {prevText}</Link>}
      {nextRoute && <Link href={nextRoute}>{nextText} &rarr;</Link>}
    </div>
  );
}
