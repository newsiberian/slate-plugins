import React from 'react';
import { DropzoneProps } from 'react-dropzone';

import Gallery from './Gallery';
import { handleChange } from './utils';

interface GalleryOptions {
  dropzoneProps?: DropzoneProps;
  controlsComponent?: (args) => React.ReactNode;
  imageClassName?: string;
  imageWrapperClassName?: string;
  leftClassName?: string;
}

const galleryPlugin = (options: GalleryOptions = {}) => ({
  onChange(editor, next) {
    return handleChange(editor, next);
  },

  renderNode(props, editor, next) {
    switch (props.node.type) {
      case 'gallery':
        return <Gallery editor={editor} {...props} {...options} />;
      default:
        return next();
    }
  },

  schema: {
    blocks: {
      gallery: {
        isVoid: true,
      },
    },
  },
});

export { Gallery, galleryPlugin };
