import React from 'react';
import { Editor } from 'slate';

import Gallery from './Gallery';
import ReadOnlyGallery from './readOnly/Gallery';
import { GalleryOptions } from './types';
import { GALLERY, insertGallery, isGalleryActive } from './utils';

const withGallery = (editor: Editor, options = {} as GalleryOptions) => {
  const { isVoid } = editor;

  editor.isVoid = element => {
    return element.type === GALLERY ? true : isVoid(element);
  };

  editor.galleryElementType = props => {
    if (props.readOnly) {
      return <ReadOnlyGallery editor={editor} {...props} {...options} />;
    }
    return <Gallery editor={editor} {...props} {...options} />;
  };

  return editor;
};

export { Gallery, insertGallery, isGalleryActive, withGallery };
