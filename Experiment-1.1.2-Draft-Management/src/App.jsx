import { useEffect, useState } from "react";


import Header from "./components/Header";
import DraftEditor from "./components/DraftEditor";
import DraftList from "./components/DraftList";

import "./styles/App.css";

function App() {
  const [content, setContent] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
      useEffect(() => {
      const savedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];
      setDrafts(savedDrafts);
    }, []);

    useEffect(() => {
      localStorage.setItem("drafts", JSON.stringify(drafts));
    }, [drafts]);
const saveDraft = () => {
  if (content.trim() === "") return;

  setLoading(true);

  setTimeout(() => {
    if (editingId !== null) {
      setDrafts(
        drafts.map((draft) =>
          draft.id === editingId
            ? { ...draft, content }
            : draft
        )
      );

      setEditingId(null);
    } else {
      const newDraft = {
        id: Date.now(),
        content,
      };

      setDrafts([...drafts, newDraft]);
    }

    setContent("");
    setLoading(false);
  }, 500);
};

  const editDraft = (draft) => {
    setContent(draft.content);
    setEditingId(draft.id);
  };

  const deleteDraft = (id) => {
    setDrafts(drafts.filter((draft) => draft.id !== id));
  };

  return (
    <div className="container">

      <Header />

        <DraftEditor
      content={content}
      setContent={setContent}
      saveDraft={saveDraft}
      isEditing={editingId !== null}
      loading={loading}
    />

      <DraftList
        drafts={drafts}
        onEdit={editDraft}
        onDelete={deleteDraft}
      />

    </div>
  );
}

export default App;