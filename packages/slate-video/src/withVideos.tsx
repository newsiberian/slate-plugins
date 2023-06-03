import { Element, Editor } from 'slate';

import type { ComponentProps, ReactElement } from 'react';
import type { ReactPlayerProps } from 'react-player/lazy';

import { Video, VIDEO, VideoEditor } from './Video';

export type VideoOptions = ReactPlayerProps & {
  renderInput?: (props: ComponentProps<'input'>) => ReactElement;
};

export const withVideos = (
  editor: Editor,
  options: VideoOptions = {},
): Editor => {
  const typedEditor = editor as VideoEditor;
  const { isVoid } = typedEditor;

  typedEditor.isVoid = (element) =>
    Element.isElementType(element, VIDEO) || isVoid(element);

  typedEditor.videoElementType = (props) => <Video {...props} {...options} />;

  return typedEditor;
};
