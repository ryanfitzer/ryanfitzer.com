'use client';
import {
  CSSProperties,
  DetailedReactHTMLElement,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';
import { twClsx } from '~/src/library/tw-clsx';

export type ColumnsProps = {
  children: ReactElement[];
  shadows?: boolean;
};

type ChildProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const getWrapperStyles = (minImagAspectRatio: number) => {
  const hasPortraitImage = minImagAspectRatio < 1;
  const viewport = hasPortraitImage ? 'md' : 'lg';

  return {
    '--aspect-ratio-gallery-max': minImagAspectRatio * 2,
    '--width-gallery-max':
      'max(var(--max-width-site), calc(95vh * var(--aspect-ratio-gallery-max)))',
    '--width-gallery-half': 'calc(var(--width-gallery-max) * 0.5)',
    '--width-gallery-quarter': 'calc(var(--width-gallery-max) * 0.25)',
    '--max-width-site-gallery-diff-half':
      'calc((var(--width-gallery-half) - var(--max-width-site)) / 2)',
    '--width-gallery': 'min(100vw, var(--width-gallery-max))',
    '--left-gallery':
      'max(calc(-50vw + 50%), calc(var(--width-gallery-quarter) * -1) - var(--max-width-site-gallery-diff-half))',
    insetInlineStart: 'var(--left-gallery)',
    width: 'var(--width-gallery)',
    columns: `2 calc(var(--breakpoint-${viewport}) / 2)`,
    columnGap: `calc(var(--spacing) * 2.5)`,
  };
};

const parseCaption = (
  caption: string
): { title: string; description: string } => {
  const [title, description] = caption.split(' | ');
  return { title, description };
};

export const Columns = ({ children, shadows = false }: ColumnsProps) => {
  const imageAspectRatios = children.map((child: ReactElement) => {
    const props = child.props as ChildProps;
    return props.width / props.height;
  });

  const minImagAspectRatio = Math.min(...imageAspectRatios);

  return (
    <div
      className="gallery self-start relative mt-8 md:mt-16 mb-10 sm:px-0 md:px-4"
      style={{
        ...(getWrapperStyles(minImagAspectRatio) as CSSProperties),
      }}
    >
      {children.map((child: ReactElement, index: number) => {
        if (!isValidElement(child)) return;
        const props = child.props as ChildProps;
        const { title, description } = parseCaption(props.alt);
        return (
          <figure
            tabIndex={0}
            className="group relative my-4 md:my-0 md:mb-2.5"
            key={props.src}
          >
            {cloneElement(
              child as DetailedReactHTMLElement<any, HTMLImageElement>,
              {
                className: twClsx('select-none w-full', {
                  'shadow-[0_0_6px_0_#dfdfdf]': shadows,
                }),
              }
            )}
            <figcaption className="md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100 md:group-active:opacity-100 md:transition-opacity md:ease-in md:duration-300 w-full md:absolute md:bottom-0 p-4 md:bg-white/50">
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs">{description}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
};
