import React from "react";
import { useDispatch } from "react-redux";

import { Switch } from "@/components/ui/switch";
import { toggleAutoPlay } from "@/features/playlist/playlistActions";

const AutoPlaySwitch: React.FC<{ isAutoPlayEnabled: boolean }> = ({
  isAutoPlayEnabled,
}) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    toggleAutoPlay(isAutoPlayEnabled, dispatch);
  };

  return (
    <div
      role="button"
      aria-label="AutoPlay"
      onClick={handleToggle}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent"
    >
      <Switch
        checked={isAutoPlayEnabled}
        className="h-[1px] w-6 border-none p-0 *:border-[1px] *:border-white data-[state=unchecked]:bg-zinc-500 *:data-[state=checked]:translate-x-2"
      />
    </div>
  );
};

export default AutoPlaySwitch;
