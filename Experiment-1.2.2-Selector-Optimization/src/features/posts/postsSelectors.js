import { createSelector } from "@reduxjs/toolkit";

/*
 * Basic selector
 * Gets all posts from Redux state.
 */
export const selectPosts = (state) => state.posts.posts;

/*
 * Basic selectors for filters
 */
export const selectPlatformFilter = (state) =>
  state.posts.selectedPlatform;

export const selectStatusFilter = (state) =>
  state.posts.selectedStatus;

/*
 * Memoized selector
 *
 * This selector calculates the filtered posts.
 *
 * createSelector remembers the previous result and
 * recalculates only when its input values change.
 */
export const selectFilteredPosts = createSelector(
  [selectPosts, selectPlatformFilter, selectStatusFilter],
  (posts, platform, status) => {
    console.log("Memoized selector recalculated");

    return posts.filter((post) => {
      const platformMatch =
        platform === "All" || post.platform === platform;

      const statusMatch =
        status === "All" || post.status === status;

      return platformMatch && statusMatch;
    });
  }
);

/*
 * Memoized selector for published posts.
 */
export const selectPublishedPosts = createSelector(
  [selectPosts],
  (posts) => {
    console.log("Published posts selector recalculated");

    return posts.filter((post) => post.status === "Published");
  }
);

/*
 * Memoized selector for draft posts.
 */
export const selectDraftPosts = createSelector(
  [selectPosts],
  (posts) => {
    console.log("Draft posts selector recalculated");

    return posts.filter((post) => post.status === "Draft");
  }
);

/*
 * Derived statistics.
 */
export const selectPostStatistics = createSelector(
  [selectPosts],
  (posts) => {
    console.log("Statistics selector recalculated");

    const total = posts.length;

    const published = posts.filter(
      (post) => post.status === "Published"
    ).length;

    const drafts = posts.filter(
      (post) => post.status === "Draft"
    ).length;

    const totalLikes = posts.reduce(
      (sum, post) => sum + post.likes,
      0
    );

    return {
      total,
      published,
      drafts,
      totalLikes,
    };
  }
);