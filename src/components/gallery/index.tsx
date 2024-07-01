import { assert } from 'console';
import { ReactElement } from 'react';
import { Columns } from './columns';

type GalleryProps = {
  children: ReactElement[];
  variant: 'columns' | 'slider';
};

export const Gallery = ({ children, variant }: GalleryProps) => {
  assert(children && children.length, 'At least 1 child is required');

  if (variant === 'columns') return <Columns>{children}</Columns>;

  return null;
};
