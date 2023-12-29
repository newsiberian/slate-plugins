import type { MouseEvent, ReactNode } from 'react';
import type { DropzoneProps } from 'react-dropzone';
import type { SortableContainerProps } from 'react-sortable-hoc';
import type { GalleryReadOnlyOptions } from '@mercuriya/slate-gallery-read-only';

export type RenderControlsParams = {
  /**
   * An index of selected image
   */
  index: number;
  /**
   * A function that will open modal or prompt
   */
  onOpenEditModal: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  onRemove: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
};

export type RenderEditModalParams = {
  key: number;
  open: boolean;
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
};

export type GalleryOptions = GalleryReadOnlyOptions & {
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
   * @param {RenderControlsParams} params
   * @return {ReactNode}
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
  renderControls?: (params: RenderControlsParams) => ReactNode;
  /**
   * A render function which allows you to use whatever modal you wish
   */
  renderEditModal?: (params: RenderEditModalParams) => ReactNode;
};
