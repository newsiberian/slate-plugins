import { useCallback, CSSProperties, MouseEvent, ReactNode } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableContainerProps,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import {
  containerStyle,
  GalleryElement,
  imageStyle,
  RenderImageFn,
} from '@mercuriya/slate-gallery-common';

import { Image } from './Image';
import { RenderControlsParams } from './types';
import { changeNodeData } from './utils';

type GridProps<Editor extends BaseEditor & ReactEditor> = {
  editor: Editor;
  element: GalleryElement;
  images?: GalleryElement['images'];
  size: number;
  renderControls?: (params: RenderControlsParams) => ReactNode;
  renderImage?: RenderImageFn;
  onOpenEditModal: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  onRemove: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  imageWrapperClassName?: string;
  imageClassName?: string;
  leftClassName?: string;
  sortableContainerProps: SortableContainerProps;
};

type SortableListProps<Editor extends BaseEditor & ReactEditor> = Omit<
  GridProps<Editor>,
  'editor' | 'element' | 'images' | 'size' | 'sortableContainerProps'
> & {
  images?: GalleryElement['images'];
  maxLength: number;
};

type SortableItemProps<Editor extends BaseEditor & ReactEditor> = Omit<
  GridProps<Editor>,
  'editor' | 'element' | 'images' | 'size' | 'sortableContainerProps'
> & {
  image: GalleryElement['images'][number];
  imageIndex: number;
  wrapperStyle: CSSProperties;
};

const SortableItem = SortableElement<
  SortableItemProps<BaseEditor & ReactEditor>
>(({ imageIndex, ...props }: SortableItemProps<BaseEditor & ReactEditor>) => (
  <Image index={imageIndex} {...props} />
));

const SortableList = SortableContainer<
  SortableListProps<BaseEditor & ReactEditor>
>(
  ({
    images,
    maxLength,
    ...props
  }: SortableListProps<BaseEditor & ReactEditor>) => {
    return (
      <div style={containerStyle(maxLength)}>
        {images.map((image, index) => {
          return (
            <SortableItem
              key={image.src}
              // internally used index prop
              index={index}
              imageIndex={index}
              image={image}
              wrapperStyle={{
                ...imageStyle(index, maxLength),
                position: 'relative',
              }}
              {...props}
            />
          );
        })}
      </div>
    );
  },
);

export const Grid = <Editor extends BaseEditor & ReactEditor>({
  editor,
  element,
  images,
  size,
  sortableContainerProps,
  ...props
}: GridProps<Editor>) => {
  const maxLength = Math.min(9, size, images.length ?? 1);

  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      changeNodeData(editor, element, {
        images: arrayMove(images, oldIndex, newIndex),
      });
    },
    [element, images],
  );

  const shouldCancelStart = (e) => {
    return e.target.nodeName !== 'IMG';
  };

  return (
    <SortableList
      axis="xy"
      images={images}
      maxLength={maxLength}
      onSortEnd={handleSortEnd}
      shouldCancelStart={shouldCancelStart}
      {...props}
      {...sortableContainerProps}
    />
  );
};
