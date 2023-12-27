import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {
  withReadOnlyGallery,
  GALLERY,
} from '@mercuriya/slate-gallery-read-only';

export default function Gallery(props) {
  const { images, ...rest } = props;
  const editor = useMemo(
    () => withReadOnlyGallery(withReact(createEditor()), rest),
    [],
  );
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
    {
      type: GALLERY,
      images,
      descriptions: {},
      children: [{ text: '' }],
    },
  ]);
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
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(value) => setValue(value)}
    >
      <Editable readOnly renderElement={renderElement} />
    </Slate>
  );
}
