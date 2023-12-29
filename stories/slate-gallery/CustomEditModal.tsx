import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function CustomEditModal({ description, index, onEdit, open, onClose }) {
  const [value, setValue] = useState(description || '');

  function handleClose() {
    onClose();
  }

  function handleModify() {
    // sanitize input here if you want
    onEdit(index, value);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
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
          onChange={(e) => setValue(e.target.value)}
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
  );
}
