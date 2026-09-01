import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Mock asynchronous API
export const publishPost = createAsyncThunk(
  "posts/publishPost",
  async (post, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      return {
        ...post,
        status: "published",
        publishedAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue("Failed to publish post");
    }
  }
);

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: (state, action) => {
      const post = action.payload;

      state.entities[post.id] = post;
      state.ids.push(post.id);
    },

    updatePost: (state, action) => {
      const { id, content } = action.payload;

      if (state.entities[id]) {
        state.entities[id].content = content;
      }
    },

    deletePost: (state, action) => {
      const id = action.payload;

      delete state.entities[id];

      state.ids = state.ids.filter(
        (postId) => postId !== id
      );
    },

    clearPosts: (state) => {
      state.entities = {};
      state.ids = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(publishPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(publishPost.fulfilled, (state, action) => {
        state.status = "succeeded";

        const post = action.payload;

        state.entities[post.id] = post;

        if (!state.ids.includes(post.id)) {
          state.ids.push(post.id);
        }
      })

      .addCase(publishPost.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  clearPosts,
} = postsSlice.actions;

export default postsSlice.reducer;