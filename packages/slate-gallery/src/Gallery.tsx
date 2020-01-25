import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Element } from 'slate';
import { ReactEditor } from 'slate-react';

import Grid from './Grid';
import { GalleryOptions } from './types';
import { changeNodeData } from './utils';

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
  children: React.ReactNode;
  editor: ReactEditor;
  element: Element;
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
  children,
  editor,
  element,
  size = 9,
  placeholder,
  droppingPlaceholder,
  readOnly,
  dropzoneProps = {},
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
  const onDrop = useCallback(
    acceptedFiles => {
      insertImage(
        // TODO: make it custom
        acceptedFiles.map(file => {
          Object.assign(file, {
            src: URL.createObjectURL(file),
          });

          return file;
        }),
      );
    },
    [element],
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple: true,
    onDrop,
    ...dropzoneProps,
  });
  const { images = [] } = element;

  useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach(file => URL.revokeObjectURL(file.src));
    };
  }, []);

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
      const description = window.prompt(
        'Modify image description',
        getDescription(index) || '',
      );
      // skip on `cancel`
      if (typeof description === 'string' && description.length) {
        handleEdit(index, description);
      }
    }
  };

  const handleEdit = useCallback(
    (index: number, text: string): void => {
      const image = images[index];

      // We can have two cases here: new images as Files or previously saved
      // images as simple objects. In first case we can't put description within
      // File because in some scenarios all unrelated data will be lost in process,
      // i.e. when you use `graphql-upload`. In second case it is obvious that you
      // want to put all image props together, so src, description, etc will be
      // located within image object, that's why we cover two cases here

      if (!(image instanceof File)) {
        changeNodeData(editor, element, {
          images: images.map((img, i) => {
            if (i === index) {
              img.description = text;
              return img;
            }
            return img;
          }),
        });
      }

      changeNodeData(editor, element, {
        descriptions: {
          ...element.descriptions,
          // use name as id. This will help you to identify it while processing
          [image.name]: text,
        },
      });
    },
    [element],
  );

  const handleRemove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, index: number): void => {
      event.preventDefault();
      event.stopPropagation();

      changeNodeData(editor, element, {
        images: images.filter((image, i) => i !== index),
      });
    },
    [element],
  );

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  /**
   * Insert images File objects into gallery's data
   * @param {File[]} files
   */
  function insertImage(files: File[]): void {
    changeNodeData(editor, element, {
      images: Array.isArray(element.images)
        ? element.images.concat(files)
        : files,
    });
  }

  const getDescription = useCallback(
    index => {
      const image = images[index];

      if (!image) {
        return;
      }

      if (image instanceof File) {
        if (element.descriptions) {
          return element.descriptions[image.name];
        }
        return '';
      }
      return image.description;
    },
    [element],
  );

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

  const placeholderNode = useMemo(
    () =>
      placeholder ? (
        placeholder
      ) : (
        <p>Drop images here, or click to select images to upload</p>
      ),
    [placeholder],
  );

  const droppingPlaceholderNode = useMemo(
    () =>
      droppingPlaceholder ? droppingPlaceholder : <p>Drop images here...</p>,
    [droppingPlaceholder],
  );

  const style = useMemo(
    () => ({
      ...root,
      ...(!isDragActive && !isDragAccept && !isDragReject ? normal : {}),
      ...(isDragActive ? active : {}),
      ...(isDragAccept ? accepted : {}),
      ...(isDragReject ? rejected : {}),
    }),
    [isDragActive, isDragAccept, isDragReject],
  );

  const info = useCallback((): React.ReactNode | string | null => {
    if (!images.length) {
      return isDragActive ? droppingPlaceholderNode : placeholderNode;
    }
    return null;
  }, [images.length, isDragActive]);

  return (
    <div {...attributes}>
      <div {...getRootProps()} style={style} contentEditable={false}>
        <input {...getInputProps()} />

        {info()}

        <Grid
          editor={editor}
          element={element}
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

        {open && renderEditModalComponent()}
      </div>

      {children}
    </div>
  );
};

export default Gallery;
