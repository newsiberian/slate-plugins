import React, { useState } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

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

export default function Gallery() {
  const [value, setValue] = useState(initialValue);

  function onChange({ value }) {
    setValue(value);
  }

  return (
    <div>
      <Editor value={value} onChange={onChange} />
    </div>
  );
}
