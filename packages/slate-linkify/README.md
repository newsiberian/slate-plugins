# slate-linkify
Plugin transforms typed or pasted hyperlinks into an anchor tags.

## Installation

```bash
yarn add @mercuriya/slate-linkify
```

```bash
npm install @mercuriya/slate-linkify --save
```

## Configuration

In your file with `Slate` component:

```js
import React from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { onKeyDown as linkifyOnKeyDown, withLinkify } from '@mercuriya/slate-linkify';
import Link from '@material-ui/core/Link';

export default function EditorComponent(props) {
  const [value, setValue] = useState([ /* some initial state here */ ]);
  const editor = useMemo(
    () =>
      withLinkify(withReact(createEditor()), {
        // slate-linkify options
        renderComponent: props => <Link {...props} />,
      }),
    [],
  );
  const renderElement = useCallback(props => <Element {...props} />, []);
  const onKeyDown = useCallback(function handleKeyDown(event) {
    linkifyOnKeyDown(event, editor);
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={renderElement} onKeyDown={onKeyDown} />
    </Slate>
  );
}

const Element = ({ attributes, children, element }) => {
  const editor = useSlate();
  switch (element.type) {
    case 'link':
      // ❗️ this part is required
      return editor.linkElementType({ attributes, children, element });
    default:
      return <p {...attributes}>{children}</p>;
  }
};

```

## Description

This plugin inspired by amazing `draft-js-linkify-plugin` and slate plugins examples.
It allows user to create links while typing or pasting without any additional
manipulations.

It has issues, like: it doesn't know if remote site should use https
or not. For example in cases like: `typing...typing... google.com continue typing...`.
It is also ignores `html` pastes, because, in my opinion, they should be handled by
other plugins, as official `paste-html` example does.

Please, see stories for more usage examples.

### Options
|Name|Type|Description|
|---|---|---|
|**target**? (default: `_blank`)|string|An anchor `target` property|
|**rel**? (default: `noreferrer noopener`)|string|An anchor `rel` property|
|**className**?|string|An anchor custom class name|
|**renderComponent**?|args => React.ReactNode|A render function that allows you to use custom link component with props you need|
