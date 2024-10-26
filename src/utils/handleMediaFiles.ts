import type { Track } from "@/types/mediaTypes";
import { addTrack } from "@/features/playlist/playlistSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit/react";

// Helper to determine media type (audio or video)
const getMediaElementType = (fileType: string) =>
  fileType.startsWith("video") ? "video" : "audio";

// Handle file uploads and extract metadata
export const handleValidMediaFiles = async (
  files: File[],
  dispatch: Dispatch<UnknownAction>,
) => {
  if (!files || files.length === 0) return; // Early return for empty files

  files.forEach((file) => {
    const fileUrl = URL.createObjectURL(file);
    const mediaType = getMediaElementType(file.type);
    const mediaElement = document.createElement(mediaType); // Create video or audio element

    mediaElement.src = fileUrl;

    // Event listener to extract metadata once it's available
    mediaElement.addEventListener("loadedmetadata", () => {
      const track: Track = {
        id: fileUrl.substring(fileUrl.lastIndexOf("/") + 1),
        name: file.name.substring(0, file.name.lastIndexOf(".")),
        url: fileUrl,
        mediaCategory: mediaType,
        fileFormat: file.name.substring(file.name.lastIndexOf(".") + 1),
        fileSizeInBytes: file.size,
        durationInSeconds: mediaElement.duration,
        dateAddedToPlaylist: new Date().toISOString(),
        isCurrentlyPlaying: false,
        isFavorite: false,
        isLoopActive: false,
        shouldBeSkipped: false,
        hasBeenPlayedBefore: false,
      };

      // Dispatch track to playlist
      dispatch(addTrack(track));
    });

    // Load media to trigger 'loadedmetadata' event
    mediaElement.load();
  });
};
