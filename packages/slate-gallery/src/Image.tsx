import React, { useState } from 'react';

import Controls from './Controls';
import Left from './Left';
import { RenderControlsArgs } from './types';

interface ExtendedFile extends File {
  src?: string;
}

interface ImageInterface {
  src: string;
  name: string;
}

export type TypeImage = ExtendedFile | ImageInterface;

interface ImageProps {
  /**
   * We need to know index in cases when we need to edit or remove image, so it
   * is not used in Image component, but passed down to Controls component
   */
  index: number;
  image: TypeImage;
  imageComponent?: ({}) => React.ReactNode;
  renderControls?: (args: RenderControlsArgs) => React.ReactNode;
  wrapperStyle: React.CSSProperties;
  withLeft: boolean;
  left?: number;
  readOnly: boolean;
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
  imageComponent,
  renderControls,
  wrapperStyle,
  withLeft,
  left,
  readOnly,
  onOpenEditModal,
  onRemove,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const imageWrapperProps = {} as { className?: string };
  const imageProps = {} as { className?: string; style?: object };

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

  return (
    <div style={wrapperStyle} {...imageWrapperProps}>
      {!readOnly && renderControlsComponent()}
      <img
        src={image.src}
        alt={image.name}
        onLoad={handleLoad}
        {...imageProps}
      />
      {readOnly && loaded && <Left left={left} leftClassName={leftClassName} />}
    </div>
  );
};

export default Image;
