import { useSelector } from "react-redux";
import { selectPostStatistics } from "../features/posts/postsSelectors";

function Stats() {
  const statistics = useSelector(selectPostStatistics);

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <span>Total Posts</span>
        <strong>{statistics.total}</strong>
      </div>

      <div className="stat-card">
        <span>Published</span>
        <strong>{statistics.published}</strong>
      </div>

      <div className="stat-card">
        <span>Drafts</span>
        <strong>{statistics.drafts}</strong>
      </div>

      <div className="stat-card">
        <span>Total Likes</span>
        <strong>{statistics.totalLikes}</strong>
      </div>
    </section>
  );
}

export default Stats;