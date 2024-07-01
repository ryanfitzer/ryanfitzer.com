'use client';
import {
  CSSProperties,
  DetailedReactHTMLElement,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '~/tailwind.config';

export type ColumnsProps = {
  children: ReactElement[];
};

const twConfig = resolveConfig(tailwindConfig);

const getWrapperStyles = (minImagAspectRatio: number) => {
  const hasPortraitImage = minImagAspectRatio < 1;
  const viewport = hasPortraitImage ? 'md' : 'lg';

  return {
    '--aspect-ratio-gallery-max': minImagAspectRatio * 2,
    '--width-gallery-max':
      'max(var(--width-site), calc(95vh * var(--aspect-ratio-gallery-max)))',
    '--width-gallery-half': 'calc(var(--width-gallery-max) * 0.5)',
    '--width-gallery-quarter': 'calc(var(--width-gallery-max) * 0.25)',
    '--width-site-gallery-diff-half':
      'calc((var(--width-gallery-half) - var(--width-site)) / 2)',
    '--width-gallery': 'min(100vw, var(--width-gallery-max))',
    '--left-gallery':
      'max(calc(-50vw + 50%), calc(var(--width-gallery-quarter) * -1) - var(--width-site-gallery-diff-half))',
    insetInlineStart: 'var(--left-gallery)',
    width: 'var(--width-gallery)',
    columns: `2 calc(${twConfig.theme.screens[viewport]} / 2)`,
    columnGap: twConfig.theme.spacing['2.5'],
  };
};

const parseCaption = (
  caption: string
): { title: string; description: string } => {
  const [title, description] = caption.split(' | ');
  return { title, description };
};

export const Columns = ({ children }: ColumnsProps) => {
  const imageAspectRatios = children.map((child) => {
    return child.props.width / child.props.height;
  });

  const minImagAspectRatio = Math.min(...imageAspectRatios);

  return (
    <div
      className="relative mb-10 sm:px-0 md:px-4"
      style={{
        ...(getWrapperStyles(minImagAspectRatio) as CSSProperties),
      }}
    >
      {children.map((child: ReactNode, index: number) => {
        if (!isValidElement(child)) return;
        const { title, description } = parseCaption(child.props.alt);
        return (
          <figure
            tabIndex={0}
            className="group relative my-4 md:my-0 md:mb-2.5"
            key={child.props.src}
          >
            {cloneElement(
              child as DetailedReactHTMLElement<any, HTMLImageElement>,
              {
                className: 'select-none w-full',
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
