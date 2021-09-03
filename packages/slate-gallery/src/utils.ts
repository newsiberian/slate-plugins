import * as React from 'react';
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

const buildGridContainer = (
  columns: number,
  rows: number,
): React.CSSProperties => ({
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, auto)`,
  gridAutoRows: '1fr',
});

const buildGridItem = (
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
) => ({
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
});

const buildGrid = (size: number) => {
  switch (size) {
    case 1:
    default:
      return buildGridContainer(1, 1);
    case 2:
      return buildGridContainer(2, 1);
    case 3:
      return buildGridContainer(2, 3);
    case 4:
    case 6:
      return buildGridContainer(3, 3);
    case 5:
      return buildGridContainer(3, 6);
    case 7:
      return buildGridContainer(3, 4);
    case 8:
      return buildGridContainer(6, 3);
    case 9:
      return buildGridContainer(4, 3);
  }
};

const getPositionOne = (index: number) => {
  switch (index) {
    case 0:
      return buildGridItem(1, 2, 1, 2);
    default:
      return {};
  }
};

const getPositionTwo = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(2, 3, 1, 2);
    case 0:
      return buildGridItem(1, 2, 1, 2);
    default:
      return {};
  }
};

const getPositionThree = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 3, 4);
    case 2:
      return buildGridItem(2, 3, 3, 4);
    case 0:
      return buildGridItem(1, 3, 1, 3);
    default:
      return {};
  }
};

const getPositionFour = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 3, 4);
    case 2:
      return buildGridItem(2, 3, 3, 4);
    case 3:
      return buildGridItem(3, 4, 3, 4);
    case 0:
      return buildGridItem(1, 4, 1, 3);
    default:
      return {};
  }
};

const getPositionFive = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 3, 4, 7);
    case 2:
      return buildGridItem(3, 4, 1, 3);
    case 3:
      return buildGridItem(3, 4, 3, 5);
    case 4:
      return buildGridItem(3, 4, 5, 7);
    case 0:
      return buildGridItem(1, 3, 1, 4);
    default:
      return {};
  }
};

const getPositionSix = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(3, 4, 1, 2);
    case 2:
      return buildGridItem(3, 4, 2, 3);
    case 3:
      return buildGridItem(1, 2, 3, 4);
    case 4:
      return buildGridItem(2, 3, 3, 4);
    case 5:
      return buildGridItem(3, 4, 3, 4);
    case 0:
      return buildGridItem(1, 3, 1, 3);
    default:
      return {};
  }
};

const getPositionSeven = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 1, 2);
    case 2:
      return buildGridItem(2, 3, 1, 2);
    case 3:
      return buildGridItem(3, 4, 1, 2);
    case 4:
      return buildGridItem(1, 2, 4, 5);
    case 5:
      return buildGridItem(2, 3, 4, 5);
    case 6:
      return buildGridItem(3, 4, 4, 5);
    case 0:
      return buildGridItem(1, 4, 2, 4);
    default:
      return {};
  }
};

const getPositionEight = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 1, 2);
    case 2:
      return buildGridItem(1, 2, 2, 3);
    case 3:
      return buildGridItem(1, 3, 3, 4);
    case 4:
      return buildGridItem(3, 5, 3, 4);
    case 5:
      return buildGridItem(6, 7, 1, 2);
    case 6:
      return buildGridItem(6, 7, 2, 3);
    case 7:
      return buildGridItem(5, 7, 3, 4);
    case 0:
      return buildGridItem(2, 6, 1, 3);
    default:
      return {};
  }
};

const getPositionNine = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 1, 2);
    case 2:
      return buildGridItem(1, 2, 2, 3);
    case 3:
      return buildGridItem(1, 2, 3, 4);
    case 4:
      return buildGridItem(2, 3, 3, 4);
    case 5:
      return buildGridItem(3, 4, 3, 4);
    case 6:
      return buildGridItem(4, 5, 1, 2);
    case 7:
      return buildGridItem(4, 5, 2, 3);
    case 8:
      return buildGridItem(4, 5, 3, 4);
    case 0:
      return buildGridItem(2, 4, 1, 3);
    default:
      return {};
  }
};

export const getItemStyle = (index: number, size: number) => {
  switch (size) {
    case 1:
    default:
      return getPositionOne(index);
    case 2:
      return getPositionTwo(index);
    case 3:
      return getPositionThree(index);
    case 4:
      return getPositionFour(index);
    case 5:
      return getPositionFive(index);
    case 6:
      return getPositionSix(index);
    case 7:
      return getPositionSeven(index);
    case 8:
      return getPositionEight(index);
    case 9:
      return getPositionNine(index);
  }
};

export const container = (size) =>
  ({
    display: 'grid',
    ...buildGrid(size),
    gridGap: 2.5, // 0 4px??
    marginTop: 16,
  } as React.CSSProperties);
