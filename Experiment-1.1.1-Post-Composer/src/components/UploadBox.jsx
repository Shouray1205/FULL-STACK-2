import { useState } from "react";

function UploadBox() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="card">
      <h2>Attach Media</h2>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

      {fileName && (
        <p style={{ marginTop: "10px" }}>
          Selected File: <strong>{fileName}</strong>
        </p>
      )}
    </div>
  );
}

export default UploadBox;