import { createSlice } from "@reduxjs/toolkit";

import type { Playlist } from "@/types/mediaTypes";
import * as reducers from "@/features/playlist/playlistReducers";

const initialState: Playlist = {
  tracks: [],
  currentTrackIndex: 0,
  isPlaylistPlaying: false,
  isPlaylistLoopEnabled: false,
  isShuffleActive: false,
  volumeLevel: 0.5,
  isAudioMuted: false,
  isAutoPlayEnabled: true,
  hasPlayedAllTracks: false,
  playbackSpeed: 1,
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers,
});

export const {
  addTrack,
  resetPlaylist,
  setTracks,
  setPlayingStatus,
  setLoopStatus,
  setShuffleStatus,
  setAutoPlayStatus,
} = playlistSlice.actions;

export default playlistSlice.reducer;
