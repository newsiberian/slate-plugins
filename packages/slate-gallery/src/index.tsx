import React from 'react';

import Gallery from './Gallery';
import { GalleryOptions } from './types';
import { handleChange } from './utils';

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
