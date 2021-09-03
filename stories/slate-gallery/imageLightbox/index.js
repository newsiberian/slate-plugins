import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

export default function ImageLightbox({ images, index }) {
  const [photoIndex, setProtoIndex] = useState(index);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // This indicates that some of the images was clicked
    if (typeof index === 'number' && !open) {
      setProtoIndex(index);
      setOpen(true);
    }
  });

  if (open) {
    return (
      <Lightbox
        mainSrc={images[photoIndex].src}
        nextSrc={images[(photoIndex + 1) % images.length].src}
        prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
        onCloseRequest={() => setOpen(false)}
        onMovePrevRequest={() =>
          setProtoIndex((photoIndex + images.length - 1) % images.length)
        }
        onMoveNextRequest={() =>
          setProtoIndex((photoIndex + 1) % images.length)
        }
      />
    );
  }
  return null;
}
