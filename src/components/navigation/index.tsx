import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import npm from '~/public/images/npm.svg';
import github from '~/public/images/github.svg';

const styleActivePage = (active: string) => {
  return clsx('flex items-center pt-8 pb-16 mb-10 px-4 text-zinc-700', {
    'justify-center': active === 'home',
    'justify-between': active !== 'home',
  });
};

const styleActiveLink = (current: boolean) => {
  return clsx({
    'font-bold': current,
  });
};

export default function Navigation({ active }: { active: string }) {
  return (
    <nav className={styleActivePage(active)}>
      <div className="justify-start font-heading font-bold text-lg">
        <Link className={clsx({ hidden: active === 'home' })} href="/">
          Ryan Fitzer
        </Link>
      </div>
      <ul className="flex justify-end mb-0.5 space-x-4">
        <li className={styleActiveLink(active === 'blog')}>
          <Link href="/blog">blog</Link>
        </li>
        <li className={styleActiveLink(active === 'portfolio')}>
          <Link href="/portfolio">portfolio</Link>
        </li>
        <li className="">&bull;</li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ryanfitzer"
            aria-label="GitHub"
          >
            <Image className="inline" alt="Github" src={github} />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.npmjs.com/~ryanfitzer"
            aria-label="NPM"
          >
            <Image className="inline" alt="NPM" src={npm} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
