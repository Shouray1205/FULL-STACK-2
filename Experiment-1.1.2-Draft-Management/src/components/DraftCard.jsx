function DraftCard({ draft, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>Draft #{draft.id}</h3>

      <p>{draft.content}</p>

      <button className="edit-btn" onClick={() => onEdit(draft)}>
        Edit
      </button>

      <button className="delete-btn" onClick={() => onDelete(draft.id)}>
        Delete
      </button>
    </div>
  );
}

export default DraftCard;