import type { ReactNode } from 'react';
import type { Element } from 'slate';
import { MouseEvent } from 'react';

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

export type GalleryElement = Element & {
  descriptions: Record<string, string>;
};
