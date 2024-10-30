import React from "react";
import { useDispatch } from "react-redux";

import { RemoveIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { clearPlaylistTracks } from "@/features/playlist/playlistActions";

const ClearPlaylistButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleClear = () => {
    clearPlaylistTracks(dispatch);
  };

  return (
    <Button
      variant="ghost"
      aria-label="Clear Playlist"
      onClick={handleClear}
      className="flex h-12 w-12 items-center justify-center rounded-full p-2 text-red-600 hover:bg-red-400/20 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-600/20 dark:hover:text-red-400"
    >
      <RemoveIcon size={16} />
    </Button>
  );
};

export default ClearPlaylistButton;
