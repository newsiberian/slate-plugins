import * as React from 'react';
import { Element } from 'slate';

import Gallery from './Gallery';
import ReadOnlyGallery from './readOnly/Gallery';
import { ReactEditorExtended, GalleryOptions } from './types';
import { GALLERY, insertGallery, isGalleryActive } from './utils';

const withGallery = (
  editor: ReactEditorExtended,
  options = {} as GalleryOptions,
): ReactEditorExtended => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return Element.isElementType(element, GALLERY) || isVoid(element);
  };

  editor.galleryElementType = ({ children, ...props }) => {
    if (props.readOnly) {
      return (
        <ReadOnlyGallery {...props} {...options}>
          {children}
        </ReadOnlyGallery>
      );
    }
    return (
      <Gallery editor={editor} {...props} {...options}>
        {children}
      </Gallery>
    );
  };

  return editor;
};

export { Gallery, insertGallery, isGalleryActive, withGallery };
