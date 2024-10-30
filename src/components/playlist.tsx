import {
  useSensor,
  useSensors,
  DndContext,
  TouchSensor,
  DragOverlay,
  DragEndEvent,
  PointerSensor,
  DragStartEvent,
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

import type {
  Track as TrackProp,
  Playlist as PlaylistProp,
} from "@/types/mediaTypes";
import Track from "@/components/track";
import { setTracks } from "@/features/playlist/playlistSlice";
import AutoPlaySwitch from "@/components/playlist-controls/auto-play-switch";
import PlaylistLoopToggle from "@/components/playlist-controls/playlist-loop-toggle";
import ClearPlaylistButton from "@/components/playlist-controls/clear-playlist-button";
import PlaylistShuffleToggle from "@/components/playlist-controls/playlist-shuffle-toggle";

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
          <div className="flex flex-wrap items-center justify-between gap-y-2 rounded-t-lg border-b bg-neutral-200 px-4 py-2 text-start dark:bg-neutral-900">
            <span className="w-full px-2 text-center font-medium sm:w-auto sm:text-start">
              Playlist
            </span>
            <div className="flex w-full items-center justify-center gap-4 px-2 sm:w-auto sm:justify-end">
              <AutoPlaySwitch isAutoPlayEnabled={isAutoPlayEnabled} />
              <PlaylistLoopToggle
                isPlaylistLoopEnabled={isPlaylistLoopEnabled}
              />
              <PlaylistShuffleToggle isShuffleActive={isShuffleActive} />
              <ClearPlaylistButton />
            </div>
          </div>
          <div className="mx-4 mb-4 max-h-[40vh] overflow-scroll">
            {tracks.map((track) => (
              <Track key={track.id} track={track} />
            ))}
          </div>
        </div>
      </SortableContext>
      <DragOverlay>
        {activeTrack ? <Track track={activeTrack} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Playlist;
