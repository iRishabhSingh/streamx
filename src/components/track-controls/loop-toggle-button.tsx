import { useDispatch } from "react-redux";

import { LoopIcon } from "@/assets";
import { Toggle } from "@/components/ui/toggle";
import { Track as TrackProp } from "@/types/mediaTypes";
import { toggleLoopActive } from "@/features/playlist/helpers/trackHelpers";

const LoopToggleButton: React.FC<{ track: TrackProp }> = ({ track }) => {
  const dispatch = useDispatch();

  return (
    <Toggle
      aria-label="Loop"
      onClick={() => toggleLoopActive(track, dispatch)}
      className="hidden h-9 w-9 rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 md:flex"
    >
      <LoopIcon size={16} />
    </Toggle>
  );
};

export default LoopToggleButton;
