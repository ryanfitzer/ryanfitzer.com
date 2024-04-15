import Link from 'next/link';
import clsx from 'clsx';
import MDX from '@/app/(components)/mdx';
import { MONTHS } from '~/src/library/constants';

const DateTime = ({
  date,
  day,
  month,
  year,
  className = '',
}: Pick<Entry, 'date' | 'day' | 'month' | 'year'> & { className?: string }) => {
  const mnth = MONTHS[date.getMonth()].slice(0, 3);

  return (
    <div className="w-12 h-12 bg-gray-600 rounded-full outline-1 outline outline-offset-2 outline-gray-500">
      <time
        className={clsx(
          'flex flex-col w-12 h-12 text-center justify-center font-body text-xs sm:leading-3 text-gray-100',
          className
        )}
        itemProp="dateCreated"
        dateTime={`${year}-${month}-${day}`}
      >
        <span className="uppercase text-[.75rem] tracking-wide">{mnth}</span>
        <span className="">{year}</span>
      </time>
    </div>
  );
};

const componentOptions = {
  img: {
    className: 'max-h-[80vh] max-w-full h-auto w-auto',
  },
};

export const PostPhotoPLP = ({
  date,
  day,
  month,
  year,
  title,
  route,
  content,
  ...entry
}: Entry) => {
  return (
    <>
      <div className="flex justify-between items-center pb-4 px-4">
        <Link href={route} aria-label={`Permanent link to ${title}`}>
          <h2 className="font-heading text-xl text-gray-700 mr-4">{title}</h2>
        </Link>
        <DateTime date={date} day={day} month={month} year={year} />
      </div>

      <div className="flex flex-col items-center space-y-4">
        <MDX source={content} scope={{ entry, componentOptions }} />
      </div>
    </>
  );
};

export const PostPhotoDetail = ({
  date,
  day,
  month,
  year,
  title,
  route,
  dateLong,
  content,
  ...entry
}: Entry) => {
  return (
    <>
      <article>
        <MDX source={content} scope={{ entry, componentOptions }} />
        <div className="flex flex-row py-4 px-4">
          <DateTime date={date} day={day} month={month} year={year} />{' '}
          <h1>{title}</h1>
        </div>
      </article>
    </>
  );
};
