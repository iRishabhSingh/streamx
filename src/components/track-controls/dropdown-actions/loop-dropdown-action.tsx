import React from "react";
import { useDispatch } from "react-redux";

import { LoopIcon } from "@/assets";
import type { Track } from "@/types/mediaTypes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toggleLoopActive } from "@/features/playlist/helpers/trackHelpers";

const LoopDropdownAction: React.FC<{ track: Track }> = ({ track }) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() => toggleLoopActive(track, dispatch)}
      className="flex items-center gap-4 rounded md:hidden"
      aria-label={track.isLoopActive ? "Disable Loop" : "Loop"}
    >
      <LoopIcon size={20} />
      <span>{track.isLoopActive ? "Disable Loop" : "Loop"}</span>
    </DropdownMenuItem>
  );
};

export default LoopDropdownAction;
