'use client';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useViewports, UseVPState } from '~/src/hooks/use-viewports';
import npm from '~/public/images/npm.svg';
import github from '~/public/images/github.svg';

const styleActivePage = (active: string) => {
  return clsx('flex items-center pt-8 mb-10 px-4 text-zinc-700', {
    'justify-center': active === 'home',
    'justify-between': active !== 'home',
  });
};

const styleActiveLink = (current: boolean) => {
  return clsx({
    'font-bold': current,
  });
};

const Nav = ({ page, vps }: { page: string; vps?: UseVPState }) => {
  if (vps) {
    return (
      <nav className={styleActivePage(page)}>
        <div className="justify-start font-heading font-bold text-xl">
          <Link className={clsx({ hidden: page === 'home' })} href="/">
            Ryan Fitzer
          </Link>
        </div>
        <button
          className={clsx('justify-end', {
            hidden: !vps.current('sm') || page === 'home',
          })}
        >
          menu
        </button>
        <div
          className={clsx('flex justify-end mt-[0.0625rem] space-x-4', {
            hidden: vps.current('sm') && page !== 'home',
          })}
        >
          <div className="min-w-[7rem] flex justify-between">
            <Link className={styleActiveLink(page === 'blog')} href="/blog">
              blog
            </Link>
            <Link
              className={styleActiveLink(page === 'portfolio')}
              href="/portfolio"
            >
              portfolio
            </Link>
          </div>
          <div className="space-x-4 before:mr-4 before:content-['•']">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/ryanfitzer"
              aria-label="GitHub"
            >
              <Image className="inline" alt="Github" src={github} />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.npmjs.com/~ryanfitzer"
              aria-label="NPM"
            >
              <Image className="inline" alt="NPM" src={npm} />
            </a>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styleActivePage(page)}>
      <div className="justify-start font-heading font-bold text-xl">
        <Link className={clsx({ hidden: page === 'home' })} href="/">
          Ryan Fitzer
        </Link>
      </div>
    </nav>
  );
};

export default function Navigation() {
  const vps = useViewports();
  const page = useSelectedLayoutSegment() || 'home';

  if (!vps) return <Nav page={page} />;

  return <Nav page={page} vps={vps} />;
}
