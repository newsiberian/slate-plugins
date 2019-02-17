import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
};

export default withStyles(styles)(function CustomImage({ classes, image, onLoad, readOnly }) {
  if (!readOnly && typeof image.description === 'string' && image.description.length) {
    return (
      <Tooltip title={image.description}>
        <img
          className={classes.image}
          src={image.src}
          alt={image.description}
          onLoad={onLoad}
        />
      </Tooltip>
    );
  }
  return (
    <img
      className={classes.image}
      src={image.src}
      alt={image.description}
      onLoad={onLoad}
    />
  );
})
