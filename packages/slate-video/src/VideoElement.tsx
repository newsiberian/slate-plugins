import { ReactElement, useCallback } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy';

import type { ChangeEvent, ComponentProps, RefObject } from 'react';
import type { Element } from 'slate';

type Attributes = {
  'data-slate-node': 'element';
  'data-slate-void': boolean;
  'data-slate-inline'?: boolean;
  contentEditable?: boolean;
  dir?: 'rtl';
  ref: RefObject<ReactPlayer>;
};

type VideoElementType = Element & {
  /**
   * Video url
   */
  url: string;
};

type VideoElementProps = ReactPlayerProps & {
  attributes: Attributes;
  element: VideoElementType;
  renderInput?: (props: ComponentProps<'input'>) => ReactElement;
};

const DefaultRenderInput = (props) => <input {...props} />;

export function VideoElement({
  attributes,
  element,
  renderInput = DefaultRenderInput,
  ...playerProps
}: VideoElementProps) {
  const editor = useSlateStatic();
  const readOnly = useReadOnly();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    const newProperties: Partial<VideoElementType> = {
      url: event.target.value,
    };
    Transforms.setNodes(editor, newProperties, { at: path });
  }, []);

  return (
    <div contentEditable={false}>
      <ReactPlayer url={element.url} {...attributes} {...playerProps} />

      {readOnly || renderInput({ value: element.url, onChange: handleChange })}
    </div>
  );
}
