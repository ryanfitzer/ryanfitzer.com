import { join } from 'path';
import { clsx } from 'clsx';
import { default as NextImage } from 'next/image';
import imageMeta from '~/content/image-meta.json';

export type ImageProps = Entry & {
  src: string;
  alt?: string;
  className?: string;
};

export type FigureProps = ImageProps & {
  caption?: string;
  className?: string;
  classNameImg?: string;
};

export const Image = ({
  src,
  categories,
  alt = '',
  className = '',
  ...entry
}: ImageProps) => {
  const contentPath = join(
    entry.contentDir,
    src.split('.').slice(0, -1).join('.')
  );

  const classNames = clsx(className, {
    'post-photo': categories?.includes('photo'),
  });

  const { width, height, secure_url } = imageMeta[
    contentPath as keyof typeof imageMeta
  ] as ImageMeta;

  return (
    <NextImage
      priority
      alt={alt}
      width={width}
      quality={100}
      height={height}
      src={secure_url}
      className={classNames}
    />
  );
};

export const Figure = (props: FigureProps) => {
  const { caption, className, classNameImg, ...imgProps } = props;
  return (
    <figure className={className}>
      <Image {...imgProps} className={classNameImg} />
      <figcaption className="text-xs pt-2">
        {caption?.split(' | ').map((line) => (
          <p key={line}>{line}</p>
        ))}
      </figcaption>
    </figure>
  );
};
