import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
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

export default function VideoDefault({ readOnly = false, ...props }) {
  const editor = useMemo(
    () =>
      withVideos(withReact(createEditor()), {
        width: '100%',
        height: 400,
        ...props,
      }),
    [],
  );
  const [value, setValue] = useState([
    {
      children: [
        {
          text: 'Video plugin usage example',
        },
      ],
    },
    {
      type: 'video',
      url: 'https://player.vimeo.com/video/26689853',
      children: [{ text: '' }],
    },
  ]);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable renderElement={renderElement} readOnly={readOnly} />
    </Slate>
  );
}
