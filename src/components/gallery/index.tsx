import { assert } from 'console';
import { ReactElement } from 'react';
import { Columns } from './columns';

type GalleryProps = {
  children: ReactElement[];
  shadows?: boolean;
  variant: 'columns' | 'slider';
};

export const Gallery = ({
  children,
  variant,
  shadows = false,
}: GalleryProps) => {
  assert(children && children.length, 'At least 1 child is required');

  if (variant === 'columns')
    return <Columns shadows={shadows}>{children}</Columns>;

  return null;
};
