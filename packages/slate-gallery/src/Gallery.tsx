import * as React from 'react';
import Dropzone from 'react-dropzone';
import * as Slate from 'slate';

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

interface ExtendedFile extends File {
  src?: string;
}

interface GalleryProps {
  attributes: object;
  editor: Slate.Editor;
  node: Slate.Block;
  readOnly: boolean;
}

interface GalleryState {
  images?: ExtendedFile[];
}

// TODO: if not editor focused, place gallery at the bottom of document

export default class Gallery extends React.Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);
    this.state = { images: [] };

    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    if (this.props.editor.readOnly) {
      const data = this.props.node.get('data');
      if (data.has('images')) {
        data.map((value, key) => {
          if (key === 'images') {
            this.setState({
              images: value,
            });
          }
        });
      }
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.images.forEach(file => URL.revokeObjectURL(file.src));
  }

  handleDrop(acceptedFiles) {
    // const { editor } = this.props;
    const { images } = this.state;

    const srcs = acceptedFiles.map(file => {
      Object.assign(file, {
        src: URL.createObjectURL(file),
      });

      return file;
    });

    this.setState({
      images: [...images, ...srcs],
    });

    // srcs.forEach(image => {
    //   changeData(editor, { images: [image] });
    // });

    // acceptedFiles.forEach(file => {
    //   const reader = new FileReader();
    //
    //   reader.addEventListener('load', function() {
    //     // editor.command(insertImage, this.result, node);
    //     changeData(editor, { images: [this.result] });
    //   });
    //
    //   reader.readAsDataURL(file);
    // });

    // this.setState({
    //   images: [...images, ...acceptedFiles],
    // });
  }

  render() {
    const { attributes, readOnly } = this.props;
    const { images } = this.state;

    if (!readOnly) {
      return (
        <Dropzone multiple onDrop={this.handleDrop}>
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
            const style = {
              ...root,
              ...(!isDragActive && !isDragAccept && !isDragReject ? normal : {}),
              ...(isDragActive ? active : {}),
              ...(isDragAccept ? accepted : {}),
              ...(isDragReject ? rejected : {}),
            };

            return (
              <div {...attributes} {...getRootProps()} style={style}>
                <input {...getInputProps()} />

                {isDragActive
                  ? <p>Drop images here...</p>
                  : <p>Drop images here, or click to select images to upload</p>}

                <Grid images={images} />
              </div>
            );
          }}
        </Dropzone>
      );
    }

    return (
      <div {...attributes}>
        <Grid images={images} />
      </div>
    );
  }
}

// export default function Gallery({ attributes, children, editor, node }) {
//   // TODO: do separate previews state
//   const [images, setImages] = useState([]);
//
//   useEffect(() => {
//     const data = node.get('data');
//     const savedImages = data.get('images');
//
//     if (Array.isArray(savedImages)) {
//       setImages(savedImages);
//     }
//
//     return () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       // images.forEach(file => URL.revokeObjectURL(file.preview));
//     };
//   });
//
//   // const handleDrop = acceptedFiles => {
//   //   const previews = acceptedFiles.map(file => {
//   //     Object.assign(file, {
//   //       preview: URL.createObjectURL(file),
//   //     });
//   //
//   //     return file;
//   //   });
//   //
//   //   setImages([...images, ...acceptedFiles]);
//   //
//   //   previews.forEach(image => {
//   //     editor.command(insertImage, image, node);
//   //   });
//   // };
//
//   const handleDrop = acceptedFiles => {
//     acceptedFiles.forEach(file => {
//       const reader = new FileReader();
//
//       reader.addEventListener('load', function() {
//         // editor.command(insertImage, this.result, node);
//         changeData(editor, { images: [this.result] });
//       });
//
//       reader.readAsDataURL(file);
//     });
//
//     setImages([...images, ...acceptedFiles]);
//   };
//
//   return (
//     <Dropzone multiple onDrop={handleDrop}>
//       {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
//         const style = {
//           ...root,
//           ...(!isDragActive && !isDragAccept && !isDragReject ? normal : {}),
//           ...(isDragActive ? active : {}),
//           ...(isDragAccept ? accepted : {}),
//           ...(isDragReject ? rejected : {}),
//         };
//
//         return (
//           <div {...attributes} {...getRootProps()} style={style}>
//             <input {...getInputProps()} />
//             {isDragActive ? <p>Drop images here...</p> : <p>Drop images here, or click to select images to upload</p>}
//
//             <Grid images={images} preview>
//               {children}
//             </Grid>
//           </div>
//         );
//       }}
//     </Dropzone>
//   );
// }
