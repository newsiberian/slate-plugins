import React, { useRef, useState } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { RenderEditModalArgs } from './types';

const itemStyle = {
  marginBottom: 5,
};

const EditModal: React.FunctionComponent<RenderEditModalArgs> = ({
  index,
  onEdit,
  open,
  setOpen,
}) => {
  const [value, setValue] = useState<string>('');
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => setOpen(false));

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleClose() {
    setValue('');
    setOpen(false);
  }

  function handleModify() {
    // sanitize input here if you want
    onEdit(index, value);
    handleClose();
  }

  if (open) {
    return (
      <div
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 400,
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: '0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1)',
          padding: '1rem',
          cursor: 'initial',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
        }}
      >
        <p>Modify image description</p>
        <label htmlFor="slate-gallery-image-description" style={itemStyle}>
          Description:
        </label>
        <input
          id="slate-gallery-image-description"
          value={value}
          type="text"
          style={itemStyle}
          onChange={handleChange}
        />

        <button onClick={handleModify}>Submit</button>
      </div>
    );
  }
  return null;
};

export default EditModal;
