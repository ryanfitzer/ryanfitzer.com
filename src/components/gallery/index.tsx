'use client';
import {
  ReactNode,
  cloneElement,
  isValidElement,
  DetailedReactHTMLElement,
} from 'react';
import Masonry from 'react-responsive-masonry';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '~/tailwind.config';

const twConfig = resolveConfig(tailwindConfig);

const parseCaption = (caption: string) => {
  const [title, description] = caption.split(' | ');
  return { title, description };
};

const Gallery = ({
  type,
  children,
}: {
  type: string;
  children: ReactNode[];
}) => {
  if (!type) {
    throw new Error('The prop `type` is required');
  }

  if (!children.length) {
    throw new Error('At least 1 child is required');
  }

  return (
    <Masonry
      className="relative w-gallery left-gallery px-2.5"
      columnsCount={2}
      gutter={twConfig.theme.spacing['2.5']}
    >
      {children.map((child: ReactNode, index: number) => {
        if (!isValidElement(child)) return;

        const { title, description } = parseCaption(child.props.alt);

        return (
          <figure tabIndex={0} className="group relative" key={child.props.src}>
            {cloneElement(
              child as DetailedReactHTMLElement<any, HTMLImageElement>,
              {
                className: 'w-full',
              }
            )}
            <figcaption className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity ease-in duration-300 w-full absolute bottom-0 p-4 bg-white/50">
              <p className="text-sm font-bold">{title}</p>
              <p className="text-xs">{description}</p>
            </figcaption>
          </figure>
        );
      })}
    </Masonry>
  );

  // return (
  //   <div className="flex flex-col flex-wrap gap-3 max-h-[5500px]">
  //     {children.map((child: ReactNode) => {
  //       if (!isValidElement(child)) return;

  //       return (
  //         <div className="w-1/2" key={child.props.src}>
  //           {cloneElement(
  //             child as DetailedReactHTMLElement<any, HTMLImageElement>,
  //             {
  //               alt: '',
  //               className: 'w-full',
  //             }
  //           )}
  //           <p>{child.props.alt}</p>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export { Gallery };
