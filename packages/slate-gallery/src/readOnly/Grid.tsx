import React from 'react';
import { useUIDSeed } from 'react-uid';

import Image from '../Image';
import { RenderImageArgs, TypeImage } from '../types';
import { container, getItemStyle } from '../utils';

interface GridProps {
  images?: TypeImage[];
  size: number;
  readOnly: boolean;
  renderImage?: (args: RenderImageArgs) => React.ReactNode;
  imageWrapperClassName?: string;
  imageClassName?: string;
  leftClassName?: string;
  gridClassName?: string;
}

const Grid: React.FunctionComponent<GridProps> = props => {
  const seed = useUIDSeed();

  const { gridClassName, images, size, ...rest } = props;
  const length = images.length || 1;
  const maxLength = length > size ? size : length;
  const allowedImages = images.slice(0, maxLength);
  // number of images that was left
  const left = length - maxLength;

  return (
    <div style={container(maxLength)} className={gridClassName}>
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
  );
};

export default Grid;
