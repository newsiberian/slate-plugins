import {
  GalleryEditor,
  GalleryElement,
  ReadOnlyGalleryElement,
} from '@mercuriya/slate-gallery-common';
import type { LinkifyEditor, LinkifyElement } from '@mercuriya/slate-linkify';
import type { BaseElement, BaseText } from 'slate';
import type { VideoEditor, VideoElement } from '@mercuriya/slate-video';

declare module 'slate' {
  interface CustomTypes {
    Editor: LinkifyEditor & GalleryEditor & VideoEditor;
    Element:
      | LinkifyElement
      | GalleryElement
      | ReadOnlyGalleryElement
      | VideoElement
      | BaseElement;
    Text: LinkifyElement | BaseText;
  }
}
