import { useSelector } from "react-redux";

import {
  selectPlatformFilter,
  selectStatusFilter,
} from "../features/posts/postsSelectors";

function PerformancePanel() {
  const platform = useSelector(selectPlatformFilter);
  const status = useSelector(selectStatusFilter);

  return (
    <section className="performance-panel">
      <div className="performance-icon">
        ⚡
      </div>

      <div className="performance-content">
        <h2>Performance Optimization</h2>

        <p>
          This application uses Redux Toolkit's{" "}
          <strong>createSelector</strong> for memoized
          derived state and <strong>React.memo</strong>{" "}
          to reduce unnecessary component rendering.
        </p>

        <div className="optimization-grid">
          <div>
            <span>Selector</span>
            <strong>Memoized</strong>
          </div>

          <div>
            <span>Component</span>
            <strong>React.memo</strong>
          </div>

          <div>
            <span>Current Platform</span>
            <strong>{platform}</strong>
          </div>

          <div>
            <span>Current Status</span>
            <strong>{status}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerformancePanel;