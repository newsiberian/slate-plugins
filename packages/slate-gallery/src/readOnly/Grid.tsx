import { useEffect, useState } from 'react';
import { useUIDSeed } from 'react-uid';

import type { ReactNode } from 'react';

import Image from '../Image';
import {
  Image as ImageInterface,
  RenderExtraArgs,
  RenderImageArgs,
} from '../types';
import { container, getItemStyle } from '../utils';

interface GridProps {
  images?: ImageInterface[];
  size: number;
  readOnly: boolean;
  renderImage?: (args: RenderImageArgs) => ReactNode;
  renderExtra?: (args: RenderExtraArgs) => ReactNode;
  imageWrapperClassName?: string;
  imageClassName?: string;
  leftClassName?: string;
  gridClassName?: string;
}

const Grid = (props: GridProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const seed = useUIDSeed();

  useEffect(() => {
    // We need to flush selected index right after renderExtra will receive it
    if (typeof selected === 'number') {
      setSelected(null);
    }
  });

  const { gridClassName, images, size, renderExtra, ...rest } = props;
  const length = images.length || 1;
  const maxLength = length > size ? size : length;
  const allowedImages = images.slice(0, maxLength);
  // number of images that was left
  const left = length - maxLength;

  const renderExtraBlock = () => {
    if (typeof renderExtra === 'function') {
      return renderExtra({ images, index: selected });
    }
  };

  return (
    <>
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
              setSelected={setSelected}
              {...rest}
            />
          );
        })}
      </div>
      {renderExtraBlock()}
    </>
  );
};

export default Grid;
