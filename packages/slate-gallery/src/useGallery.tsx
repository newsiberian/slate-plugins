import { Element, Editor } from 'slate';
import { useReadOnly } from 'slate-react';
import { ReadOnlyGallery } from '@mercuriya/slate-gallery-read-only';
import {
  GalleryEditor,
  ReadOnlyGalleryElement,
  GalleryElement,
  GALLERY,
} from '@mercuriya/slate-gallery-common';

import { Gallery } from './Gallery';
import type { GalleryOptions } from './types';

const getGalleryElementKind = (
  galleryElement: GalleryElement | ReadOnlyGalleryElement,
  readOnly: boolean,
): galleryElement is ReadOnlyGalleryElement => readOnly;

export const useGallery = (
  editor: Editor,
  options = {} as GalleryOptions,
): Editor => {
  const typedEditor = editor as GalleryEditor;
  const readOnly = useReadOnly();
  const { isVoid } = typedEditor;

  typedEditor.isVoid = (element) => {
    return Element.isElementType(element, GALLERY) || isVoid(element);
  };

  typedEditor.galleryElementType = ({ children, element, ...props }) => {
    if (readOnly && getGalleryElementKind(element, readOnly)) {
      return (
        <ReadOnlyGallery element={element} {...props} {...options}>
          {children}
        </ReadOnlyGallery>
      );
    }
    return (
      <Gallery editor={typedEditor} element={element} {...props} {...options}>
        {children}
      </Gallery>
    );
  };

  return typedEditor;
};
