import React, { useState } from 'react';
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
 * @param props
 * @param editor
 * @param next
 * @return {*}
 */
const renderEditor = (props, editor, next) => {
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
      </Toolbar>

      {children}
    </>
  );
};

export default function Gallery(props) {
  const [value, setValue] = useState(initialValue);

  const plugins = [galleryPlugin(props)];

  function onChange(editor) {
    setValue(editor.value);
  }

  return (
    <section>
      <Editor
        value={value}
        onChange={onChange}
        plugins={plugins}
        renderEditor={renderEditor}
      />
    </section>
  );
}
