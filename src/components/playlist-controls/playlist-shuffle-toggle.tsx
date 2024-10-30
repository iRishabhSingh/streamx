import React from "react";
import { useDispatch } from "react-redux";

import { ShuffleIcon } from "@/assets";
import { Toggle } from "@/components/ui/toggle";
import { toggleShuffleMode } from "@/features/playlist/playlistActions";

const PlaylistShuffleToggle: React.FC<{ isShuffleActive: boolean }> = ({
  isShuffleActive,
}) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    toggleShuffleMode(isShuffleActive, dispatch);
  };

  return (
    <Toggle
      aria-label="Shuffle"
      className="h-12 w-12 rounded-full p-2"
      onClick={handleToggle}
    >
      <ShuffleIcon size={16} />
    </Toggle>
  );
};

export default PlaylistShuffleToggle;
