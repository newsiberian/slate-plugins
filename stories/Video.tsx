import { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, useSlateStatic } from 'slate-react';

import { withVideos } from '@mercuriya/slate-video';

const Element = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  switch (element.type) {
    case 'video':
      return editor.videoElementType({ attributes, children, element });
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export function Video({ readOnly = false, ...props }) {
  const editor = useMemo(
    () =>
      withVideos(withReact(createEditor()), {
        width: '100%',
        height: 400,
        ...props,
      }),
    [],
  );
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [
        {
          text: 'Video plugin usage example',
        },
      ],
    },
    {
      type: 'video',
      url: 'https://vimeo.com/90509568',
      children: [{ text: '' }],
    },
  ]);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(value) => setValue(value)}
    >
      <Editable renderElement={renderElement} readOnly={readOnly} />
    </Slate>
  );
}
