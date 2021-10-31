import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Editor } from 'slate';
import { Slate, Editable, withReact, useEditor, useSlate } from 'slate-react';

import { Button, Toolbar } from '../../components';
import {
  insertLink,
  isLinkActive,
  onKeyDown as linkifyOnKeyDown,
  withLinkify,
} from '@mercuriya/slate-linkify';

const getUrl = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
  return link[0].url;
};

const ToolbarComponent = () => {
  const editor = useSlate();
  const isActive = isLinkActive(editor);

  function onAddEditLink(event) {
    event.preventDefault();

    const oldUrl = isActive ? getUrl(editor) : undefined;
    const url = window.prompt(isActive ? 'Edit link' : 'Create a link', oldUrl);

    if (url) {
      insertLink(editor, url);
    }
  }

  return (
    <Toolbar>
      <Button onMouseDown={onAddEditLink}>
        {isActive ? 'Edit link' : 'Add link'}
      </Button>
    </Toolbar>
  );
};

export default function LinkifyDefault({ readOnly = false }) {
  const editor = useMemo(() => withLinkify(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      children: [
        {
          text: 'In addition to block nodes, you can create inline nodes, like ',
        },
        {
          type: 'link',
          url: 'https://en.wikipedia.org/wiki/Hypertext',
          children: [{ text: 'hyperlinks' }],
        },
        {
          text: '!',
        },
      ],
    },
    {
      children: [
        {
          text: 'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
        },
      ],
    },
  ]);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const onKeyDown = useCallback(function handleKeyDown(event) {
    linkifyOnKeyDown(event, editor);
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <ToolbarComponent />
      <Editable
        renderElement={renderElement}
        readOnly={readOnly}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
}

const Element = ({ attributes, children, element }) => {
  const editor = useEditor();
  switch (element.type) {
    case 'link':
      return editor.linkElementType({ attributes, children, element });
    default:
      return <p {...attributes}>{children}</p>;
  }
};
