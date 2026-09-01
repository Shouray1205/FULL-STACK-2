import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  updatePost,
} from "../features/posts/postsSlice";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts
  );

  if (posts.ids.length === 0) {
    return (
      <section className="card">
        <h2>Published Posts</h2>
        <p className="empty">
          No posts have been published yet.
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="section-title">
        <h2>Published Posts</h2>

        <span>
          {posts.ids.length} post
          {posts.ids.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="post-list">
        {posts.ids.map((id) => {
          const post = posts.entities[id];

          return (
            <article
              className="post-item"
              key={post.id}
            >
              <div>
                <p>{post.content}</p>

                <small>
                  Platforms:{" "}
                  {post.platforms.join(", ")}
                </small>
              </div>

              <div className="post-actions">
                <button
                  onClick={() => {
                    const updated =
                      prompt(
                        "Update post:",
                        post.content
                      );

                    if (
                      updated &&
                      updated.trim()
                    ) {
                      dispatch(
                        updatePost({
                          id: post.id,
                          content: updated,
                        })
                      );
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() =>
                    dispatch(
                      deletePost(post.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PostList;