import {
  useCallback,
  useMemo,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from 'react';
import arrayMove from 'array-move';
import {
  SortableContainer,
  SortableElement,
  SortableContainerProps,
  SortableElementProps,
} from 'react-sortable-hoc';
import { Element } from 'slate';
import {
  containerStyle,
  imageStyle,
  RenderImageFn,
} from '@mercuriya/slate-gallery-common';

import { Image } from './Image';
import { ReactEditorExtended, RenderControlsArgs, TypeImage } from './types';
import { changeNodeData } from './utils';

type GridProps = {
  editor: ReactEditorExtended;
  element: Element;
  images?: TypeImage[];
  size: number;
  renderControls?: (args: RenderControlsArgs) => ReactNode;
  renderImage?: RenderImageFn;
  onOpenEditModal?: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  onRemove?: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  imageWrapperClassName?: string;
  imageClassName?: string;
  leftClassName?: string;
  sortableContainerProps: SortableContainerProps;
};

type SortableListProps = SortableContainerProps & {
  images?: TypeImage[];
  maxLength: number;
};

type SortableItemProps = SortableElementProps & {
  image: TypeImage;
  imageIndex: number;
  wrapperStyle: CSSProperties;
};

const SortableItem = SortableElement<SortableItemProps>(
  ({ imageIndex, ...props }: SortableItemProps) => (
    <Image index={imageIndex} {...props} />
  ),
);

const SortableList = SortableContainer<SortableListProps>(
  ({ images, maxLength, ...props }) => {
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

const Grid = ({
  editor,
  element,
  images,
  size,
  sortableContainerProps,
  ...rest
}: GridProps) => {
  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      changeNodeData(editor, element, {
        images: arrayMove(images, oldIndex, newIndex),
      });
    },
    [element, images],
  );

  const shouldCancelStart = useCallback(() => false, []);

  const length = images.length || 1;
  const fixedSize = useMemo(
    () => (typeof size === 'number' && size > 0 && size <= 9 ? size : 9),
    [size],
  );
  const maxLength = length > fixedSize ? fixedSize : length;

  return (
    <SortableList
      axis="xy"
      images={images}
      maxLength={maxLength}
      onSortEnd={handleSortEnd}
      shouldCancelStart={shouldCancelStart}
      {...rest}
      {...sortableContainerProps}
    />
  );
};

export default Grid;
