import React, { useEffect, useState } from 'react';
import Slate from 'slate';

import { GalleryOptions } from '../types';
import Grid from './Grid';

interface GalleryProps extends GalleryOptions {
  attributes: object;
  editor: Slate.Editor;
  node: Slate.Block;
  readOnly: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string | React.ReactNode;
  /**
   * Placeholder that appears on image drop
   */
  droppingPlaceholder?: string | React.ReactNode;
}

const ReadOnlyGallery: React.FunctionComponent<GalleryProps> = ({
  attributes,
  editor,
  node,
  size = 9,
  placeholder,
  droppingPlaceholder,
  readOnly,
  dropzoneProps,
  renderControls,
  renderEditModal,
  renderImage,
  renderExtra,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
  gridClassName,
}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!images.length) {
      const data = node.get('data');
      if (data.has('images')) {
        const savedImages = data.get('images');

        if (Array.isArray(savedImages)) {
          setImages(savedImages);
        }
      }
    }
  });

  return (
    <div {...attributes}>
      <Grid
        images={images}
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
  );
};

export default ReadOnlyGallery;
