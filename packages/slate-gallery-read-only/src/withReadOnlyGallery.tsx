import { Element, Editor } from 'slate';
import { GALLERY, GalleryEditor } from '@mercuriya/slate-gallery-common';

import { ReadOnlyGallery, GalleryReadOnlyOptions } from './ReadOnlyGallery';

export const withReadOnlyGallery = (
  editor: Editor,
  options = {} as GalleryReadOnlyOptions,
): Editor => {
  const typedEditor = editor as GalleryEditor;
  const { isVoid } = typedEditor;

  typedEditor.isVoid = (element) => {
    return Element.isElementType(element, GALLERY) || isVoid(element);
  };

  typedEditor.galleryElementType = ({ children, element, ...props }) => {
    return (
      <ReadOnlyGallery element={element} {...props} {...options}>
        {children}
      </ReadOnlyGallery>
    );
  };

  return editor;
};
