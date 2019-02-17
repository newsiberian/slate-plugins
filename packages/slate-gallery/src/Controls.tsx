import React from 'react';

interface ControlsProps {
  index: number;
  onOpenEditModal: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
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
  onOpenEditModal,
  onRemove,
}) => {
  return (
    <div style={root}>
      <button
        onClick={event => onOpenEditModal(event, index)}
        title="Edit image description"
      >
        &#x270e;
      </button>
      <button onClick={event => onRemove(event, index)} title="Remove image">
        &#xd7;
      </button>
    </div>
  );
};

export default Controls;
