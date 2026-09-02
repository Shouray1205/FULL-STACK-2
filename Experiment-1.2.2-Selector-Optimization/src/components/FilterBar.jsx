import { useDispatch, useSelector } from "react-redux";

import {
  setPlatformFilter,
  setStatusFilter,
} from "../features/posts/postsSlice";

import {
  selectPlatformFilter,
  selectStatusFilter,
} from "../features/posts/postsSelectors";

function FilterBar() {
  const dispatch = useDispatch();

  const selectedPlatform = useSelector(selectPlatformFilter);
  const selectedStatus = useSelector(selectStatusFilter);

  return (
    <section className="filter-section">
      <div>
        <h2>Filter Posts</h2>
        <p>Use Redux selectors to derive the required data.</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Platform</label>

          <select
            value={selectedPlatform}
            onChange={(e) =>
              dispatch(setPlatformFilter(e.target.value))
            }
          >
            <option value="All">All Platforms</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>

          <select
            value={selectedStatus}
            onChange={(e) =>
              dispatch(setStatusFilter(e.target.value))
            }
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;