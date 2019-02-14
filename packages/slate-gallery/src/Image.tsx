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

export interface ImageProps {
  image: TypeImage;
  imageComponent?: ({}) => React.ReactNode;
  wrapperStyle: React.CSSProperties;
  withLeft: boolean;
  left?: number;
  readOnly: boolean;
  onEdit?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onRemove?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export interface ImageComponentArgs {
  image: TypeImage;
  imageStyle: React.CSSProperties;
  /**
   * This is important, since it contain computed position of image in css-grid
   */
  wrapperStyle: React.CSSProperties;
  /**
   * Indicates that image contains an overlay text with number of left images
   * which will not be displayed
   */
  withLeft: boolean;
  /**
   * A number of images that left behind. They can be found by full-screen gallery
   */
  left?: number;
  LeftComponent: React.ReactNode;
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as React.CSSProperties;

const Image: React.FunctionComponent<ImageProps> = ({
  image,
  imageComponent,
  wrapperStyle,
  withLeft,
  left,
  readOnly,
  onEdit,
  onRemove,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoad = (): void => {
    if (withLeft) {
      setLoaded(true);
    }
  };

  if (typeof imageComponent === 'function') {
    return imageComponent({
      image,
      imageStyle,
      wrapperStyle,
      withLeft,
      left,
      LeftComponent: Left,
    } as ImageComponentArgs);
  }

  return (
    <div style={wrapperStyle}>
      {!readOnly && <Controls onEdit={onEdit} onRemove={onRemove} />}
      <img
        style={imageStyle}
        src={image.src}
        alt={image.name}
        onLoad={handleLoad}
      />
      {loaded && <Left left={left} />}
    </div>
  );
};

export default Image;
