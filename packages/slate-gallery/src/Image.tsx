import React, { useState } from 'react';

import Controls from './Controls';
import Left from './Left';

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
  controlsComponent?: (args: ControlsComponentArgs) => React.ReactNode;
  wrapperStyle: React.CSSProperties;
  withLeft: boolean;
  left?: number;
  readOnly: boolean;
  onEdit?: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
  onRemove?: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
  imageClassName?: string;
  imageWrapperClassName?: string;
  leftClassName?: string;
}

interface ControlsComponentArgs {
  index: number;
  onEdit: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
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
  controlsComponent,
  wrapperStyle,
  withLeft,
  left,
  readOnly,
  onEdit,
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

  const renderControls = (): React.ReactNode => {
    if (typeof controlsComponent === 'function') {
      return controlsComponent({ index, onEdit, onRemove });
    }
    return <Controls index={index} onEdit={onEdit} onRemove={onRemove} />;
  };

  return (
    <div style={wrapperStyle} {...imageWrapperProps}>
      {!readOnly && renderControls()}
      <img
        src={image.src}
        alt={image.name}
        onLoad={handleLoad}
        {...imageProps}
      />
      {loaded && <Left left={left} leftClassName={leftClassName} />}
    </div>
  );
};

export default Image;
