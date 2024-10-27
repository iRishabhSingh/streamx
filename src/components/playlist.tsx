import {
  useSensor,
  useSensors,
  DndContext,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  toggleAutoPlay,
  toggleLoopMode,
  toggleShuffleMode,
  clearPlaylistTracks,
} from "@/features/playlist/playlistActions";

import type {
  Track as TrackProp,
  Playlist as PlaylistProp,
} from "@/types/mediaTypes";
import Track from "@/components/track";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { LoopIcon, RemoveIcon, ShuffleIcon } from "@/assets";
import { setTracks } from "@/features/playlist/playlistSlice";

const Playlist: React.FC<{ playlist: PlaylistProp }> = ({
  playlist: {
    tracks,
    isShuffleActive,
    isAutoPlayEnabled,
    isPlaylistLoopEnabled,
  },
}) => {
  const [activeTrack, setActiveTrack] = useState<TrackProp | null>(null);

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedTrack = tracks.find((track) => track.id === active.id);
    setActiveTrack(draggedTrack ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTrack(null);

    if (active.id === over?.id) return;

    const oldIndex = tracks.findIndex((track) => track.id === active.id);
    const newIndex = tracks.findIndex((track) => track.id === over?.id);

    const updatedTracks = arrayMove(tracks, oldIndex, newIndex);
    dispatch(setTracks(updatedTracks));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext items={tracks} strategy={verticalListSortingStrategy}>
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
                onClick={() => toggleAutoPlay(isAutoPlayEnabled, dispatch)}
                className="h-12 w-12 rounded-full bg-transparent px-2"
              >
                <Switch
                  checked={isAutoPlayEnabled}
                  className="h-[1px] w-6 border-none p-0 *:border-[1px] *:border-white data-[state=unchecked]:bg-zinc-500 *:data-[state=checked]:translate-x-2"
                />
              </Button>

              {/* Loop Toggle */}
              <Toggle
                aria-label="Loop"
                className="h-12 w-12 rounded-full p-2"
                onClick={() => toggleLoopMode(isPlaylistLoopEnabled, dispatch)}
              >
                <LoopIcon size={16} />
              </Toggle>

              {/* Shuffle Toggle */}
              <Toggle
                aria-label="Shuffle"
                className="h-12 w-12 rounded-full p-2"
                onClick={() => toggleShuffleMode(isShuffleActive, dispatch)}
              >
                <ShuffleIcon size={16} />
              </Toggle>

              {/* Clear Playlist Button */}
              <Button
                variant="ghost"
                aria-label="Clear Playlist"
                onClick={() => clearPlaylistTracks(dispatch)}
                className="flex h-12 w-12 items-center justify-center rounded-full p-2 text-red-600 hover:bg-red-400/20 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-600/20 dark:hover:text-red-400"
              >
                <RemoveIcon size={16} />
              </Button>
            </div>
          </div>

          {/* Track List Section */}
          <div className="mx-4 mb-4 max-h-[40vh] overflow-scroll">
            {tracks.map((track) => (
              <Track key={track.id} track={track} />
            ))}
          </div>
        </div>
      </SortableContext>

      {/* DragOverlay to display the dragged item outside the scrollable area */}
      <DragOverlay>
        {activeTrack ? <Track track={activeTrack} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Playlist;
