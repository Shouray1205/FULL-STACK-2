function DraftEditor({
  content,
  setContent,
  saveDraft,
  isEditing,
  loading,
}) {
  return (
    <div className="card">
      <h2>Write Draft</h2>

      <textarea
        className="draft-textarea"
        placeholder="Write your draft here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="save-btn"
        onClick={saveDraft}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : isEditing
          ? "Update Draft"
          : "Save Draft"}
      </button>
    </div>
  );
}

export default DraftEditor;