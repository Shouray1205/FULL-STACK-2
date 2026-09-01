import { useDispatch, useSelector } from "react-redux";
import {
  togglePlatform,
  selectAllPlatforms,
  clearPlatforms,
} from "../features/platforms/platformsSlice";

function PlatformSelector() {
  const dispatch = useDispatch();

  const platforms = useSelector(
    (state) => state.platforms
  );

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>Select Platforms</h2>
          <p>
            Choose where you want to publish your post.
          </p>
        </div>

        <div className="platform-actions">
          <button
            onClick={() =>
              dispatch(selectAllPlatforms())
            }
          >
            Select All
          </button>

          <button
            onClick={() =>
              dispatch(clearPlatforms())
            }
          >
            Clear
          </button>
        </div>
      </div>

      <div className="platform-grid">
        {platforms.ids.map((id) => {
          const platform = platforms.entities[id];

          const selected =
            platforms.selectedIds.includes(id);

          return (
            <button
              key={id}
              className={`platform ${
                selected ? "selected" : ""
              }`}
              onClick={() =>
                dispatch(togglePlatform(id))
              }
            >
              <span className="platform-icon">
                {platform.icon}
              </span>

              <span>{platform.name}</span>

              {selected && (
                <span className="check">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default PlatformSelector;