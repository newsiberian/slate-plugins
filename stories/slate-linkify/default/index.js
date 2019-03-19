import React, { useState } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import { linkifyPlugin } from '../../../packages/slate-linkify/lib';

const plugins = [linkifyPlugin()];

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


export default function LinkifyDefault({ readOnly = false }) {
  const [value, setValue] = useState(initialValue);

  function onChange(editor) {
    setValue(editor.value);
  }

  return (
    <section>
      <Editor
        value={value}
        onChange={onChange}
        plugins={plugins}
        readOnly={readOnly}
      />
    </section>
  );
}
