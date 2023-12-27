import { BaseEditor, Editor, Element, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { GalleryElement, GALLERY } from '@mercuriya/slate-gallery-common';

export const isGalleryActive = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
): boolean => {
  const [gallery] = Editor.nodes(editor, {
    match: (n) => Element.isElementType(n, GALLERY),
  });
  return !!gallery;
};

export const insertGallery = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
): void => {
  const node: GalleryElement = {
    type: GALLERY,
    images: [],
    descriptions: {},
    children: [{ text: '' }],
  };

  Transforms.insertNodes(editor, node, { voids: true });
  // we additionally insert new line to prevent case when we can't type text after
  // the gallery, when we insert it at the bottom
  Transforms.insertNodes(editor, {
    children: [{ text: '' }],
  });
};

/**
 * Set additional data to current block
 *
 * @param {Editor} editor
 * @param {GalleryElement} element
 * @param {object} payload - additional data
 */
export const changeNodeData = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  element: GalleryElement,
  payload: Partial<GalleryElement>,
) => {
  Transforms.setNodes(editor, payload, {
    at: ReactEditor.findPath(editor, element),
  });
};
