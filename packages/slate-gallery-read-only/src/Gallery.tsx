import type { ReactNode, HTMLAttributes } from 'react';
import type {
  GalleryElement,
  ImageParams,
} from '@mercuriya/slate-gallery-common';

import { Grid, GridProps } from './Grid';

export type GalleryReadOnlyOptions = Omit<GridProps, 'size'> &
  Partial<Pick<GridProps, 'size'>>;

export type GalleryProps = GalleryReadOnlyOptions & {
  attributes: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  element: ReadOnlyGalleryElement;
};

type ReadOnlyGalleryElement = GalleryElement & {
  images: ImageParams[];
};

export const ReadOnlyGallery = ({
  attributes,
  children,
  element,
  size = 9,
  renderImage,
  renderExtra,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
  gridClassName,
}: GalleryProps) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <Grid
          images={element.images}
          size={size}
          renderImage={renderImage}
          renderExtra={renderExtra}
          imageClassName={imageClassName}
          imageWrapperClassName={imageWrapperClassName}
          leftClassName={leftClassName}
          gridClassName={gridClassName}
        />
      </div>

      {children}
    </div>
  );
};
