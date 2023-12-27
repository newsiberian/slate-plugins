import type { MouseEvent, ReactElement, ReactNode } from 'react';
import type { BaseEditor, BaseElement } from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';

export type GalleryEditor<Editor extends BaseEditor & ReactEditor> = Editor & {
  galleryElementType: ({
    attributes,
    children,
    element,
  }: Omit<RenderElementProps, 'element'> & {
    element: GalleryElement | ReadOnlyGalleryElement;
  }) => ReactElement;
};

export type ImageParams = {
  /**
   * A link to image location
   */
  src: string;
  /**
   * Image description
   */
  description?: string;
};

export type RenderImageProps = {
  image: ImageParams;
  index: number;
  onLoad?: () => void;
  /**
   * This is optional function which is available within readOnly: true mode.
   * It will send selected image index to an renderExtra function. It is handy
   * for building lightbox components
   * @param {number} index
   */
  onSelect?: (index: number, event: MouseEvent<HTMLImageElement>) => void;
  /**
   * Slate readOnly state
   * Could be handy when you need to use different logic for those two states
   */
  readOnly: boolean;
};

export type RenderImageFn = (props: RenderImageProps) => ReactNode;

export type ExtendedFile = File & {
  src: string;
  description?: string;
};

export type GalleryElement = BaseElement & {
  type: 'gallery';
  descriptions: Record<string, string>;
  images: Array<ExtendedFile | ImageParams>;
};

export type ReadOnlyGalleryElement = Omit<GalleryElement, 'images'> & {
  images: ImageParams[];
};
