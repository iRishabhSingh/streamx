import React from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { LoopIcon, RemoveIcon, ShuffleIcon } from "@/assets";
import type { Playlist as PlaylistProp } from "@/types/mediaTypes";

const Playlist: React.FC<{ playlist: PlaylistProp }> = ({ playlist }) => {
  const { tracks, isAutoPlayEnabled } = playlist;

  return (
    <div className="rounded-lg border">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 rounded-t-lg border-b bg-neutral-200 px-4 py-2 text-start dark:bg-neutral-900">
        <span className="w-full px-2 text-center font-medium sm:w-auto sm:text-start">
          Playlist
        </span>

        <div className="flex w-full items-center justify-center gap-4 px-2 sm:w-auto sm:justify-end">
          {/* AutoPlay Switch */}
          <Button
            variant="ghost"
            aria-label="AutoPlay"
            className="h-12 w-12 rounded-full bg-transparent px-2"
          >
            <Switch
              checked={isAutoPlayEnabled}
              className="h-[1px] w-6 border-none p-0 *:border-[1px] *:border-white data-[state=unchecked]:bg-zinc-500 *:data-[state=checked]:translate-x-2"
            />
          </Button>

          {/* Loop Toggle */}
          <Toggle aria-label="Loop" className="h-12 w-12 rounded-full p-2">
            <LoopIcon size={16} />
          </Toggle>

          {/* Shuffle Toggle */}
          <Toggle aria-label="Shuffle" className="h-12 w-12 rounded-full p-2">
            <ShuffleIcon size={16} />
          </Toggle>

          {/* Clear Playlist Button */}
          <Button
            variant="ghost"
            aria-label="Clear Playlist"
            className="flex h-12 w-12 items-center justify-center rounded-full p-2 text-red-600 hover:bg-red-400/20 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-600/20 dark:hover:text-red-400"
          >
            <RemoveIcon size={16} />
          </Button>
        </div>
      </div>

      {/* Track List Section */}
      <div className="mx-4 mb-4 max-h-[40vh] overflow-scroll">
        {tracks.map((track) => (
          <div key={track.id} className="my-2">
            {track.name.length > 20
              ? `${track.name.substring(0, 17)}...`
              : track.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
