import React, { useState } from 'react';

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
  key: string;
  image: TypeImage;
  imageComponent?: ({}) => React.ReactNode;
  wrapperStyle: React.CSSProperties;
  withLeft: boolean;
  left?: number;
}

export interface ImageComponentArgs {
  key: string;
  image: TypeImage;
  imageStyle: React.CSSProperties;
  wrapperStyle: React.CSSProperties;
  withLeft: boolean;
  left?: number;
  LeftComponent: React.ReactNode;
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
} as React.CSSProperties;

const Image: React.FunctionComponent<ImageProps> = ({
  key,
  image,
  imageComponent,
  wrapperStyle,
  withLeft,
  left,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoad = (): void => {
    if (withLeft) {
      setLoaded(true);
    }
  };

  if (typeof imageComponent === 'function') {
    return imageComponent({
      key,
      image,
      imageStyle,
      wrapperStyle,
      withLeft,
      left,
      LeftComponent: Left,
    } as ImageComponentArgs);
  }

  return (
    <div key={key} style={wrapperStyle}>
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
