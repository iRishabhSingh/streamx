import React from "react";
import { useDispatch } from "react-redux";

import { HeartIcon } from "@/assets";
import type { Track } from "@/types/mediaTypes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toggleFavorite } from "@/features/playlist/helpers/trackHelpers";

const FavoriteDropdownAction: React.FC<{ track: Track }> = ({ track }) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() => toggleFavorite(track, dispatch)}
      className="flex items-center gap-4 rounded md:hidden"
      aria-label={track.isFavorite ? "Unlike track" : "Like Track"}
    >
      <HeartIcon
        size={20}
        variant={track.isFavorite ? "filled" : "outlined"}
        fill={track.isFavorite ? "#FF3040" : "currentColor"}
      />
      <span>{track.isFavorite ? "Unlike" : "Like"}</span>
    </DropdownMenuItem>
  );
};

export default FavoriteDropdownAction;
