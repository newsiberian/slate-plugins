import { useState, CSSProperties, MouseEvent } from 'react';
import {
  ImageParams,
  RenderImageFn,
  RenderImageProps,
} from '@mercuriya/slate-gallery-common';

import { LeftCount } from './Left';

export type ImageProps = {
  /**
   * We need to know index in cases when we need to edit or remove image, so it
   * is not used in Image component, but passed down to Controls component
   */
  index: number;
  image: ImageParams;
  renderImage?: RenderImageFn;
  wrapperStyle: CSSProperties;
  withLeft: boolean;
  left?: number;
  onSelect?: RenderImageProps['onSelect'];
  imageClassName?: string;
  imageWrapperClassName?: string;
  leftClassName?: string;
};

const imageStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export function Image({
  index,
  image,
  renderImage,
  wrapperStyle,
  withLeft,
  left,
  onSelect,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const imageWrapperProps = {} as { className?: string };
  const imageProps = {} as {
    className?: string;
    style?: CSSProperties;
  };

  if (imageWrapperClassName) {
    imageWrapperProps.className = imageWrapperClassName;
  }

  if (imageClassName) {
    imageProps.className = imageClassName;
  } else {
    imageProps.style = imageStyle;
  }

  const handleLoad = (): void => {
    if (withLeft) {
      setLoaded(true);
    }
  };

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    if (typeof onSelect === 'function') {
      onSelect(index, event);
    }
  };

  const renderImageComponent = () => {
    if (typeof renderImage === 'function') {
      return renderImage({
        readOnly: true,
        image,
        index,
        onLoad: handleLoad,
        onSelect,
      });
    }
    return (
      <img
        src={image.src}
        alt={image.description}
        onLoad={handleLoad}
        onClick={handleClick}
        {...imageProps}
      />
    );
  };

  return (
    <div style={wrapperStyle} {...imageWrapperProps}>
      {renderImageComponent()}
      {loaded && <LeftCount left={left} leftClassName={leftClassName} />}
    </div>
  );
}
