import platforms from "../data/platforms";

function PlatformSelector({ selectedPlatforms, setSelectedPlatforms }) {
  const handleChange = (id) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((platform) => platform !== id)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  return (
    <div className="card">
      <h2>Select Platforms</h2>

      <div className="platform-grid">
        {platforms.map((platform) => (
          <label key={platform.id} className="platform-item">
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform.id)}
              onChange={() => handleChange(platform.id)}
            />

            <span>{platform.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PlatformSelector;