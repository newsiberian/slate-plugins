import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import Slate from 'slate';

import Grid from './Grid';
import { GalleryOptions } from './types';
import { changeNodeData, extractData } from './utils';

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

const Gallery: React.FunctionComponent<GalleryProps> = ({
  attributes,
  editor,
  node,
  size = 9,
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
  // This is used by renderEditModal function only
  const [open, setOpen] = useState<boolean>(false);
  // currently editable image index
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach(file => URL.revokeObjectURL(file.src));
    };
  });

  const images = extractData(node, 'images') || [];

  const handleOpenEditModal = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setImageIndex(index);

    // when user uses custom modal, he must implement all logic manually. See
    // storybook 'Edit modal custom component'
    if (typeof renderEditModal === 'function') {
      setOpen(true);
    } else {
      const descr = window.prompt(
        'Modify image description',
        getDescription(index) || '',
      );
      // skip on `cancel`
      if (typeof descr === 'string' && descr.length) {
        handleEdit(index, descr);
      }
    }
  };

  const handleEdit = (index: number, text: string): void => {
    const image = images[index];

    // We can have two cases here: new images as Files or previously saved
    // images as simple objects. In first case we can't put description within
    // File because in some scenarios all unrelated data will be lost in process,
    // i.e. when you use `graphql-upload`. In second case it is obvious that you
    // want to put all image props together, so src, description, etc will be
    // located within image object, that's why we cover two cases here

    if (!(image instanceof File)) {
      changeNodeData(editor, node, {
        images: images.map((img, i) => {
          if (i === index) {
            img.description = text;
            return img;
          }
          return img;
        }),
      });
    }

    const data = node.get('data');
    const descriptions = data.get('descriptions') || {};

    // use name as id. This will help you to identify it while processing
    descriptions[image.name] = text;

    changeNodeData(editor, node, {
      descriptions,
    });
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    changeNodeData(editor, node, {
      images: images.filter((image, i) => i !== index),
    });
  };

  const handleDrop = (acceptedFiles: File[]): void => {
    insertImage(
      // TODO: make it custom
      acceptedFiles.map(file => {
        Object.assign(file, {
          src: URL.createObjectURL(file),
        });

        return file;
      }),
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Insert images File objects into gallery's data
   * @param {File[]} files
   */
  function insertImage(files: File[]): void {
    const oldImages = extractData(node, 'images');
    const newImages = oldImages ? [...oldImages, ...files] : files;

    changeNodeData(editor, node, { images: newImages });
  }

  function getDescription(index) {
    const image = images[index];

    if (!image) {
      return;
    }

    if (image instanceof File) {
      const data = node.get('data');
      const descriptions = data.get('descriptions') || {};
      return descriptions[image.name];
    }
    return image.description;
  }

  function renderEditModalComponent() {
    if (typeof renderEditModal === 'function') {
      return renderEditModal({
        index: imageIndex,
        onEdit: handleEdit,
        onClose: handleClose,
        description: getDescription(imageIndex),
      });
    }
  }

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
              editor={editor}
              node={node}
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

            {/*{renderEditModalComponent()}*/}
            {open && renderEditModalComponent()}
          </div>
        );
      }}
    </Dropzone>
  );
};

export default Gallery;
