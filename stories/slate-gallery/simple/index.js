import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';

import {
  insertGallery,
  isGalleryActive,
  withGallery,
} from '../../../packages/slate-gallery/lib';
import { Button, Toolbar } from '../../components';

/**
 * Define the default node type.
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph';

const ToolbarComponent = ({ setSize }) => {
  const editor = useSlate();
  const isActive = isGalleryActive(editor);

  /**
   * Check if the any of the currently selected blocks are of `type`.
   * @param {String} type
   * @return {Boolean}
   */
  const hasBlock = (type) => {
    return editor.value.blocks.some((node) => node.type === type);
  };

  function onAddGallery(event) {
    event.preventDefault();
    insertGallery(editor);
  }

  return (
    <Toolbar>
      <Button onMouseDown={onAddGallery}>Add gallery</Button>
      <label htmlFor="size">Size:</label>
      <select
        defaultValue={9}
        name="size"
        id="size"
        onChange={(e) => setSize(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((op) => {
          return (
            <option value={op} key={op}>
              {op}
            </option>
          );
        })}
      </select>
    </Toolbar>
  );
};

export default function Gallery(props) {
  const [value, setValue] = useState([
    {
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ]);
  const [size, setSize] = useState(9);
  const editor = useMemo(
    () => withGallery(withReact(createEditor()), { ...props, size }),
    [],
  );
  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'gallery':
        return editor.galleryElementType({
          attributes,
          children,
          element,
          // ❗️ we use this prop internally, so you must provide it here
          readOnly: false,
        });
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <ToolbarComponent setSize={setSize} />
      <Editable renderElement={renderElement} />
    </Slate>
  );
}
