import React from 'react';
import TextField from '@material-ui/core/TextField';

import VideoDefault from './default';

export default function CustomInput() {
  return <VideoDefault renderInput={(props) => <TextField {...props} />} />;
}
