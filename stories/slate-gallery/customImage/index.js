import React, { useState } from 'react';

export default function CustomImage({ image, imageStyle, wrapperStyle, withLeft, left, LeftComponent }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    if (withLeft) {
      setLoaded(true);
    }
  };

  return (
    <div style={wrapperStyle}>
      <img
        style={{ ...imageStyle, border: '2px solid red' }}
        src={image.src}
        alt={image.name}
        onLoad={handleLoad}
      />
      {loaded && <LeftComponent left={left} />}
    </div>
  );
}
