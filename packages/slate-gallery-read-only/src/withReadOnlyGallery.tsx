import { Element, BaseEditor } from 'slate';
import { ReactEditor, type RenderElementProps } from 'slate-react';
import {
  GALLERY,
  ReadOnlyGalleryElement,
} from '@mercuriya/slate-gallery-common';

import { ReadOnlyGallery, GalleryReadOnlyOptions } from './ReadOnlyGallery';

export const withReadOnlyGallery = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  options = {} as GalleryReadOnlyOptions,
) => {
  const { isVoid: isVoidOrigin } = editor;

  const isVoid: typeof editor.isVoid = (element) => {
    return Element.isElementType(element, GALLERY) || isVoidOrigin(element);
  };

  const galleryElementType = ({
    children,
    element,
    ...props
  }: Omit<RenderElementProps, 'element'> & {
    element: ReadOnlyGalleryElement;
  }) => {
    return (
      <ReadOnlyGallery element={element} {...props} {...options}>
        {children}
      </ReadOnlyGallery>
    );
  };

  return Object.assign(editor, { isVoid, galleryElementType });
};
