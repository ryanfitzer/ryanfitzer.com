import { join } from 'path';
import { clsx } from 'clsx';
import { default as NextImage } from 'next/image';
import imageMeta from '~/content/image-meta.json';

export type ImageProps = Entry & {
  /** Image `src` attribute */
  src: string;
  /** The `alt` attribute to apply to `<img/>` element  */
  alt?: string;
  /** The classes to apply to `<img/>` element  */
  className?: string;
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
      className={className}
    />
  );
};
