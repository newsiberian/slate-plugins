import React, { useState } from 'react';

import Controls from './Controls';
import Left from './Left';
import { RenderControlsArgs, RenderImageArgs, TypeImage } from './types';

interface ImageProps {
  /**
   * We need to know index in cases when we need to edit or remove image, so it
   * is not used in Image component, but passed down to Controls component
   */
  index: number;
  image: TypeImage;
  renderControls?: (args: RenderControlsArgs) => React.ReactNode;
  renderImage?: (args: RenderImageArgs) => React.ReactNode;
  wrapperStyle: React.CSSProperties;
  withLeft: boolean;
  left?: number;
  readOnly: boolean;
  setSelected?: (index: number) => void;
  onOpenEditModal?: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  imageClassName?: string;
  imageWrapperClassName?: string;
  leftClassName?: string;
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as React.CSSProperties;

const Image: React.FunctionComponent<ImageProps> = ({
  index,
  image,
  renderControls,
  renderImage,
  wrapperStyle,
  withLeft,
  left,
  readOnly,
  setSelected,
  onOpenEditModal,
  onRemove,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const imageWrapperProps = {} as { className?: string };
  const imageProps = {} as {
    className?: string;
    style?: React.CSSProperties;
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

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (typeof setSelected === 'function') {
      setSelected(index);
    }
  };

  const renderControlsComponent = (): React.ReactNode => {
    if (typeof renderControls === 'function') {
      return renderControls({ index, onOpenEditModal, onRemove });
    }
    return (
      <Controls
        index={index}
        onOpenEditModal={onOpenEditModal}
        onRemove={onRemove}
      />
    );
  };

  const renderImageComponent = (): React.ReactNode => {
    if (typeof renderImage === 'function') {
      return renderImage({
        image,
        index,
        onLoad: handleLoad,
        onSelect: setSelected,
        readOnly,
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
      {!readOnly && renderControlsComponent()}
      {renderImageComponent()}
      {readOnly && loaded && <Left left={left} leftClassName={leftClassName} />}
    </div>
  );
};

export default Image;
