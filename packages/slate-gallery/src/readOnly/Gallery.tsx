import type { ReactNode } from 'react';

import { ReadOnlyGalleryElement, GalleryOptions } from '../types';
import Grid from './Grid';

interface GalleryProps extends GalleryOptions {
  attributes: Record<string, unknown>;
  children: ReactNode;
  element: ReadOnlyGalleryElement;
  readOnly: boolean;
}

const ReadOnlyGallery = ({
  attributes,
  children,
  element,
  size = 9,
  readOnly,
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
          readOnly={readOnly}
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

export default ReadOnlyGallery;
