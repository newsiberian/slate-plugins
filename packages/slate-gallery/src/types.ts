import React from "react";
import { DropzoneProps } from "react-dropzone";

export interface RenderControlsArgs {
  index: number;
  onOpenEditModal: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

export interface RenderEditModalArgs {
  index: number;
  onEdit: (index: number, text: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface RenderImageArgs {
  image: TypeImage;
  /**
   * This function is required. It is uses internally
   */
  onLoad: () => void;
  /**
   * Slate readOnly state
   * Could be handy when you need to use different logic for those two states
   */
  readOnly: boolean;
}

export interface GalleryOptions {
  /**
   * Grid size - number of images that will be visible for "readOnly: false" mode
   * All other images will be hidden, but user will have an ability to find them
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
   * Custom controls component. It is uses only for "readOnly: true" mode
   * Handlers must be added to each child-button accordingly
   * @param {RenderControlsArgs} args
   * @return {React.ReactNode}
   *
   * Example:
   * <div style={root}>
   *   <button onClick={onOpenEditModal(index)} title="Edit image description">
   *     Edit
   *   </button>
   *   <button onClick={onRemove(index)} title="Remove image">
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

interface ImageInterface {
  /**
   * A link to image location
   */
  src: string;
  /**
   * Image description
   */
  description?: string;
}

export type TypeImage = ExtendedFile | ImageInterface;
