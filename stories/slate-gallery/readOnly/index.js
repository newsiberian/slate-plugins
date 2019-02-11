import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import { galleryPlugin } from '../../../packages/slate-gallery/lib';

const plugins = [galleryPlugin()];

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
      {
        object: 'block',
        type: 'gallery',
        data: {
          images: [
            { src: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2018/space.jpg' },
            { src: 'https://images4.alphacoders.com/924/924646.jpg' },
          ]
        },
      },
    ],
  },
});

export default function Gallery() {
  return (
    <section>
      <Editor
        value={initialValue}
        plugins={plugins}
        readOnly
      />
    </section>
  );
}
