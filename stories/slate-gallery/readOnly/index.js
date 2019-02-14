import React from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import { galleryPlugin } from '../../../packages/slate-gallery/lib';

export default function Gallery({ images, imageComponent }) {
  // I know, this is bad practise, but we need to reuse this component in many
  // stories, so we initiate plugins here
  const plugins = [galleryPlugin({
    imageComponent
  })];

  return (
    <section>
      <Editor
        value={Value.fromJSON({
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
                  images,
                },
              },
            ],
          },
        })}
        plugins={plugins}
        readOnly
      />
    </section>
  );
}
