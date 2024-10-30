import React from "react";
import { useDispatch } from "react-redux";

import { LoopIcon } from "@/assets";
import { Toggle } from "@/components/ui/toggle";
import { toggleLoopMode } from "@/features/playlist/playlistActions";

const PlaylistLoopToggle: React.FC<{ isPlaylistLoopEnabled: boolean }> = ({
  isPlaylistLoopEnabled,
}) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    toggleLoopMode(isPlaylistLoopEnabled, dispatch);
  };

  return (
    <Toggle
      aria-label="Loop"
      className="h-12 w-12 rounded-full p-2"
      onClick={handleToggle}
    >
      <LoopIcon size={16} />
    </Toggle>
  );
};

export default PlaylistLoopToggle;
