import type { CSSProperties } from 'react';

import type { RenderControlsParams } from './types';

const root: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  marginTop: 8,
  marginRight: 8,

  display: 'flex',
  gap: 4,
};

export const Controls = ({
  index,
  onOpenEditModal,
  onRemove,
}: RenderControlsParams) => {
  return (
    <div style={root}>
      <button
        title="Edit image description"
        onClick={(event) => {
          onOpenEditModal(event, index);
        }}
      >
        &#x270e;
      </button>
      <button title="Remove image" onClick={(event) => onRemove(event, index)}>
        &#xd7;
      </button>
    </div>
  );
};
