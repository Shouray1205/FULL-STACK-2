import { useSelector } from "react-redux";

import PostCard from "./PostCard";

import {
  selectFilteredPosts,
} from "../features/posts/postsSelectors";

function PostList() {
  const posts = useSelector(selectFilteredPosts);

  return (
    <section className="posts-section">
      <div className="section-heading">
        <div>
          <h2>Posts</h2>

          <p>
            Showing {posts.length} derived result
            {posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <span className="memoized-label">
          Memoized Selector
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <h3>No posts found</h3>
          <p>
            Try changing the platform or status filter.
          </p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default PostList;