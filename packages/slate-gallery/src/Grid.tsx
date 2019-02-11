import * as React from 'react';

import { useUIDSeed } from 'react-uid';

import Left from './Left';

const img = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as React.CSSProperties;

const buildGridContainer = (columns, rows) => ({
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gridTemplateRows: `repeat(${rows}, auto)`,
});

const buildGridItem = (gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd) => ({
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
});

const buildGrid = size => {
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

const getPositionTwo = index => {
  switch (index) {
    case 1:
      return buildGridItem(2, 3, 1, 2);
    case 0:
    default:
      return buildGridItem(1, 2, 1, 2);
  }
};

const getPositionThree = index => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 3, 4);
    case 2:
      return buildGridItem(2, 3, 3, 4);
    case 0:
    default:
      return buildGridItem(1, 3, 1, 3);
  }
};

const getPositionFour = index => {
  switch (index) {
    case 1:
      return buildGridItem(1, 2, 3, 4);
    case 2:
      return buildGridItem(2, 3, 3, 4);
    case 3:
      return buildGridItem(3, 4, 3, 4);
    case 0:
    default:
      return buildGridItem(1, 4, 1, 3);
  }
};

const getPositionFive = index => {
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
    default:
      return buildGridItem(1, 3, 1, 4);
  }
};

const getPositionSix = index => {
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
    default:
      return buildGridItem(1, 3, 1, 3);
  }
};

const getPositionSeven = index => {
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
    default:
      return buildGridItem(1, 5, 2, 4);
  }
};

const getPositionEight = index => {
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
    default:
      return buildGridItem(2, 6, 1, 3);
  }
};

const getPositionNine = index => {
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
    default:
      return buildGridItem(2, 4, 1, 3);
  }
};

const getItemStyle = (index, size) => {
  switch (size) {
    case 1:
    case 2:
    default:
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

const container = size => ({
  display: 'grid',
  ...buildGrid(size),
  gridGap: 2.5,
  marginTop: 16,
}) as React.CSSProperties;

export default function Grid({ images }) {
  const seed = useUIDSeed();
  const length = images.length || 1;
  const maxLength = length > 9 ? 9 : length;
  const allowedImages = images.slice(0, maxLength);
  // number of images that was left
  const left = length - maxLength;

  // TODO: allow src-set

  return (
    <div style={container(maxLength)}>
      {allowedImages.map((image, index) => {
        const withLeft = index === maxLength - 1 && left > 0;
        const leftContainerStyle = withLeft ? { position: 'relative' } : {};
        return (
          <div
            key={seed(image)}
            style={{ ...getItemStyle(index, maxLength), ...leftContainerStyle } as React.CSSProperties}
          >
            <img style={img} src={image.src} alt={image.name} />
            {withLeft && <Left left={left} />}
          </div>
        );
      })}
    </div>
  );
}
