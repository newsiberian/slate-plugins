import React, { useEffect, useState } from 'react';
import Dropzone, { DropzoneProps } from 'react-dropzone';
import Slate from 'slate';

import Grid from './Grid';
// import { changeData, insertImage } from './utils';

const root = {
  borderWidth: 2,
  borderRadius: 5,
  padding: 8,
  outline: 'none',
  cursor: 'pointer',
} as React.CSSProperties;

const normal = {
  borderColor: '#666',
  borderStyle: 'dashed',
} as React.CSSProperties;

const active = {
  borderStyle: 'solid',
} as React.CSSProperties;

const accepted = {
  borderStyle: 'solid',
  borderColor: '#5cb860',
} as React.CSSProperties;

const rejected = {
  borderStyle: 'solid',
  borderColor: '#f55a4e',
} as React.CSSProperties;

interface GalleryProps {
  attributes: object;
  editor: Slate.Editor;
  node: Slate.Block;
  readOnly: boolean;
  /**
   * Grid size - number of images that will be visible for "readOnly: false" mode
   * All other images will be hidden, but user will have an ability to find them
   * by opening full screen slider
   *
   * min value: 1
   * max value: 9
   * default: 9
   */
  size?: number;
  /**
   * Placeholder text
   */
  placeholder?: string | React.ReactNode;
  /**
   * Placeholder that appears on image drop
   */
  droppingPlaceholder?: string | React.ReactNode;
  /**
   * Props which goes to react-dropzone
   */
  dropzoneProps?: DropzoneProps;
  /**
   * Custom controls component. It is uses only for "readOnly: true" mode
   * Handlers must be added to each child-button accordingly
   * @param {number} args.index - index of image. It is required to handlers
   * @param {(index: number) => (e: React.MouseEvent<HTMLInputElement>) => void} args.onEdit -
   * edit image description handler.
   * @param {(index: number) => (e: React.MouseEvent<HTMLInputElement>) => void} args.onRemove -
   * remove image
   * @return {React.ReactNode}
   *
   * Example:
   * <div style={root}>
   *   <button onClick={onEdit(index)} title="Edit image description">
   *     Edit
   *   </button>
   *   <button onClick={onRemove(index)} title="Remove image">
   *     Remove
   *   </button>
   * </div>
   */
  controlsComponent?: (args) => React.ReactNode;
  /**
   * Image custom className
   * We have a restriction here: if you will implement this property, then you
   * will have add all css rules from default style, since, they will be skipped
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
   * Image wrapper custom className
   */
  imageWrapperClassName?: string;
  /**
   * Number of left images (+x) custom className
   * We have a restriction here: if you will implement this property, then you
   * will have create all rules from scratch, since, they default styles be skipped
   */
  leftClassName?: string;
}

const defaultProps = {
  size: 9,
};

const Gallery: React.FunctionComponent<GalleryProps> = ({
  attributes,
  editor,
  node,
  size,
  placeholder,
  droppingPlaceholder,
  readOnly,
  dropzoneProps,
  controlsComponent,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
}) => {
  // TODO: do separate previews state
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (readOnly) {
      const data = node.get('data');
      if (data.has('images')) {
        const savedImages = data.get('images');

        if (Array.isArray(savedImages)) {
          setImages(savedImages);
        }
      }
    }

    return () => {
      if (!readOnly) {
        // Make sure to revoke the data uris to avoid memory leaks
        images.forEach(file => URL.revokeObjectURL(file.src));
      }
    };
  });

  const handleDrop = (acceptedFiles: File[]): void => {
    const sources = acceptedFiles.map(file => {
      Object.assign(file, {
        src: URL.createObjectURL(file),
      });

      return file;
    });

    setImages([...images, ...sources]);
  };

  const handleEdit = (index: number) => (
    event: React.MouseEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
  };

  const handleRemove = (index: number) => (
    event: React.MouseEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    setImages(images.filter((image, i) => i !== index));
  };

  if (!readOnly) {
    const placeholderNode = placeholder ? (
      placeholder
    ) : (
      <p>Drop images here, or click to select images to upload</p>
    );

    const droppingPlaceholderNode = droppingPlaceholder ? (
      droppingPlaceholder
    ) : (
      <p>Drop images here...</p>
    );

    return (
      <Dropzone multiple onDrop={handleDrop} {...dropzoneProps}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          const style = {
            ...root,
            ...(!isDragActive && !isDragAccept && !isDragReject ? normal : {}),
            ...(isDragActive ? active : {}),
            ...(isDragAccept ? accepted : {}),
            ...(isDragReject ? rejected : {}),
          };

          const info = (): React.ReactNode | string | null => {
            if (!images.length) {
              return isDragActive ? droppingPlaceholderNode : placeholderNode;
            }
            return null;
          };

          return (
            <div {...attributes} {...getRootProps()} style={style}>
              <input {...getInputProps()} />

              {info()}

              <Grid
                images={images}
                size={size}
                controlsComponent={controlsComponent}
                readOnly={readOnly}
                onEdit={handleEdit}
                onRemove={handleRemove}
                imageClassName={imageClassName}
                imageWrapperClassName={imageWrapperClassName}
                leftClassName={leftClassName}
              />
            </div>
          );
        }}
      </Dropzone>
    );
  }

  return (
    <div {...attributes}>
      <Grid
        images={images}
        size={size}
        readOnly={readOnly}
        imageClassName={imageClassName}
        imageWrapperClassName={imageWrapperClassName}
        leftClassName={leftClassName}
      />
    </div>
  );
};

Gallery.defaultProps = defaultProps;

export default Gallery;
