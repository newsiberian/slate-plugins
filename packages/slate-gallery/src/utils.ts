import { Editor, Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import type { Node } from 'slate';

import type { GalleryElement, ReactEditorExtended } from './types';

export const GALLERY = 'gallery';

export const isGalleryActive = (editor: Editor): boolean => {
  const [gallery] = Editor.nodes(editor, {
    match: (n) => Element.isElementType(n, GALLERY),
  });
  return !!gallery;
};

export const insertGallery = (editor: Editor): void => {
  Transforms.insertNodes(
    editor,
    {
      type: GALLERY,
      images: [],
      descriptions: {},
      children: [{ text: '' }],
    } as Node,
    { voids: true },
  );
  // we additionally insert new line to prevent case when we can't type text after
  // the gallery, when we insert it at the bottom
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  } as Node);
};

/**
 * Set additional data to current block
 * @param {Editor} editor
 * @param {Element} element
 * @param {object} payload - additional data
 * @return {Editor}
 */
export const changeNodeData = (
  editor: ReactEditorExtended,
  element: Element,
  payload: Partial<GalleryElement>,
): void => {
  Transforms.setNodes(editor, payload, {
    at: ReactEditor.findPath(editor, element),
  });
};
