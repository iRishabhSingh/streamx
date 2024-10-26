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
