'use client';
import {
  ReactNode,
  cloneElement,
  isValidElement,
  DetailedReactHTMLElement,
} from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '~/tailwind.config';

const twConfig = resolveConfig(tailwindConfig);

const parseCaption = (caption: string) => {
  const [title, description] = caption.split(' | ');
  return { title, description };
};

const getMasonryColumns = () => {
  const { sm, md }: Record<string, string> = twConfig.theme.screens;

  const convertToPx = (value: string) => {
    return parseInt(value) * 16;
  };

  return {
    [convertToPx(sm)]: 1,
    [convertToPx(md)]: 2,
  };
};

const Gallery = ({ children }: { children: ReactNode[] }) => {
  if (!children.length) {
    throw new Error('At least 1 child is required');
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={getMasonryColumns()}>
      <Masonry
        className="relative w-gallery left-gallery px-2.5"
        columnsCount={2}
        gutter={twConfig.theme.spacing['2.5']}
      >
        {children.map((child: ReactNode, index: number) => {
          if (!isValidElement(child)) return;

          const { title, description } = parseCaption(child.props.alt);

          return (
            <figure
              tabIndex={0}
              className="group relative py-4 md:py-0"
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
      </Masonry>
    </ResponsiveMasonry>
  );
};

export { Gallery };
