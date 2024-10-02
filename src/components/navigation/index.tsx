'use client';
import Link from 'next/link';
import Image from 'next/image';
import { twClsx } from '~/src/library/tw-clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useCallback, useEffect, useRef, RefObject } from 'react';
import npm from '~/public/images/npm.svg';
import github from '~/public/images/github.svg';

const wrapperStyles = (active: string) => {
  return twClsx('flex box-content items-center mt-8 mb-20 text-zinc-500', {
    'justify-center': active === 'home',
    'justify-between w-[calc(100%-2rem)] max-w-[--max-width-column] mx-auto px-4':
      active !== 'home',
  });
};

const currentLinkStyles = (current: boolean) => {
  return twClsx({
    'font-bold': current,
  });
};

const Name = ({ page }: { page: string }) => {
  return (
    <div
      className={twClsx('font-heading font-bold text-[1.45rem]', {
        'bg-clip-text text-transparent bg-gradient-to-r to-yellow-600 from-red-600':
          page !== 'portfolio',
      })}
    >
      <Link href="/">ryanfitzer</Link>
    </div>
  );
};

const PageNav = (props: {
  page: string;
  className: string;
  id?: string;
  popover?: '' | 'auto' | 'manual' | undefined;
  elementRef?: RefObject<HTMLDivElement> | null;
}) => {
  const { page, elementRef, ...rest } = props;
  const finalProps = elementRef ? { ...rest, ref: elementRef } : rest;

  return (
    <div {...finalProps}>
      <div className="flex flex-nowrap mt-[0.0625rem] space-x-4">
        <div className="min-w-[7rem] flex justify-between">
          <Link className={currentLinkStyles(page === 'blog')} href="/blog">
            blog
          </Link>
          {/* <Link className={currentLinkStyles(page === 'photos')} href="/photos">
            photos
          </Link> */}
          <Link
            className={currentLinkStyles(page === 'portfolio')}
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
    </div>
  );
};

const ResponsiveNav = ({ page }: { page: string }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const closeHandler = useCallback(
    (e: MouseEvent | FocusEvent) => {
      const popover = popoverRef.current;

      if (!popover) return;

      if (e.type === 'click' && popover.contains(e.target as Node)) {
        return popover.hidePopover();
      }

      if (e.type === 'focusout' && !popover.contains(e.relatedTarget as Node)) {
        return popover.hidePopover();
      }
    },
    [popoverRef]
  );

  useEffect(() => {
    const popover = popoverRef.current;

    if (!popover) return;

    popover.addEventListener('focusout', closeHandler);
    popover.addEventListener('click', closeHandler);

    return () => {
      popover.removeEventListener('focusout', closeHandler);
      popover.removeEventListener('click', closeHandler);
    };
  }, [popoverRef]);

  return (
    <div className={wrapperStyles(page)}>
      <Name page={page} />
      <PageNav
        page={page}
        className="sm:hidden md:block flex mt-[0.0625rem] space-x-4"
      />
      <div className="md:hidden flex mt-[0.0625rem]">
        <button
          // @ts-expect-error popovertarget is not a valid attribute
          popovertarget="menu"
          popovertargetaction="toggle"
          className=""
        >
          menu
        </button>
        <PageNav
          id="menu"
          popover="auto"
          page={page}
          elementRef={popoverRef}
          className="[&:popover-open]:bg-transparent [&:popover-open]:absolute [&:popover-open]:right-4 [&:popover-open]:top-[4.375rem] [&:popover-open]:inset-[unset]"
        />
      </div>
    </div>
  );
};

export default function Navigation() {
  const page = useSelectedLayoutSegment() || 'home';

  if (page === 'home') {
    return (
      <div className={wrapperStyles(page)}>
        <PageNav
          page={page}
          className="flex justify-end mt-[0.0625rem] space-x-4"
        />
      </div>
    );
  }

  return <ResponsiveNav page={page} />;
}
