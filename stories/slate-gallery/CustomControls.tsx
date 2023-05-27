export function CustomControls({ index, onOpenEditModal, onRemove }) {
  return (
    <div className="custom-controls-root">
      <button
        className="custom-controls-button"
        onClick={(e) => onOpenEditModal(e, index)}
        title="Edit image description"
      >
        Edit
      </button>
      <button
        className="custom-controls-button"
        onClick={(e) => onRemove(e, index)}
        title="Remove image"
      >
        Remove
      </button>
    </div>
  );
}
