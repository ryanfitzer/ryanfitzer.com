import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Image, ImageProps } from '@/components/image';

export type FigureProps = ImageProps & {
  /** Image size, used with `inline-*` variants */
  size: keyof typeof sizes;
  /** Figure style */
  variant: keyof typeof variants;
  /** Caption to use. Using ` / ` splits the string into multiple lines */
  caption?: string;
  /** Children to nest in `<figcaption/>` element */
  children?: ReactNode[];
  /** The classes to apply to `<figure/>` element  */
  className?: string;
  /** The classes to apply to `<img/>` element  */
  classNameImg?: string;
  /** The classes to apply to `<figcaption/>` element  */
  classNameFigcaption?: string;
  /** Separate the image label from the caption */
  label?: string;
};

const variants = {
  default: {
    figure: 'w-fit mx-auto mb-12',
    image: '',
    figcaption: 'mt-4',
  },
  'inline-left': {
    figure: 'md:float-start p-4 md:pt-0',
    image: 'rounded-lg',
    figcaption: 'mt-2',
  },
  'inline-right': {
    figure: 'md:float-end p-4 md:pt-0',
    image: 'rounded-lg',
    figcaption: 'mt-2',
  },
};

const sizes = {
  default: {
    figure: '',
    image: '',
    figcaption: 'text-sm',
  },
  sm: {
    figure: 'md:w-[25%]',
    image: '',
    figcaption: 'text-xs',
  },
  md: {
    figure: 'md:w-[40%]',
    image: '',
    figcaption: 'text-sm',
  },
  lg: {
    figure: 'md:w-[60%]',
    image: '',
    figcaption: 'text-sm',
  },
};

const parseStyleOptions = (
  size: FigureProps['size'],
  variant: FigureProps['variant']
) => {
  return {
    figure: [variants[variant].figure, sizes[size].figure],
    image: [variants[variant].image, sizes[size].image],
    figcaption: [variants[variant].figcaption, sizes[size].figcaption],
  };
};

const parseCaption = (caption?: string, label?: string) => {
  if (caption || label) {
    return (
      <>
        {label && <p className="font-bold">{label}</p>}
        {caption &&
          caption.split(' / ').map((line) => <p key={line}>{line}</p>)}
      </>
    );
  }
};

export const Figure = (props: FigureProps) => {
  const {
    caption,
    children,
    className,
    classNameImg,
    classNameFigcaption,
    label,
    size = 'default',
    variant = 'default',
    ...imgProps
  } = props;

  const styles = parseStyleOptions(size, variant);

  return (
    <figure className={clsx(styles.figure, className)}>
      <Image {...imgProps} className={clsx(styles.image, classNameImg)} />
      {children && (
        <figcaption className={clsx(styles.figcaption, classNameFigcaption)}>
          {children}
        </figcaption>
      )}
      {(caption || label) && (
        <figcaption className={clsx(styles.figcaption, classNameFigcaption)}>
          {parseCaption(caption, label)}
        </figcaption>
      )}
    </figure>
  );
};
