import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import {
  resetPlaylist,
  setAutoPlayStatus,
  setLoopStatus,
  setPlayingStatus,
  setShuffleStatus,
} from "@/features/playlist/playlistSlice";

export const togglePlaylistPlaying = (
  isPlaylistPlaying: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(setPlayingStatus(!isPlaylistPlaying));
};

export const toggleLoopMode = (
  isLoopEnabled: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(setLoopStatus(!isLoopEnabled));
};

export const toggleShuffleMode = (
  isShuffleActive: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(setShuffleStatus(!isShuffleActive));
};

export const toggleAutoPlay = (
  isAutoPlayEnabled: boolean,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(setAutoPlayStatus(!isAutoPlayEnabled));
};

export const clearPlaylistTracks = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(resetPlaylist());
};
