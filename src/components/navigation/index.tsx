'use client';
import { forwardRef, useCallback, useEffect, useRef, RefObject } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useViewports, UseVPState } from '~/src/hooks/use-viewports';
import npm from '~/public/images/npm.svg';
import github from '~/public/images/github.svg';

const wrapperStyles = (active: string) => {
  return clsx('flex items-center pt-8 mb-10 px-4 text-zinc-700', {
    'justify-center': active === 'home',
    'justify-between': active !== 'home',
  });
};

const currentLinkStyles = (current: boolean) => {
  return clsx({
    'font-bold': current,
  });
};

const Name = ({ page }: { page: string }) => (
  <div className="justify-start font-heading font-bold text-xl">
    <Link className={clsx({ hidden: page === 'home' })} href="/">
      Ryan Fitzer
    </Link>
  </div>
);

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

const ResponsiveNav = ({ page, vps }: { page: string; vps: UseVPState }) => {
  const smallNav = vps.current('sm');
  const popoverRef = useRef<HTMLDivElement>(null);

  const clickCloseHandler = useCallback(() => {
    popoverRef.current?.hidePopover();
  }, [smallNav, popoverRef]);

  const focusCloseHandler = useCallback(
    (e: FocusEvent) => {
      if (popoverRef.current?.contains(e.relatedTarget as Node)) return;

      clickCloseHandler();
    },
    [smallNav, popoverRef]
  );

  useEffect(() => {
    if (!popoverRef.current) return;

    const popover = popoverRef.current;

    popover.addEventListener('focusout', focusCloseHandler);
    document.addEventListener('click', clickCloseHandler);

    return () => {
      popover?.removeEventListener('focusout', focusCloseHandler);
      document.removeEventListener('click', clickCloseHandler);
    };
  }, [smallNav, popoverRef]);

  if (smallNav) {
    return (
      <div className={clsx('relative', wrapperStyles(page))}>
        <Name page={page} />
        <button
          // @ts-expect-error
          popovertarget="menu"
          className={clsx('justify-end', {
            hidden: !vps.current('sm') || page === 'home',
          })}
        >
          menu
        </button>
        <PageNav
          id="menu"
          popover="auto"
          page={page}
          elementRef={popoverRef}
          className="[&:popover-open]:bg-transparent [&:popover-open]:absolute [&:popover-open]:right-4 [&:popover-open]:top-[60px] [&:popover-open]:inset-[unset]"
        />
      </div>
    );
  }

  return (
    <div className={wrapperStyles(page)}>
      <Name page={page} />
      <PageNav
        page={page}
        className="flex justify-end mt-[0.0625rem] space-x-4"
      />
    </div>
  );
};

export default function Navigation() {
  const vps = useViewports([{ name: 'sm', query: '(max-width: 31.25rem)' }]);
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

  if (vps) return <ResponsiveNav page={page} vps={vps} />;

  return (
    <div className={wrapperStyles(page)}>
      <Name page={page} />
      <PageNav
        page={page}
        className="flex justify-end mt-[0.0625rem] space-x-4"
      />
    </div>
  );
}
