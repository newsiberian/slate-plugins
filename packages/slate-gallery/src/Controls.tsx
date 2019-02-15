import React from 'react';

interface ControlsProps {
  index: number;
  onEdit: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => (e: React.MouseEvent<HTMLInputElement>) => void;
}

const root = {
  position: 'absolute',
  top: 0,
  right: 0,
  marginTop: 8,
  marginRight: 8,
} as React.CSSProperties;

const Controls: React.FunctionComponent<ControlsProps> = ({
  index,
  onEdit,
  onRemove,
}) => {
  return (
    <div style={root}>
      <button onClick={onEdit(index)} title="Edit image description">
        &#x270e;
      </button>
      <button onClick={onRemove(index)} title="Remove image">
        &#xd7;
      </button>
    </div>
  );
};

export default Controls;
