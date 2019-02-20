import React, { useMemo, useState } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import { galleryPlugin } from '../../../packages/slate-gallery/lib';
import { Button, Toolbar } from '../../components';

/**
 * Define the default node type.
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

/**
 * Render the editor
 * @param setSize
 * @param props
 * @param editor
 * @param next
 * @return {*}
 */
const renderEditor = setSize => (props, editor, next) => {
  const children = next();

  /**
   * Check if the any of the currently selected blocks are of `type`.
   * @param {String} type
   * @return {Boolean}
   */
  const hasBlock = (type) => {
    return editor.value.blocks.some(node => node.type === type);
  };

  function onAddGallery(event) {
    event.preventDefault();

    const type = 'gallery';
    const isActive = hasBlock(type);
    editor.setBlocks(isActive ? DEFAULT_NODE : type);
  }

  return (
    <>
      <Toolbar>
        <Button onMouseDown={onAddGallery}>
          Add gallery
        </Button>
        <label htmlFor="size">Size:</label>
        <select defaultValue={9} name="size" id="size" onChange={e => setSize(e.target.value)}>
          {[1,2,3,4,5,6,7,8,9].map(op => {
            return <option value={op} key={op}>{op}</option>;
          })}
        </select>
      </Toolbar>

      {children}
    </>
  );
};

export default function Gallery(props) {
  const [value, setValue] = useState(initialValue);
  const [size, setSize] = useState(9);

  const plugins = useMemo(() => [galleryPlugin({ ...props, size })], []);

  function onChange(editor) {
    setValue(editor.value);
  }

  return (
    <section>
      <Editor
        value={value}
        onChange={onChange}
        plugins={plugins}
        renderEditor={renderEditor(setSize)}
      />
    </section>
  );
}
