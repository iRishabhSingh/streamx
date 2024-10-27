import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import {
  toggleFavorite,
  toggleLoopActive,
} from "@/features/playlist/helpers/trackHelpers";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { truncateTrackName } from "@/utils/formatUtils";
import type { Track as TrackProp } from "@/types/mediaTypes";
import TrackActionsMenu from "@/components/track-action-menu";
import { AudioIcon, GridIcon, HeartIcon, LoopIcon, VideoIcon } from "@/assets";

const Track: React.FC<{ track: TrackProp }> = ({
  track,
  track: { name, isFavorite, mediaCategory },
}) => {
  const dispatch = useDispatch();

  return (
    <motion.article className="relative mx-auto mt-4 flex w-full items-center rounded-sm bg-neutral-900/10 dark:bg-neutral-400/10">
      {/* Drag Handle */}
      <motion.div
        title="Drag to reorder"
        className="cursor-move rounded-sm p-2 opacity-60 hover:opacity-80"
      >
        <GridIcon size={20} />
      </motion.div>

      {/* Track Content */}
      <motion.div className="flex w-full flex-1 items-center justify-between gap-2 rounded-sm border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {/* Track Icon and Name */}
        <div className="flex flex-1 items-center gap-2">
          {/* Media Type Icon */}
          <div className="flex-shrink-0 text-neutral-700 dark:text-neutral-300">
            {mediaCategory === "audio" ? <AudioIcon /> : <VideoIcon />}
          </div>

          {/* Track Details */}
          <div className="flex-1 text-start text-sm font-medium text-neutral-800 dark:text-neutral-200">
            <p className="relative w-16 overflow-hidden text-ellipsis text-nowrap after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:rounded-r-sm after:bg-gradient-to-l after:from-black/50 after:to-transparent after:content-[''] sm:w-auto sm:after:hidden">
              {truncateTrackName(name)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-shrink-0 items-center gap-3">
          {/* Favorite toggle Button */}
          <Button
            variant="ghost"
            aria-label="Toggle Favorite"
            onClick={() => toggleFavorite(track, dispatch)}
            className="hidden h-9 w-9 rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 md:flex"
          >
            <HeartIcon
              variant={isFavorite ? "filled" : "outlined"}
              fill={isFavorite ? "#FF3040" : "currentColor"}
            />
          </Button>

          {/* Loop toggle Button */}
          <Toggle
            aria-label="Loop"
            onClick={() => toggleLoopActive(track, dispatch)}
            className="hidden h-9 w-9 rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 md:flex"
          >
            <LoopIcon size={16} />
          </Toggle>

          {/* Options Menu */}
          <TrackActionsMenu track={track} />
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Track;
