import { motion } from "framer-motion";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { AudioIcon, GridIcon, VideoIcon } from "@/assets";
import { truncateTrackName } from "@/utils/formatUtils";
import type { Track as TrackProp } from "@/types/mediaTypes";
import TrackActionsMenu from "@/components/track-action-menu";
import LoopToggleButton from "@/components/track-controls/loop-toggle-button";
import FavoriteToggleButton from "@/components/track-controls/favorite-toggle-button";

const Track: React.FC<{ track: TrackProp }> = ({
  track,
  track: { name, mediaCategory },
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.article
      style={style}
      {...attributes}
      ref={setNodeRef}
      className="relative mx-auto mt-4 flex w-full items-center rounded-sm bg-neutral-900/10 dark:bg-neutral-400/10"
    >
      {/* Drag Handle */}
      <motion.div
        {...listeners}
        title="Drag to reorder"
        className="cursor-move touch-none rounded-sm p-2 opacity-60 hover:opacity-80"
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
          {/* Favorite Toggle Button */}
          <FavoriteToggleButton track={track} />

          {/* Loop Toggle Button */}
          <LoopToggleButton track={track} />

          {/* Options Menu */}
          <TrackActionsMenu track={track} />
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Track;
