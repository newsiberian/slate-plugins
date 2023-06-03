import { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import {
  insertGallery,
  // isGalleryActive,
  useGallery,
} from '@mercuriya/slate-gallery';

const ToolbarComponent = ({ setSize }) => {
  const editor = useSlate();
  // const isActive = isGalleryActive(editor);
  //
  // /**
  //  * Check if there are any of the currently selected blocks are of `type`.
  //  */
  // const hasBlock = (type) => {
  //   return editor.value.blocks.some((node) => node.type === type);
  // };

  function onAddGallery(event) {
    event.preventDefault();
    insertGallery(editor);
  }

  return (
    <div className="gallery-toolbar">
      <button onMouseDown={onAddGallery}>Add gallery</button>
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
    </div>
  );
};

export default function Gallery(props) {
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ]);
  const [size, setSize] = useState(9);
  const [baseEditor] = useState(() => withReact(createEditor()));
  const editor = useGallery(baseEditor, { ...props, size });

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'gallery':
        return editor.galleryElementType({
          attributes,
          children,
          element,
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
