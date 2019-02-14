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
   * A custom image component. It will be rendered for readOnly: false case
   *
   * Please, check an Image component to use it as example
   *
   * @param image {object} - image properties
   * @return {React.ReactNode} - custom image component
   */
  imageComponent?: (args) => React.ReactNode;
}

/**
 *
 * @param {object} attributes
 * @param {Editor} editor
 * @param {Block} node
 * @param {string | React.ReactNode} placeholder
 * @param {string | React.ReactNode} droppingPlaceholder
 * @param {boolean} readOnly
 * @param {DropzoneProps} dropzoneProps
 * @param {(args) => React.ReactNode} imageComponent
 * @return {any}
 * @constructor
 */
const Gallery: React.FunctionComponent<GalleryProps> = ({
  attributes,
  editor,
  node,
  placeholder,
  droppingPlaceholder,
  readOnly,
  dropzoneProps,
  imageComponent,
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
                imageComponent={imageComponent}
                readOnly={readOnly}
                onEdit={handleEdit}
                onRemove={handleRemove}
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
        imageComponent={imageComponent}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Gallery;
