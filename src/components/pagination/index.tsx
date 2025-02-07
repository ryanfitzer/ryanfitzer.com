import Link from 'next/link';

export type PaginationProps = {
  prevRoute?: string;
  prevText?: string;
  nextRoute?: string;
  nextText?: string;
};

export function Pagination({
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
    <div className="font-body mt-12 flex justify-around space-x-8 text-base text-gray-600">
      {prevRoute && <Link href={prevRoute}>&larr; {prevText}</Link>}
      {nextRoute && <Link href={nextRoute}>{nextText} &rarr;</Link>}
    </div>
  );
}
