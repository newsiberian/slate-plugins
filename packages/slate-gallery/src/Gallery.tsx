import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Slate from 'slate';

import EditModal from './EditModal';
import Grid from './Grid';
// import { changeData, insertImage } from './utils';
import { GalleryOptions } from './types';

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

interface GalleryProps extends GalleryOptions {
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
  renderControls,
  renderEditModal,
  renderImage,
  imageClassName,
  imageWrapperClassName,
  leftClassName,
}) => {
  // TODO: do separate previews state
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  // currently editable image index
  const [imageIndex, setImageIndex] = useState<number | null>(null);

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

  const handleOpenEditModal = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.stopPropagation();
    setOpen(true);
    setImageIndex(index);
  };

  const handleEdit = (index: number, text: string): void => {
    const modifiedImages = images.map((image, i) => {
      if (i === index) {
        image.description = text;
        return image;
      }
      return image;
    });
    setImages(modifiedImages);
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.stopPropagation();
    setImages(images.filter((image, i) => i !== index));
  };

  const handleDrop = (acceptedFiles: File[]): void => {
    const sources = acceptedFiles.map(file => {
      Object.assign(file, {
        src: URL.createObjectURL(file),
      });

      return file;
    });

    setImages([...images, ...sources]);
  };

  function renderEditModalComponent() {
    if (typeof renderEditModal === 'function') {
      return renderEditModal({
        index: imageIndex,
        onEdit: handleEdit,
        open,
        setOpen,
      });
    }
    return (
      <EditModal
        index={imageIndex}
        onEdit={handleEdit}
        open={open}
        setOpen={setOpen}
      />
    );
  }

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
                renderControls={renderControls}
                renderImage={renderImage}
                readOnly={readOnly}
                onOpenEditModal={handleOpenEditModal}
                onRemove={handleRemove}
                imageClassName={imageClassName}
                imageWrapperClassName={imageWrapperClassName}
                leftClassName={leftClassName}
              />

              {renderEditModalComponent()}
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
        renderImage={renderImage}
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
