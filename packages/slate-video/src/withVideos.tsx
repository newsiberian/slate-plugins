import type { ComponentProps, ReactElement } from 'react';
import { Element, BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { ReactPlayerProps } from 'react-player/lazy';

import { Video, VIDEO, VideoElementProps } from './Video';

export type VideoOptions = ReactPlayerProps & {
  renderInput?: (props: ComponentProps<'input'>) => ReactElement;
};

export const withVideos = <Editor extends BaseEditor & ReactEditor>(
  editor: Editor,
  options: VideoOptions = {},
) => {
  const { isVoid: isVoidOrigin } = editor;

  const isVoid: typeof editor.isVoid = (element) =>
    Element.isElementType(element, VIDEO) || isVoidOrigin(element);

  const videoElementType = (props: VideoElementProps) => (
    <Video {...props} {...options} />
  );

  return Object.assign(editor, { isVoid, videoElementType });
};
