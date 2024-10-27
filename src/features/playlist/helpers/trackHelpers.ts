import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import {
  removeTrackById,
  toggleTrackField,
} from "@/features/playlist/playlistActions";
import type { Track } from "@/types/mediaTypes";

export const toggleFavorite = (
  track: Track,
  dispatch: Dispatch<UnknownAction>,
) => {
  toggleTrackField(track, "isFavorite", dispatch);
};

export const toggleLoopActive = (
  track: Track,
  dispatch: Dispatch<UnknownAction>,
) => {
  toggleTrackField(track, "isLoopActive", dispatch);
};

export const toggleSkipStatus = (
  track: Track,
  dispatch: Dispatch<UnknownAction>,
) => {
  toggleTrackField(track, "shouldBeSkipped", dispatch);
};

export const deleteTrack = (
  trackId: string,
  dispatch: Dispatch<UnknownAction>,
) => {
  removeTrackById(trackId, dispatch);
};
