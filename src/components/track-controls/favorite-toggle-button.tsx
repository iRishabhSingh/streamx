import { useDispatch } from "react-redux";

import { HeartIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Track as TrackProp } from "@/types/mediaTypes";
import { toggleFavorite } from "@/features/playlist/helpers/trackHelpers";

const FavoriteToggleButton: React.FC<{ track: TrackProp }> = ({ track }) => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="ghost"
      aria-label="Toggle Favorite"
      onClick={() => toggleFavorite(track, dispatch)}
      className="hidden h-9 w-9 rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 md:flex"
    >
      <HeartIcon
        variant={track.isFavorite ? "filled" : "outlined"}
        fill={track.isFavorite ? "#FF3040" : "currentColor"}
      />
    </Button>
  );
};

export default FavoriteToggleButton;
