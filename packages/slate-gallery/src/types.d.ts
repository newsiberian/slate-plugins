import * as React from 'react';
import type { DropzoneProps } from 'react-dropzone';
import type { SortableContainerProps } from 'react-sortable-hoc';
import type { ReactEditor } from 'slate-react';
import type { Element } from 'slate';

export interface ReactEditorExtended extends ReactEditor {
  galleryElementType: ({
    attributes,
    children,
    element,
    readOnly,
  }) => React.ReactElement;
}

export interface RenderControlsArgs {
  /**
   * An index of selected image
   */
  index: number;
  /**
   * A function that will open modal or prompt
   * @param {React.MouseEvent<HTMLButtonElement>} e
   * @param {number} index
   */
  onOpenEditModal: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

export interface RenderEditModalArgs {
  index: number;
  onEdit: (index: number, text: string) => void;
  /**
   * Must be called to close modal
   */
  onClose: () => void;
  /**
   * Image description
   */
  description?: string;
}

export interface RenderExtraArgs {
  images: Image[];
  /**
   * Selected image index
   */
  index?: number;
}

export interface RenderImageArgs {
  image: TypeImage;
  index: number;
  /**
   * This function is required. It is uses internally
   */
  onLoad: () => void;
  /**
   * This is optional function which is available within readOnly: true mode.
   * It will send selected image index to an renderExtra function. It is handy
   * for building lightbox components
   * @param {number} index
   */
  onSelect?: (index: number) => void;
  /**
   * Slate readOnly state
   * Could be handy when you need to use different logic for those two states
   */
  readOnly: boolean;
}

export interface GalleryOptions {
  /**
   * Grid size - number of images that will be visible for "readOnly: false" mode
   * The remaining images will be hidden, but user will have an ability to find them
   * by opening full screen slider
   *
   * min value: 1
   * max value: 9
   * default: 9
   */
  size?: number;
  /**
   * Props which goes to react-dropzone
   */
  dropzoneProps?: DropzoneProps;
  /**
   * React-sortable-hoc container props
   */
  sortableContainerProps?: SortableContainerProps;
  /**
   * Custom controls component. It is uses only for "readOnly: true" mode
   * Handlers must be added to each child-button accordingly
   * @param {RenderControlsArgs} args
   * @return {React.ReactNode}
   *
   * Example:
   * <div style={root}>
   *   <button onClick={e => onOpenEditModal(e, index)} title="Edit image description">
   *     Edit
   *   </button>
   *   <button onClick={e => onRemove(e, index)} title="Remove image">
   *     Remove
   *   </button>
   * </div>
   */
  renderControls?: (args: RenderControlsArgs) => React.ReactNode;
  /**
   * A render function which allows you to use whatever modal you wish
   * @param {RenderEditModalArgs} args
   * @return {React.ReactNode}
   */
  renderEditModal?: (args: RenderEditModalArgs) => React.ReactNode;
  /**
   * A render function that allows you to place something like lightbox near your
   * images grid. It can be rendered in `readOnly: true` mode only
   * @param args
   * @return {React.ReactNode}
   */
  renderExtra?: (args: RenderExtraArgs) => React.ReactNode;
  /**
   * A render function which should return a custom image component, for example
   * it could be wrapped into tooltip which shows image description
   * @param {RenderImageArgs} args
   * @return {React.ReactNode}
   */
  renderImage?: (args: RenderImageArgs) => React.ReactNode;
  gridClassName?: string;
  /**
   * Image custom className
   * We have a restriction here: if you will implement this property, then you
   * will have add all css rules from default style, since, they will be skipped
   *
   * Example:
   * .custom-image-class {
   *   width: 100%;
   *   height: 100%;
   *   objectFit: cover;
   *   ...rest
   * }
   */
  imageClassName?: string;
  /**
   * Image wrapper custom className
   */
  imageWrapperClassName?: string;
  /**
   * Number of left images (+x) custom className
   * We have a restriction here: if you will implement this property, then you
   * will have create all rules from scratch, since, they default styles be skipped
   */
  leftClassName?: string;
}

interface ExtendedFile extends File {
  src?: string;
  description?: string;
}

export interface Image {
  /**
   * A link to image location
   */
  src: string;
  /**
   * Image description
   */
  description?: string;
}

export type TypeImage = ExtendedFile | Image;

export interface GalleryElement extends Element {
  descriptions: Record<string, string>;
  images: TypeImage[];
}

export interface ReadOnlyGalleryElement extends GalleryElement {
  images: Image[];
}
