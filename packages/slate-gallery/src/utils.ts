// import { Block, Data } from 'slate';
// import { Editor , getEventRange, getEventTransfer } from 'slate-react';

export const handleChange = (editor, next) => {
  // const { value } = editor;
  // const { document } = value;
  // const isGallery = value.blocks.some(block => {
  //   return block.type === 'gallery';
  //   // const a = document.getFurthestAncestor(block.key);
  //   // return !!document.getClosest(block.key, parent => {
  //   //   return parent.type === 'gallery';
  //   // });
  // });

  // if (isGallery) {
  //   // insert/remove image blocks to gallery after image sources was
  //   // merged/removed to gallery data
  //
  // }

  // value.blocks.forEach(block => {
  //   if (block.type === 'gallery') {
  //     // when added new source
  //     insertImage(editor, block);
  //   }
  // });

  return next();
};

// export const insertImage = (editor, /*src,*/ node) => {
//   const data = node.get('data');
//   const images = data.get('images');
//
//   if (!Array.isArray(images)) {
//     return;
//   }
//
//   // TODO: if data.images is empty but node has children, we must remove them
//
//   images.forEach(src => {
//     const block = Block.create({
//       type: 'galleryImage',
//       data: { src },
//     });
//
//     editor.insertNodeByKey(node.key, 0, block);
//   });
// };

/**
 * set additional data to current block
 * @param {Editor} editor
 * @param {object} payload - additional data
 * @return {Editor}
 */
// export const changeData = (editor, payload) => {
//   const { value } = editor;
//
//   if (value.blocks) {
//     value.blocks.forEach(block => {
//       const prev = block.get('data');
//       // mergeDeep required to merge internal collections
//       const modifiedData = prev.mergeDeep(Data.create(payload));
//       const modifiedBlock = block.set('data', modifiedData);
//       editor.setBlocks(modifiedBlock);
//     });
//   }
//
//   return editor;
// };
