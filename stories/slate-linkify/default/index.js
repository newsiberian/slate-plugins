import React, { useState } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import { Button, Toolbar } from '../../components';
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

const getUrl = (editor) => {
  const link = editor.value.inlines.filter(inline => inline.type === 'link').first();
  return link.data.get('url');
};

const renderEditor = (props, editor, next) => {
  const children = next();

  /**
   * Check if the any of the currently selected inlines are of `type`.
   * @param {String} type
   * @return {Boolean}
   */
  const hasInline = (type) => {
    return editor.value.inlines.some(node => node.type === type);
  };

  function onAddEditLink(event) {
    event.preventDefault();

    const type = 'link';
    const isActive = hasInline(type);
    const oldUrl = isActive ? getUrl(editor) : undefined;
    const url = window.prompt(isActive ? 'Edit link' : 'Create a link', oldUrl)
    editor.command('wrapLink', url);
  }

  return (
    <>
      <Toolbar>
        <Button onMouseDown={onAddEditLink}>
          Add/Edit link
        </Button>
      </Toolbar>

      {children}
    </>
  );
};

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
        renderEditor={renderEditor}
      />
    </section>
  );
}
