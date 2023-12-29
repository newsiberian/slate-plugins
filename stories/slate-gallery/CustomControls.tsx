export function CustomControls({ index, onOpenEditModal, onRemove }) {
  return (
    <div className="custom-controls-root">
      <button
        title="Edit image description"
        className="custom-controls-button"
        onClick={(e) => onOpenEditModal(e, index)}
      >
        Edit
      </button>
      <button
        title="Remove image"
        className="custom-controls-button"
        onClick={(e) => onRemove(e, index)}
      >
        Remove
      </button>
    </div>
  );
}
