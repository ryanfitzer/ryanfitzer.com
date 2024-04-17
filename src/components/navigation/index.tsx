import clsx from 'clsx';
import Link from 'next/link';

export default function Navigation({ active }: { active: string }) {
  console.log('active', active);

  return (
    <nav className="flex items-end justify-between pb-3 border-b-2 mb-10 px-4">
      <div className="justify-start font-heading text-lg lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#d99f6c] via-[#f79d55] to-[#d7a30d]">
        <Link href="/">RyanFitzer</Link>
      </div>
      <ul className="flex justify-end mb-0.5 space-x-4 text-gray-600 text-sm">
        <li className={clsx({ 'font-bold': active === 'blog' })}>
          <Link href="/blog">blog</Link>
        </li>
        <li className={clsx({ 'font-bold': active === 'portfolio' })}>
          <Link href="/portfolio">portfolio</Link>
        </li>
        <li className={clsx({ 'font-bold': active === 'about' })}>
          <Link href="/about">about</Link>
        </li>
      </ul>
    </nav>
  );
}
