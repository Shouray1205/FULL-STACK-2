function ValidationMessage({
  content,
  selectedPlatforms,
}) {
  const trimmedContent = content.trim();

  let message = "Write something to publish.";
  let type = "warning";

  if (selectedPlatforms.length === 0) {
    message = "Select at least one platform.";
    type = "error";
  } else if (trimmedContent.length === 0) {
    message = "Post content cannot be empty.";
    type = "warning";
  } else if (trimmedContent.length > 280) {
    message = "Post exceeds the 280 character limit.";
    type = "error";
  } else {
    message = "Post is valid and ready to publish.";
    type = "success";
  }

  return (
    <div className={`validation ${type}`}>
      <span>
        {type === "success"
          ? "✓"
          : type === "error"
          ? "!"
          : "⚠"}
      </span>

      <div>
        <strong>
          {type === "success"
            ? "Validation Success"
            : type === "error"
            ? "Validation Error"
            : "Validation"}
        </strong>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default ValidationMessage;