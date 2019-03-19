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
import { Editor } from 'slate-react';
import { linkifyPlugin } from '@mercuriya/slate-linkify';

const initialValue = Value.fromJSON({ ... });
const plugins = [linkifyPlugin({ ...options })];

export default function EditorComponent(props) {
  const [value, setValue] = useState(initialValue);

  return (
    <section>
      <Editor
        value={value}       
        plugins={plugins}      
      />
    </section>
  );
}
```

## Description

This plugin inspired by amazing `draft-js-linkify-plugin`. It allows user to create
links right on typing or pasting without any additional manipulations. It has an issues,
like: it doesn't know if remote site should use https or not in case of something.
For example in cases like: `typing...typing... google.com continue typing...`.

### Options
|Name|Type|Description|
|---|---|---|
|**wrapCommand**? (default: `wrapLink`)|string|A name of command that will wrap text into a link|
|**target**? (default: `_blank`)|string|An anchor `target` property|
|**rel**? (default: `noreferrer noopener`)|string|An anchor `rel` property|
|**className**?|string|An anchor custom class name|
|**renderComponent**?|args => React.ReactNode|A render function that allows you to use custom link component with props you need|
