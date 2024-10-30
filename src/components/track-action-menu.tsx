import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import type { Track } from "@/types/mediaTypes";
import ConfirmationPopup from "@/components/confirmation-popup";
import TrackDetailsPopup from "@/components/track-details-popup";
import { deleteTrack } from "@/features/playlist/helpers/trackHelpers";
import LoopDropdownAction from "@/components/track-controls/dropdown-actions/loop-dropdown-action";
import SkipDropdownAction from "@/components/track-controls/dropdown-actions/skip-dropdown-action";
import DeleteDropdownAction from "@/components/track-controls/dropdown-actions/delete-dropdown-action";
import FavoriteDropdownAction from "@/components/track-controls/dropdown-actions/favorite-dropdown-action";
import MoreDetailsDropdownAction from "@/components/track-controls/dropdown-actions/more-details-dropdown-action";

const TrackActionsMenu: React.FC<{ track: Track }> = ({ track }) => {
  const { isFavorite } = track;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTrackLiked, setIsTrackLiked] = useState(isFavorite);

  const dispatch = useDispatch();

  const forceDelete = () => {
    deleteTrack(track.id, dispatch);
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label="Track's Action Menu"
            className="h-9 w-9 rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900"
          >
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 rounded">
          <FavoriteDropdownAction track={track} />
          <LoopDropdownAction track={track} />
          <SkipDropdownAction track={track} />
          <MoreDetailsDropdownAction onClick={() => setIsDialogOpen(true)} />
          <DeleteDropdownAction
            track={track}
            onDelete={() => setIsTrackLiked(true)}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <TrackDetailsPopup
        track={track}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      <ConfirmationPopup
        open={isTrackLiked}
        confirmText="Delete"
        onConfirm={forceDelete}
        onOpenChange={setIsTrackLiked}
        message="Are you sure you want to delete this track you liked?"
      />
    </>
  );
};

export default TrackActionsMenu;
