import { PayloadAction } from "@reduxjs/toolkit";

import type { Playlist, Track } from "@/types/mediaTypes";

export const addTrack = (state: Playlist, action: PayloadAction<Track>) => {
  state.tracks.push(action.payload);
};

export const resetPlaylist = (state: Playlist) => {
  state.tracks = [];
  state.currentTrackIndex = 0;
};

export const setTracks = (state: Playlist, action: PayloadAction<Track[]>) => {
  state.tracks = action.payload;
};

export const setPlayingStatus = (
  state: Playlist,
  action: PayloadAction<boolean>,
) => {
  state.isPlaylistPlaying = action.payload;
};

export const setLoopStatus = (
  state: Playlist,
  action: PayloadAction<boolean>,
) => {
  state.isPlaylistLoopEnabled = action.payload;
};

export const setShuffleStatus = (
  state: Playlist,
  action: PayloadAction<boolean>,
) => {
  state.isShuffleActive = action.payload;
};

export const setAutoPlayStatus = (
  state: Playlist,
  action: PayloadAction<boolean>,
) => {
  state.isAutoPlayEnabled = action.payload;
};

// Track's Reducers
export const removeTrack = (state: Playlist, action: PayloadAction<string>) => {
  const trackIndex = state.tracks.findIndex(
    (track) => track.id === action.payload,
  );
  state.tracks = state.tracks.filter((track) => track.id !== action.payload);

  if (trackIndex === state.currentTrackIndex) {
    state.currentTrackIndex = Math.min(
      state.currentTrackIndex,
      state.tracks.length - 1,
    );
  }
};

export const updateTrack = (state: Playlist, action: PayloadAction<Track>) => {
  const trackIndex = state.tracks.findIndex(
    (track) => track.id === action.payload.id,
  );
  if (trackIndex !== -1) {
    state.tracks[trackIndex] = action.payload;
  }
};
