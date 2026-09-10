import { memo, useCallback, useMemo, useState } from "react";

const initialPosts = [
  { id: 1, title: "React Tutorial", status: "Published" },
  { id: 2, title: "AI Project Update", status: "Scheduled" },
  { id: 3, title: "College Event", status: "Draft" },
];

// Memoized component — re-renders only when its props change
const PostCard = memo(function PostCard({ post, onUpdate, onDelete }) {
  return (
    <div className="post-card">
      <div>
        <h3>{post.title}</h3>
        <span className={`status ${post.status.toLowerCase()}`}>
          {post.status}
        </span>
      </div>

      <div className="card-actions">
        <button onClick={() => onUpdate(post.id)}>Update</button>
        <button className="delete" onClick={() => onDelete(post.id)}>
          Delete
        </button>
      </div>
    </div>
  );
});

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);

  // useMemo prevents filtering from being recalculated
  // when unrelated state such as counter changes.
  const filteredPosts = useMemo(() => {
    console.log("Filtering posts...");

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  // useMemo for an expensive derived calculation
  const performanceScore = useMemo(() => {
    let result = 0;

    for (let i = 0; i < 1000000; i++) {
      result += i % 10;
    }

    return result + posts.length;
  }, [posts.length]);

  // useCallback keeps function references stable
  const handleUpdate = useCallback((id) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              status:
                post.status === "Published" ? "Scheduled" : "Published",
            }
          : post
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
  }, []);

  const addPost = () => {
    const title = prompt("Enter post title:");

    if (!title) return;

    setPosts((currentPosts) => [
      ...currentPosts,
      {
        id: Date.now(),
        title,
        status: "Draft",
      },
    ]);
  };

  return (
    <div className="app">
      <header>
        <h1>Performance Optimized Post Manager</h1>
        <p>
          React.memo + useMemo + useCallback + Efficient State Updates
        </p>
      </header>

      <section className="dashboard">
        <div className="stat">
          <h2>{posts.length}</h2>
          <p>Total Posts</p>
        </div>

        <div className="stat">
          <h2>{filteredPosts.length}</h2>
          <p>Visible Posts</p>
        </div>

        <div className="stat">
          <h2>{performanceScore}</h2>
          <p>Memoized Calculation</p>
        </div>

        <div className="stat">
          <h2>{counter}</h2>
          <p>Unrelated Updates</p>
        </div>
      </section>

      <section className="controls">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={addPost}>+ Add Post</button>

        <button onClick={() => setCounter((value) => value + 1)}>
          Trigger Re-render
        </button>
      </section>

      <section className="info">
        <h2>Optimization Techniques</h2>

        <div className="techniques">
          <div>
            <strong>React.memo</strong>
            <p>Prevents unnecessary PostCard re-renders.</p>
          </div>

          <div>
            <strong>useMemo</strong>
            <p>Caches filtered data and expensive calculations.</p>
          </div>

          <div>
            <strong>useCallback</strong>
            <p>Keeps callback references stable between renders.</p>
          </div>

          <div>
            <strong>Efficient State Updates</strong>
            <p>Uses functional state updates to modify only required data.</p>
          </div>
        </div>
      </section>

      <section className="posts">
        <h2>Post List</h2>

        {filteredPosts.length === 0 ? (
          <p className="empty">No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default App;