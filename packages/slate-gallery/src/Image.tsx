import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type {
  ImageParams,
  RenderImageFn,
  RenderImageProps,
} from '@mercuriya/slate-gallery-common';

import Controls from './Controls';
import type { RenderControlsArgs } from './types';

export type ImageProps = {
  /**
   * We need to know index in cases when we need to edit or remove image, so it
   * is not used in Image component, but passed down to Controls component
   */
  index: number;
  image: ImageParams;
  renderControls?: (args: RenderControlsArgs) => ReactNode;
  renderImage?: RenderImageFn;
  wrapperStyle: CSSProperties;
  onSelect?: RenderImageProps['onSelect'];
  onOpenEditModal?: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
  onRemove?: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
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

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    if (typeof onSelect === 'function') {
      onSelect(index, event);
    }
  };

  const renderControlsComponent = (): ReactNode => {
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
