import { useCallback } from 'react';
import { BaseEditor, Transforms } from 'slate';
import {
  ReactEditor,
  useReadOnly,
  useSlateStatic,
  RenderElementProps,
} from 'slate-react';
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy';

import type {
  ChangeEvent,
  ComponentProps,
  LegacyRef,
  ReactElement,
} from 'react';
import type { BaseElement } from 'slate';

export const VIDEO = 'video' as const;

export type VideoElement = BaseElement & {
  type: typeof VIDEO;
  /**
   * Video url
   */
  url: string;
};

export type VideoEditor = BaseEditor &
  ReactEditor & {
    videoElementType: ({
      attributes,
      children,
      element,
    }: Omit<RenderElementProps, 'element'> & {
      element: VideoElement;
    }) => ReactElement;
  };

type VideoElementProps = ReactPlayerProps & {
  attributes: Omit<RenderElementProps['attributes'], 'ref'> & {
    ref: LegacyRef<ReactPlayer>;
  };
  element: VideoElement;
  renderInput?: (props: ComponentProps<'input'>) => ReactElement;
};

const DefaultRenderInput = (props) => <input {...props} />;

export function Video({
  attributes,
  element,
  renderInput = DefaultRenderInput,
  ...playerProps
}: VideoElementProps) {
  const editor = useSlateStatic() as VideoEditor;
  const readOnly = useReadOnly();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<VideoElement> = {
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
