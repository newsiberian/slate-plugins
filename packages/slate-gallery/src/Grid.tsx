import React from 'react';

import arrayMove from 'array-move';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
} from 'react-sortable-hoc';
import { useUIDSeed } from 'react-uid';

import Image from './Image';
import { RenderControlsArgs, RenderImageArgs, TypeImage } from './types';
import { container, getItemStyle } from './utils';

interface GridProps {
  images?: TypeImage[];
  setImages: (images: TypeImage[]) => void;
  size: number;
  renderControls?: (args: RenderControlsArgs) => React.ReactNode;
  renderImage?: (args: RenderImageArgs) => React.ReactNode;
  readOnly: boolean;
  onOpenEditModal?: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  imageWrapperClassName?: string;
  imageClassName?: string;
  leftClassName?: string;
}

interface SortableListProps extends SortableContainerProps {
  images?: TypeImage[];
  left?: number;
  maxLength: number;
  seed: (item) => string;
  readOnly: boolean;
}

interface SortableItemProps extends SortableElementProps {
  image: TypeImage;
  left?: number;
  withLeft: boolean;
  wrapperStyle: React.CSSProperties;
  readOnly: boolean;
}

const SortableItem = SortableElement(
  ({
    image,
    index,
    wrapperStyle,
    withLeft,
    left,
    ...rest
  }: SortableItemProps) => (
    <Image
      index={index}
      image={image}
      wrapperStyle={wrapperStyle}
      withLeft={withLeft}
      left={left}
      {...rest}
    />
  ),
);

const SortableList = SortableContainer((props: SortableListProps) => {
  const { images, left, maxLength, seed, ...rest } = props;
  return (
    <div style={container(maxLength)}>
      {images.map((image, index) => {
        const key = seed(image) as string;
        const withLeft = Boolean(index === maxLength - 1 && left > 0);
        const wrapperStyle = {
          ...getItemStyle(index, maxLength),
          position: 'relative',
        } as React.CSSProperties;

        return (
          <SortableItem
            key={key}
            index={index}
            image={image}
            wrapperStyle={wrapperStyle}
            withLeft={withLeft}
            left={left}
            {...rest}
          />
        );
      })}
    </div>
  );
});

const Grid: React.FunctionComponent<GridProps> = props => {
  const seed = useUIDSeed();

  const { images, setImages, size, ...rest } = props;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImages(arrayMove(images, oldIndex, newIndex));
  };

  const length = images.length || 1;
  const fixedSize =
    typeof size === 'number' && size > 0 && size <= 9 ? size : 9;
  const maxLength = length > fixedSize ? fixedSize : length;
  // number of images that was left
  const left = length - maxLength;

  return (
    <SortableList
      images={images}
      left={left}
      maxLength={maxLength}
      onSortEnd={onSortEnd}
      seed={seed}
      {...rest}
    />
  );
};

export default Grid;
