import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type {
  ImageParams,
  RenderImageFn,
  RenderImageProps,
} from '@mercuriya/slate-gallery-common';

import { Controls } from './Controls';
import type { RenderControlsParams } from './types';

export type ImageProps = RenderControlsParams & {
  image: ImageParams;
  renderControls?: (params: RenderControlsParams) => ReactNode;
  renderImage?: RenderImageFn;
  onSelect?: RenderImageProps['onSelect'];
  wrapperStyle: CSSProperties;
  imageClassName?: string;
  imageWrapperClassName?: string;
};

const imageStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export function Image({
  index,
  image,
  renderControls,
  renderImage,
  wrapperStyle,
  onSelect,
  onOpenEditModal,
  onRemove,
  imageClassName,
  imageWrapperClassName,
}: ImageProps) {
  const imageWrapperProps: { className?: string } = {};
  const imageProps: { className?: string; style?: CSSProperties } = {};

  if (imageWrapperClassName) {
    imageWrapperProps.className = imageWrapperClassName;
  }

  if (imageClassName) {
    imageProps.className = imageClassName;
  } else {
    imageProps.style = imageStyle;
  }

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    if (typeof onSelect === 'function') {
      onSelect(index, event);
    }
  };

  const renderControlsComponent = () => {
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

  const renderImageComponent = () => {
    if (typeof renderImage === 'function') {
      return renderImage({
        readOnly: false,
        image,
        index,
        onSelect,
      });
    }

    return (
      <img
        src={image.src}
        alt={image.description}
        onClick={handleClick}
        {...imageProps}
      />
    );
  };

  return (
    <div style={wrapperStyle} {...imageWrapperProps}>
      {renderControlsComponent()}
      {renderImageComponent()}
    </div>
  );
}
