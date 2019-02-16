import React from 'react';
import { useUIDSeed } from 'react-uid';

import Image, { TypeImage } from './Image';

interface GridProps {
  images?: TypeImage[];
  size: number;
  controlsComponent?: (args) => React.ReactNode;
  readOnly: boolean;
  onEdit?: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
  onRemove?: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
  imageWrapperClassName?: string;
  imageClassName?: string;
  leftClassName?: string;
}

const buildGridContainer = (
  columns: number,
  rows: number,
): React.CSSProperties => ({
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, auto)`,
  gridAutoRows: '1fr',
  // gridAutoColumns: 'auto',
});

const buildGridItem = (
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
) => ({
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
});

const buildGrid = (size: number) => {
  switch (size) {
    case 1:
    default:
      return buildGridContainer(1, 1);
    case 2:
      return buildGridContainer(2, 1);
    case 3:
      return buildGridContainer(2, 3);
    case 4:
    case 6:
      return buildGridContainer(3, 3);
    case 5:
      return buildGridContainer(3, 6);
    case 7:
      return buildGridContainer(3, 4);
    case 8:
      return buildGridContainer(6, 3);
    case 9:
      return buildGridContainer(4, 3);
  }
};

const getPositionOne = (index: number) => {
  switch (index) {
    case 0:
      return buildGridItem(1, 2, 1, 2);
    default:
      return {};
  }
};

const getPositionTwo = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(2, 3, 1, 2);
    case 0:
      return buildGridItem(1, 2, 1, 2);
    default:
      return {};
  }
};

const getPositionThree = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 3, 4);
    case 2:
      return buildGridItem(2, 3, 3, 4);
    case 0:
      return buildGridItem(1, 3, 1, 3);
    default:
      return {};
  }
};

const getPositionFour = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 3, 4);
    case 2:
      return buildGridItem(2, 3, 3, 4);
    case 3:
      return buildGridItem(3, 4, 3, 4);
    case 0:
      return buildGridItem(1, 4, 1, 3);
    default:
      return {};
  }
};

const getPositionFive = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 3, 4, 7);
    case 2:
      return buildGridItem(3, 4, 1, 3);
    case 3:
      return buildGridItem(3, 4, 3, 5);
    case 4:
      return buildGridItem(3, 4, 5, 7);
    case 0:
      return buildGridItem(1, 3, 1, 4);
    default:
      return {};
  }
};

const getPositionSix = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(3, 4, 1, 2);
    case 2:
      return buildGridItem(3, 4, 2, 3);
    case 3:
      return buildGridItem(1, 2, 3, 4);
    case 4:
      return buildGridItem(2, 3, 3, 4);
    case 5:
      return buildGridItem(3, 4, 3, 4);
    case 0:
      return buildGridItem(1, 3, 1, 3);
    default:
      return {};
  }
};

const getPositionSeven = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 1, 2);
    case 2:
      return buildGridItem(2, 3, 1, 2);
    case 3:
      return buildGridItem(3, 4, 1, 2);
    case 4:
      return buildGridItem(1, 2, 4, 5);
    case 5:
      return buildGridItem(2, 3, 4, 5);
    case 6:
      return buildGridItem(3, 4, 4, 5);
    case 0:
      return buildGridItem(1, 4, 2, 4);
    default:
      return {};
  }
};

const getPositionEight = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 1, 2);
    case 2:
      return buildGridItem(1, 2, 2, 3);
    case 3:
      return buildGridItem(1, 3, 3, 4);
    case 4:
      return buildGridItem(3, 5, 3, 4);
    case 5:
      return buildGridItem(6, 7, 1, 2);
    case 6:
      return buildGridItem(6, 7, 2, 3);
    case 7:
      return buildGridItem(5, 7, 3, 4);
    case 0:
      return buildGridItem(2, 6, 1, 3);
    default:
      return {};
  }
};

const getPositionNine = (index: number) => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 1, 2);
    case 2:
      return buildGridItem(1, 2, 2, 3);
    case 3:
      return buildGridItem(1, 2, 3, 4);
    case 4:
      return buildGridItem(2, 3, 3, 4);
    case 5:
      return buildGridItem(3, 4, 3, 4);
    case 6:
      return buildGridItem(4, 5, 1, 2);
    case 7:
      return buildGridItem(4, 5, 2, 3);
    case 8:
      return buildGridItem(4, 5, 3, 4);
    case 0:
      return buildGridItem(2, 4, 1, 3);
    default:
      return {};
  }
};

const getItemStyle = (index: number, size: number) => {
  switch (size) {
    case 1:
    default:
      return getPositionOne(index);
    case 2:
      return getPositionTwo(index);
    case 3:
      return getPositionThree(index);
    case 4:
      return getPositionFour(index);
    case 5:
      return getPositionFive(index);
    case 6:
      return getPositionSix(index);
    case 7:
      return getPositionSeven(index);
    case 8:
      return getPositionEight(index);
    case 9:
      return getPositionNine(index);
  }
};

const container = size =>
  ({
    display: 'grid',
    ...buildGrid(size),
    gridGap: 2.5,
    marginTop: 16,
  } as React.CSSProperties);

const Grid: React.FunctionComponent<GridProps> = props => {
  const seed = useUIDSeed();

  const { images, size, ...rest } = props;
  const length = images.length || 1;
  const fixedSize = +size > 0 && +size <= 9 ? +size : 9;
  const maxLength = length > fixedSize ? fixedSize : length;
  // show all images for editable mode to give an ability to manage them
  const allowedImages = props.readOnly ? images.slice(0, maxLength) : images;
  // number of images that was left
  const left = length - maxLength;

  return (
    <>
      <div style={container(maxLength)}>
        {allowedImages.map((image, index) => {
          const key = seed(image) as string;
          const withLeft = Boolean(index === maxLength - 1 && left > 0);
          const wrapperStyle = {
            ...getItemStyle(index, maxLength),
            position: 'relative',
          } as React.CSSProperties;

          return (
            <Image
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
    </>
  );
};

export default Grid;
