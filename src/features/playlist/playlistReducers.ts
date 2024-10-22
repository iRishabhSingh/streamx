import { PayloadAction } from "@reduxjs/toolkit";

import type { Playlist, Track } from "@/types/mediaTypes";

export const addTrack = (state: Playlist, action: PayloadAction<Track>) => {
  state.tracks.push(action.payload);
};
