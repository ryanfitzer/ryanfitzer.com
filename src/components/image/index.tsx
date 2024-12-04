import { join } from 'path';
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

export const getImageMeta = (src: string, contentDir: string) => {
  const contentPath = join(contentDir, src.split('.').slice(0, -1).join('.'));

  return imageMeta[contentPath as keyof typeof imageMeta];
};

export const Image = ({
  src,
  categories,
  alt = '',
  className = '',
  ...entry
}: ImageProps) => {
  const { width, height, secure_url } = getImageMeta(src, entry.contentDir);

  return (
    <NextImage
      priority
      alt={alt || ''}
      width={width}
      quality={100}
      height={height}
      src={secure_url}
      className={`my-4 ${className}`}
    />
  );
};
