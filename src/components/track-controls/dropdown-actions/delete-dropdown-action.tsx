import React from "react";
import { useDispatch } from "react-redux";

import { RemoveIcon } from "@/assets";
import type { Track } from "@/types/mediaTypes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteTrack } from "@/features/playlist/helpers/trackHelpers";

const DeleteDropdownAction: React.FC<{
  track: Track;
  onDelete: () => void;
}> = ({ track, onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (track.isFavorite) return onDelete();
    deleteTrack(track.id, dispatch);
  };

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      aria-label="Delete track"
      className="flex items-center gap-4 rounded text-red-600 dark:text-red-400"
    >
      <RemoveIcon />
      <span>Delete Track</span>
    </DropdownMenuItem>
  );
};

export default DeleteDropdownAction;
