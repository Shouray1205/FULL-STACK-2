import platforms from "../data/platforms";

function CharacterCounter({ selectedPlatforms, post }) {
  let limit = Infinity;

  if (selectedPlatforms.length > 0) {
    limit = Math.min(
      ...selectedPlatforms.map(
        (id) => platforms.find((platform) => platform.id === id).limit
      )
    );
  }

  const count = post.length;
  const remaining =
    limit === Infinity ? "Unlimited" : limit - count;

  return (
    <div className="card">
      <h2>Character Counter</h2>

    <p><strong>Characters :</strong> {count}</p>
    <p><strong>Limit :</strong> {limit === Infinity ? "Unlimited" : limit}</p>
    <p><strong>Remaining :</strong> {remaining}</p>
    </div>
  );
}

export default CharacterCounter;