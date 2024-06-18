import { assert } from 'console';
import { ReactElement } from 'react';
import { Masonry } from './masonry';

type GalleryProps = {
  children: ReactElement[];
  variant: 'masonry' | 'slider';
};

export const Gallery = ({ children, variant }: GalleryProps) => {
  assert(children && children.length, 'At least 1 child is required');

  if (variant === 'masonry') return <Masonry>{children}</Masonry>;

  return null;
};
