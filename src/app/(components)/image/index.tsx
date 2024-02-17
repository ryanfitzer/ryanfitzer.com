import { join } from 'path';
import { clsx } from 'clsx';
import { default as NextImage } from 'next/image';
import imageMeta from '~/content/image-meta.json';

export const Image = ({
  src,
  alt,
  categories,
  ...entry
}: { src: string; alt: string } & Entry) => {
  const contentPath = join(
    entry.contentDir,
    src.split('.').slice(0, -1).join('.')
  );

  const classNames = clsx({
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
      height={height}
      src={secure_url}
      className={classNames}
    />
  );
};
