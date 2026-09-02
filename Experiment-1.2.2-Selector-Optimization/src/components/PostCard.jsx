import React from "react";
import { useDispatch } from "react-redux";

import {
  deletePost,
  togglePostStatus,
} from "../features/posts/postsSlice";

function PostCard({ post }) {
  const dispatch = useDispatch();

  console.log("PostCard rendered:", post.id);

  return (
    <article className="post-card">
      <div className="post-top">
        <span className="platform">
          {post.platform}
        </span>

        <span
          className={
            post.status === "Published"
              ? "status published"
              : "status draft"
          }
        >
          {post.status}
        </span>
      </div>

      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <div className="post-meta">
        <span>Category: {post.category}</span>
        <span>❤️ {post.likes}</span>
      </div>

      <div className="post-actions">
        <button
          onClick={() =>
            dispatch(togglePostStatus(post.id))
          }
        >
          {post.status === "Published"
            ? "Move to Draft"
            : "Publish"}
        </button>

        <button
          className="delete-button"
          onClick={() => dispatch(deletePost(post.id))}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default React.memo(PostCard);