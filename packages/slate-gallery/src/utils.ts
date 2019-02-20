import React from 'react';
import { Block, BlockProperties, Data } from 'slate';

/**
 * Extract data from block
 * @param {Block} block
 * @param {string} key
 * @return {any}
 */
export const extractData = (block: Block, key: string): any => {
  const data = block.get('data');
  return data.get(key);
};

export const handleChange = (editor, next) => {
  return next();
};

/**
 * Set additional data to current block
 * @param {Editor} editor
 * @param {Node} node
 * @param {object} payload - additional data
 * @return {Editor}
 */
export const changeNodeData = (editor, node, payload) => {
  const prev = node.get('data');
  const modifiedData = prev.mergeDeep(Data.create(payload));
  editor.setNodeByKey(node.key, { data: modifiedData } as BlockProperties);

  return editor;
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

export const container = size =>
  ({
    display: 'grid',
    ...buildGrid(size),
    gridGap: 2.5, // 0 4px??
    marginTop: 16,
  } as React.CSSProperties);
