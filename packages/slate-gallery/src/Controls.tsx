import React from 'react';

interface ControlsProps {
  onEdit?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onRemove?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const root = {
  position: 'absolute',
  top: 0,
  right: 0,
  marginTop: 8,
  marginRight: 8,
} as React.CSSProperties;

const Controls: React.FunctionComponent<ControlsProps> = ({
  onEdit,
  onRemove,
}) => {
  return (
    <div style={root}>
      <button onClick={onEdit} title="Edit image description">
        &#x270e;
      </button>
      <button onClick={onRemove} title="Remove image">
        &#xd7;
      </button>
    </div>
  );
};

export default Controls;
