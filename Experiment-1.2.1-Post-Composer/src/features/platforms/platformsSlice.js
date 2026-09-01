import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {
    linkedin: {
      id: "linkedin",
      name: "LinkedIn",
      icon: "in",
      maxCharacters: 3000,
    },
    instagram: {
      id: "instagram",
      name: "Instagram",
      icon: "◎",
      maxCharacters: 2200,
    },
    facebook: {
      id: "facebook",
      name: "Facebook",
      icon: "f",
      maxCharacters: 63206,
    },
    x: {
      id: "x",
      name: "X",
      icon: "𝕏",
      maxCharacters: 280,
    },
  },

  ids: ["linkedin", "instagram", "facebook", "x"],

  selectedIds: ["linkedin"],

  status: "idle",
};

const platformsSlice = createSlice({
  name: "platforms",

  initialState,

  reducers: {
    togglePlatform: (state, action) => {
      const platformId = action.payload;

      if (state.selectedIds.includes(platformId)) {
        state.selectedIds = state.selectedIds.filter(
          (id) => id !== platformId
        );
      } else {
        state.selectedIds.push(platformId);
      }
    },

    selectAllPlatforms: (state) => {
      state.selectedIds = [...state.ids];
    },

    clearPlatforms: (state) => {
      state.selectedIds = [];
    },
  },
});

export const {
  togglePlatform,
  selectAllPlatforms,
  clearPlatforms,
} = platformsSlice.actions;

export default platformsSlice.reducer;