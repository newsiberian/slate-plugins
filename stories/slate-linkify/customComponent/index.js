import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import Link from '@material-ui/core/Link';

import { withLinkify } from '@mercuriya/slate-linkify';

export default function LinkifyCustomComponent({ readOnly = false }) {
  const editor = useMemo(
    () =>
      withLinkify(withReact(createEditor()), {
        renderComponent: (props) => <Link {...props} />,
      }),
    [],
  );
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

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable renderElement={renderElement} readOnly={readOnly} />
    </Slate>
  );
}

const Element = ({ attributes, children, element }) => {
  const editor = useSlate();
  switch (element.type) {
    case 'link':
      return editor.linkElementType({ attributes, children, element });
    default:
      return <p {...attributes}>{children}</p>;
  }
};
