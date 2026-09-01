import platforms from "../data/platforms";

function ValidationPanel({ selectedPlatforms, post }) {
  if (selectedPlatforms.length === 0) {
    return (
      <div className="card">
        <h2>Validation</h2>
        <p>Select at least one platform.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Validation</h2>

      {selectedPlatforms.map((id) => {
        const platform = platforms.find((p) => p.id === id);

        const tooLong =
          platform.limit !== Infinity &&
          post.length > platform.limit;

        const needsHashtag =
          platform.hashtagRequired &&
          !/#\w+/.test(post);

        if (tooLong) {
          return (
            <p key={id} className="error">
              ❌ {platform.name}: Character limit exceeded
            </p>
          );
        }

        if (needsHashtag) {
          return (
            <p key={id} className="warning">
              ⚠️ {platform.name}: Add at least one hashtag
            </p>
          );
        }

        return (
          <p key={id} className="success">
            ✅ {platform.name}: Ready to Publish
          </p>
        );
      })}
    </div>
  );
}

export default ValidationPanel;