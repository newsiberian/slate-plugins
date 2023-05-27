import { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { withGallery } from '@mercuriya/slate-gallery';
import { GALLERY } from '@mercuriya/slate-gallery';

export default function Gallery(props) {
  const { images, ...rest } = props;
  const editor = useMemo(
    () => withGallery(withReact(createEditor()), rest),
    [],
  );
  const [value, setValue] = useState([
    {
      type: 'paragraph',
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
          // ❗️ we use this prop internally, so you must provide it here
          readOnly: true,
        });
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable readOnly renderElement={renderElement} />
    </Slate>
  );
}
