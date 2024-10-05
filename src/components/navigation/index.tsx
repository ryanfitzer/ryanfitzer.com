'use client';
import Link from 'next/link';
import { twClsx } from '~/src/library/tw-clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useCallback, useEffect, useRef, RefObject } from 'react';

const wrapperStyles = (active: string) => {
  return twClsx('flex box-content items-center', {
    'justify-center my-4': active === 'home',
    'justify-between w-[calc(100%-2rem)] max-w-[--max-width-column] text-zinc-500 mt-8 mb-20  mx-auto px-4':
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
  const pseudoStyles = 'hover:text-black';

  return (
    <div {...finalProps}>
      <div className="flex flex-nowrap items-center mt-[0.0625rem] space-x-4 select-none">
        <div className="min-w-[7rem] flex justify-between">
          <Link
            className={twClsx(currentLinkStyles(page === 'blog'), pseudoStyles)}
            href="/blog"
          >
            blog
          </Link>
          <Link
            className={twClsx(
              currentLinkStyles(page === 'portfolio'),
              pseudoStyles
            )}
            href="/portfolio"
          >
            portfolio
          </Link>
        </div>
        <span>•</span>
        <div className="space-x-4 before:content-['•'] text-[0]">
          <a
            className={pseudoStyles}
            aria-label="GitHub"
            href="https://github.com/ryanfitzer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
              />
            </svg>
          </a>
          <a
            className={pseudoStyles}
            aria-label="NPM"
            href="https://www.npmjs.com/~ryanfitzer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M24 0H0v24h24V0ZM2.578 2.578H21.42V21.42h-4.75V7.33h-4.752v14.09h-9.34V2.578Z"
                clipRule="evenodd"
              />
            </svg>
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
  }, [popoverRef, closeHandler]);

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
