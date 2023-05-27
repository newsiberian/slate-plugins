import { Element } from 'slate';

import type { ReactEditor } from 'slate-react';
import type { ComponentProps, ReactElement } from 'react';
import type { ReactPlayerProps } from 'react-player/lazy';

import { VideoElement } from './VideoElement';

type ReactEditorExtended = ReactEditor & {
  videoElementType: ({ attributes, children, element }) => ReactElement;
};

type VideoOptions = ReactPlayerProps & {
  renderInput?: (props: ComponentProps<'input'>) => JSX.Element;
};

const VIDEO = 'video';

export const withVideos = (
  editor: ReactEditorExtended,
  options: VideoOptions = {},
) => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    Element.isElementType(element, VIDEO) || isVoid(element);

  editor.videoElementType = (props) => <VideoElement {...props} {...options} />;

  return editor;
};
