import {
  InfoIcon,
  LoopIcon,
  SkipIcon,
  HeartIcon,
  RemoveIcon,
  DotsVerticalIcon,
} from "@/assets";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Track } from "@/types/mediaTypes";

const TrackActionsMenu: React.FC<{ track: Track }> = ({ track }) => {
  const { isFavorite, isLoopActive, shouldBeSkipped } = track;

  return (
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
        {/* Like/Unlike Action */}
        <DropdownMenuItem
          className="flex items-center gap-4 rounded md:hidden"
          aria-label={isFavorite ? "Unlike track" : "Like Track"}
        >
          <HeartIcon
            size={20}
            variant={isFavorite ? "filled" : "outlined"}
            fill={isFavorite ? "#FF3040" : "currentColor"}
          />
          <span>{isFavorite ? "Unlike" : "Like"}</span>
        </DropdownMenuItem>

        {/* Loop Action */}
        <DropdownMenuItem
          className="flex items-center gap-4 rounded md:hidden"
          aria-label={isLoopActive ? "Disable Loop" : "Loop"}
        >
          <LoopIcon size={20} />
          <span>{isLoopActive ? "Disable Loop" : "Loop"}</span>
        </DropdownMenuItem>

        {/* Skip Action */}
        <DropdownMenuItem
          className="flex items-center gap-4 rounded"
          aria-label={shouldBeSkipped ? "Don't skip" : "Skip track"}
        >
          <SkipIcon
            variant={shouldBeSkipped ? "filled" : "outlined"}
            size={20}
          />
          <span>{shouldBeSkipped ? "Don't skip" : "Skip track"}</span>
        </DropdownMenuItem>

        {/* More Details Action */}
        <DropdownMenuItem
          aria-label="More details"
          className="flex items-center gap-4 rounded"
        >
          <InfoIcon size={20} />
          <span>More details</span>
        </DropdownMenuItem>

        {/* Delete Track Action */}
        <DropdownMenuItem
          aria-label="Delete track"
          className="flex items-center gap-4 rounded text-red-600 dark:text-red-400"
        >
          <RemoveIcon />
          <span>Delete Track</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TrackActionsMenu;
