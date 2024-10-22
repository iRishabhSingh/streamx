export interface Track {
  id: string; // Unique identifier for the track
  name: string; // Name of the media track
  url: string; // URL to access the media file
  mediaCategory: string; // Type of media, e.g., "audio" or "video"
  fileFormat: string; // Format of the media file, e.g., "mp3" or "mp4"
  fileSizeInBytes: number; // Size of the media file in bytes
  durationInSeconds: number; // Duration of the media track in seconds
  dateAddedToPlaylist: string; // Date when the track was added to the playlist
  isCurrentlyPlaying: boolean; // Whether the media track is currently being played
  isFavorite: boolean; // Whether the media track is marked as a favorite
  isLoopActive: boolean; // Whether loop mode is enabled for this track
  shouldBeSkipped: boolean; // Whether this track should be skipped during playback
  hasBeenPlayedBefore: boolean; // Whether this track has been previously played
}

export interface Playlist {
  tracks: Track[]; // List of media tracks in the playlist
  currentTrackIndex: number; // Index of the currently playing track
  isPlaylistPlaying: boolean; // Whether the playlist is currently playing
  isPlaylistLoopEnabled: boolean; // Whether loop mode is enabled for the entire playlist
  isShuffleActive: boolean; // Whether shuffle mode is enabled
  volumeLevel: number; // Volume level (range: 0.0 to 1.0)
  isAudioMuted: boolean; // Whether the audio output is muted
  isAutoPlayEnabled: boolean; // Indicates if autoplay is enabled for the next track
  hasPlayedAllTracks: boolean; // Whether all tracks in the playlist have been played
  playbackSpeed: number; // Playback speed multiplier (e.g., 1.0 for normal speed)
}
