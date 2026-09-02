import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Learning React and Redux Toolkit",
      content:
        "Understanding centralized state management makes React applications easier to maintain.",
      platform: "LinkedIn",
      status: "Published",
      category: "Technology",
      likes: 125,
    },
    {
      id: 2,
      title: "My React Journey",
      content:
        "Today I learned about selectors, memoization and performance optimization.",
      platform: "Instagram",
      status: "Published",
      category: "Education",
      likes: 89,
    },
    {
      id: 3,
      title: "Redux Selectors Explained",
      content:
        "Memoized selectors help prevent unnecessary calculations in large applications.",
      platform: "LinkedIn",
      status: "Draft",
      category: "Technology",
      likes: 0,
    },
    {
      id: 4,
      title: "Frontend Development Tips",
      content:
        "Using React.memo and useMemo can improve rendering performance when used correctly.",
      platform: "Facebook",
      status: "Published",
      category: "Development",
      likes: 210,
    },
    {
      id: 5,
      title: "Building Scalable Applications",
      content:
        "Good state architecture is important for building scalable frontend applications.",
      platform: "Instagram",
      status: "Draft",
      category: "Development",
      likes: 0,
    },
    {
      id: 6,
      title: "JavaScript Performance",
      content:
        "Memoization is a useful technique for avoiding repeated expensive computations.",
      platform: "LinkedIn",
      status: "Published",
      category: "Education",
      likes: 176,
    },
  ],

  selectedPlatform: "All",
  selectedStatus: "All",

  selectorComputations: 0,
};

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    setPlatformFilter: (state, action) => {
      state.selectedPlatform = action.payload;
    },

    setStatusFilter: (state, action) => {
      state.selectedStatus = action.payload;
    },

    addPost: (state, action) => {
      state.posts.push({
        id: Date.now(),
        ...action.payload,
        likes: 0,
      });
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    togglePostStatus: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.status =
          post.status === "Published" ? "Draft" : "Published";
      }
    },

    incrementSelectorComputations: (state) => {
      state.selectorComputations += 1;
    },
  },
});

export const {
  setPlatformFilter,
  setStatusFilter,
  addPost,
  deletePost,
  togglePostStatus,
  incrementSelectorComputations,
} = postsSlice.actions;

export default postsSlice.reducer;