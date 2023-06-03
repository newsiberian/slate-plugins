import { useEffect, useState, ReactNode } from 'react';
import {
  containerStyle,
  imageStyle,
  ImageParams,
  RenderImageFn,
} from '@mercuriya/slate-gallery-common';

import { Image } from './Image';

type RenderExtraProps = {
  images: ImageParams[];
  /**
   * Selected image index
   */
  index?: number;
};

export type GridProps = {
  images?: ImageParams[];
  /**
   * Grid size - number of images that will be visible for "readOnly: false" mode
   * The remaining images will be hidden, but user will have an ability to find them
   * by opening full screen slider
   *
   * min value: 1
   * max value: 9
   * default: 9
   */
  size: number;
  /**
   * A render function which should return a custom image component, for example
   * it could be wrapped into tooltip which shows image description
   */
  renderImage?: RenderImageFn;
  /**
   * A render function that allows you to place something like lightbox near your
   * images grid. It can be rendered in `readOnly: true` mode only
   */
  renderExtra?: (args: RenderExtraProps) => ReactNode;
  /**
   * Image wrapper custom className
   */
  imageWrapperClassName?: string;
  /**
   * Image custom className
   * We have a restriction here: if you will implement this property, then you
   * will have to add all css rules from default style, since, they will be skipped
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
   * Number of left images (+x) custom className
   * We have a restriction here: if you will implement this property, then you
   * will have to create all rules from scratch, since, they default styles be skipped
   */
  leftClassName?: string;
  gridClassName?: string;
};

export function Grid(props: GridProps) {
  const [selected, setSelected] = useState<number | null>(null);

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

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  return (
    <>
      <div style={containerStyle(maxLength)} className={gridClassName}>
        {allowedImages.map((image, index) => {
          return (
            <Image
              key={image.src}
              index={index}
              image={image}
              wrapperStyle={{
                ...imageStyle(index, maxLength),
                position: 'relative',
              }}
              withLeft={Boolean(index === maxLength - 1 && left > 0)}
              left={left}
              onSelect={handleSelect}
              {...rest}
            />
          );
        })}
      </div>
      {renderExtraBlock()}
    </>
  );
}
