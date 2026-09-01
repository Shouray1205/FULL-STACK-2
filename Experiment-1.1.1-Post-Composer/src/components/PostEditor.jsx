function PostEditor({ post, setPost }) {
  return (
    <div className="card">
      <h2>Write Your Post</h2>

      <textarea
        className="post-textarea"
        placeholder="What's happening?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
    </div>
  );
}

export default PostEditor;