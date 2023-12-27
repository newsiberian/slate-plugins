import { useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  useSlate,
  RenderElementProps,
} from 'slate-react';
import {
  insertLink,
  isLinkActive,
  withLinkify,
  getLinkUrl,
  LinkifyOptions,
} from '@mercuriya/slate-linkify';
import type { EditableProps } from 'slate-react/dist/components/editable';

type LinkifyProps = {
  readOnly: boolean;
  options: LinkifyOptions;
};

const initialState: Descendant[] = [
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
];

const ToolbarComponent = () => {
  const editor = useSlate();
  const isActive = isLinkActive(editor);

  function onAddEditLink(event) {
    event.preventDefault();

    const oldUrl = isActive ? getLinkUrl(editor) : undefined;
    const url = window.prompt(isActive ? 'Edit link' : 'Create a link', oldUrl);

    if (url) {
      insertLink(editor, url);
    }
  }

  return (
    <div className="gallery-toolbar">
      <button onMouseDown={onAddEditLink}>
        {isActive ? 'Edit link' : 'Add link'}
      </button>
    </div>
  );
};

export function Linkify({ readOnly = false, options }: LinkifyProps) {
  const editor = useMemo(
    () => withLinkify(withReact(createEditor()), options),
    [],
  );

  const renderElement = useCallback<
    Pick<EditableProps, 'renderElement'>['renderElement']
  >((props) => <Element {...props} />, []);

  return (
    <Slate editor={editor} initialValue={initialState}>
      <ToolbarComponent />
      <Editable renderElement={renderElement} readOnly={readOnly} />
    </Slate>
  );
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();

  if ('type' in element && element.type === 'link') {
    return editor.linkElementType({ attributes, children, element });
  }

  return <p {...attributes}>{children}</p>;
};
