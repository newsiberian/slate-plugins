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
  renderEditModal?: (args: RenderEditModalArgs) => React.ReactNode;
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
