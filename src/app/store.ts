import { configureStore } from "@reduxjs/toolkit";

import playlistReducer from "@/features/playlist/playlistSlice";

export const store = configureStore({
  reducer: playlistReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
