import { BaseEditor, Element } from 'slate';
import { useReadOnly, ReactEditor, type RenderElementProps } from 'slate-react';
import { ReadOnlyGallery } from '@mercuriya/slate-gallery-read-only';
import {
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

export const useGallery = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  options = {} as GalleryOptions,
): Editor => {
  const readOnly = useReadOnly();
  const { isVoid: isVoidOrigin } = editor;

  const isVoid: typeof editor.isVoid = (element) => {
    return Element.isElementType(element, GALLERY) || isVoidOrigin(element);
  };

  const galleryElementType = ({
    children,
    element,
    ...props
  }: Omit<RenderElementProps, 'element'> & {
    element: GalleryElement | ReadOnlyGalleryElement;
  }) => {
    if (readOnly && getGalleryElementKind(element, readOnly)) {
      return (
        <ReadOnlyGallery element={element} {...props} {...options}>
          {children}
        </ReadOnlyGallery>
      );
    }
    return (
      <Gallery editor={editor} element={element} {...props} {...options}>
        {children}
      </Gallery>
    );
  };

  return Object.assign(editor, { isVoid, galleryElementType });
};
