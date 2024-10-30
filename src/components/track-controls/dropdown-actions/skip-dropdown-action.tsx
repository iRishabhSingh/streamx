import React from "react";
import { useDispatch } from "react-redux";

import { SkipIcon } from "@/assets";
import type { Track } from "@/types/mediaTypes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toggleSkipStatus } from "@/features/playlist/helpers/trackHelpers";

const SkipDropdownAction: React.FC<{ track: Track }> = ({ track }) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenuItem
      onClick={() => toggleSkipStatus(track, dispatch)}
      className="flex items-center gap-4 rounded"
      aria-label={track.shouldBeSkipped ? "Don't skip" : "Skip track"}
    >
      <SkipIcon
        variant={track.shouldBeSkipped ? "filled" : "outlined"}
        size={20}
      />
      <span>{track.shouldBeSkipped ? "Don't skip" : "Skip track"}</span>
    </DropdownMenuItem>
  );
};

export default SkipDropdownAction;
