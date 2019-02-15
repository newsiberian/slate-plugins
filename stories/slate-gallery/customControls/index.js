import React from 'react';

export default function CustomControls({ index, onEdit, onRemove }) {
  return (
    <div className="custom-controls-root">
      <button className="custom-controls-button" onClick={onEdit(index)} title="Edit image description">
        Edit
      </button>
      <button className="custom-controls-button" onClick={onRemove(index)} title="Remove image">
        Remove
      </button>
    </div>
  );
}
