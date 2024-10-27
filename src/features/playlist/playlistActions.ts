import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import {
  removeTrack,
  updateTrack,
  resetPlaylist,
  setAutoPlayStatus,
  setLoopStatus,
  setPlayingStatus,
  setShuffleStatus,
} from "@/features/playlist/playlistSlice";
import { Track } from "@/types/mediaTypes";

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

// Track Controls
export const toggleTrackField = (
  track: Track,
  field: keyof Track,
  dispatch: Dispatch<UnknownAction>,
) => {
  const updatedTrack = { ...track, [field]: !track[field] };
  dispatch(updateTrack(updatedTrack));
};

export const removeTrackById = (
  trackId: string,
  dispatch: Dispatch<UnknownAction>,
) => {
  dispatch(removeTrack(trackId));
};
