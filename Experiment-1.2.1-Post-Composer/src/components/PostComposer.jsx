import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  publishPost,
} from "../features/posts/postsSlice";
import ValidationMessage from "./ValidationMessage";

function PostComposer() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  const selectedPlatforms = useSelector(
    (state) => state.platforms.selectedIds
  );

  const postStatus = useSelector(
    (state) => state.posts.status
  );

  const characterCount = content.length;

  const isValid =
    content.trim().length > 0 &&
    content.length <= 280 &&
    selectedPlatforms.length > 0;

  const handlePublish = () => {
    if (!isValid) return;

    const post = {
      id: crypto.randomUUID(),

      content,

      platforms: selectedPlatforms,

      media: media
        ? media.name
        : null,

      status: "draft",

      createdAt: new Date().toISOString(),
    };

    dispatch(publishPost(post));

    setContent("");
    setMedia(null);
  };

  return (
    <section className="card">
      <div className="section-title">
        <h2>Write Your Post</h2>
        <span>
          {characterCount}/280
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="What's on your mind?"
        maxLength={280}
      />

      <div className="character-bar">
        <span>Character Counter</span>

        <strong>
          {characterCount} / 280
        </strong>
      </div>

      <div className="info-box">
        <strong>Hashtags</strong>

        <p>
          Add hashtags such as #React #Redux
          #JavaScript to improve discoverability.
        </p>
      </div>

      <ValidationMessage
        content={content}
        selectedPlatforms={selectedPlatforms}
      />

      <div className="media-section">
        <label htmlFor="media">
          <strong>Attach Media</strong>

          <span>
            {media
              ? media.name
              : "Choose an image or file"}
          </span>
        </label>

        <input
          id="media"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setMedia(e.target.files[0])
          }
        />
      </div>

      <button
        className="publish-button"
        disabled={
          !isValid ||
          postStatus === "loading"
        }
        onClick={handlePublish}
      >
        {postStatus === "loading"
          ? "Publishing..."
          : "Publish Post"}
      </button>
    </section>
  );
}

export default PostComposer;