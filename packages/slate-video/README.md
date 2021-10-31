# slate-linkify

The plugin allows you to place embedded videos to your document

## Installation

```bash
yarn add @mercuriya/slate-video
```

```bash
npm install @mercuriya/slate-video --save
```

## Configuration

The plugin uses [`ReactPlayer`](https://github.com/cookpete/react-player) package under the hood,
so all `ReactPlayer`'s props can be forwarded.

```js
import React from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, useSlateStatic, withReact } from 'slate-react';
import { onKeyDown as linkifyOnKeyDown, withLinkify } from '@mercuriya/slate-linkify';
import Link from '@material-ui/core/Link';

export default function EditorComponent(props) {
  const [value, setValue] = useState([ /* some initial state here */ ]);
  const editor = useMemo(
    () =>
      withVideos(withReact(createEditor()), {
        // ...ReactPlayer and other props
      }),
    [],
  );

  const renderElement = useCallback(props => <Element {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={renderElement} />
    </Slate>
  );
}

const Element = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  switch (element.type) {
    case 'video':
      // ❗️ this part is required
      return editor.videoElementType({ attributes, children, element });
    default:
      return <p {...attributes}>{children}</p>;
  }
};

```

## Description

This plugin inspired by amazing [https://www.slatejs.org/examples/embeds](https://www.slatejs.org/examples/embeds) slate official
example.

### Additional options

|Name|Type|Description|
|---|---|---|
|**renderInput**?|(props: ComponentProps<'input'>) => JSX.Element|A render function that allows you to use a custom input component|
