import { ChangeEvent, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { RootState } from "@/app/store";
import Playlist from "@/components/playlist";
import { PlusIcon, UploadIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { handleValidMediaFiles } from "@/utils/handleMediaFiles";
import { togglePlaylistPlaying } from "@/features/playlist/playlistActions";

// Motion variants for animation
const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const AddTracks = () => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref to trigger file input
  const dispatch = useDispatch();

  // Access playlist from the Redux state
  const tracks = useSelector((state: RootState) => state.tracks);
  const isPlaylistPlaying = useSelector(
    (state: RootState) => state.isPlaylistPlaying,
  );

  // Filter valid audio/video files and dispatch them
  const handleFileChange = (newFiles: File[]): void => {
    const validFiles = newFiles.filter(
      (file) => file.type.startsWith("audio") || file.type.startsWith("video"),
    );
    handleValidMediaFiles(validFiles, dispatch);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleFileChange(Array.from(event.target.files || []));

  const handleFileInputClick = () => fileInputRef.current?.click();

  const handlePlaylistToggle = () =>
    togglePlaylistPlaying(isPlaylistPlaying, dispatch);

  // Render empty state with upload prompt
  const renderEmptyState = () => (
    <>
      <motion.div
        layoutId="file-upload"
        variants={mainVariant}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white text-neutral-600 shadow-[0px_10px_50px_rgba(0,0,0,0.1)] dark:bg-neutral-900",
          "group-hover/file:shadow-2xl",
        )}
      >
        <UploadIcon size={16} />
      </motion.div>

      <motion.div
        variants={secondaryVariant}
        className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
      />
    </>
  );

  // Render playlist view with controls
  const renderPlaylistView = () => (
    <>
      <Playlist />
      <div className="mt-4 flex items-center justify-end gap-4">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleFileInputClick}
          className="rounded-full"
          aria-label="Add another track"
        >
          <PlusIcon />
        </Button>
        <Button
          aria-label="Start playing tracks"
          onClick={handlePlaylistToggle}
        >
          Continue
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        onClick={() => !tracks.length && handleFileInputClick()}
        whileHover="animate"
        className={cn(
          "group/file relative block w-full overflow-hidden rounded-lg p-10",
          !tracks.length && "cursor-pointer",
        )}
      >
        {/* Hidden label for accessibility */}
        <label htmlFor="file-upload-handle" className="hidden">
          Add media
        </label>

        {/* File input field */}
        <input
          multiple
          type="file"
          ref={fileInputRef}
          className="hidden"
          id="file-upload-handle"
          accept="audio/*,video/*"
          onChange={handleInputChange}
        />

        {/* Content for uploading area */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 mt-2 font-sans text-sm font-normal text-neutral-400 dark:text-neutral-400">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative mx-auto mt-10 w-full max-w-xl">
            {tracks.length > 0 ? renderPlaylistView() : renderEmptyState()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTracks;
