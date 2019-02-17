import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CustomEditModal({ index, onEdit, open, setOpen }) {
  const [value, setValue] = useState('');
  function handleClose() {
    setOpen(false);
  }

  function handleModify() {
    // sanitize input here if you want
    onEdit(index, value);
    handleClose();
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit image description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set an image description here. It will be tied not with image
            itself but with this document only
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image description"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModify} color="primary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
