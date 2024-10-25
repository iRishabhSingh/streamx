import { useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { RootState } from "@/app/store";
import { PlusIcon, UploadIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { handleValidMediaFiles } from "@/utils/handleMediaFiles";

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

  // Access tracks from the Redux state
  const tracks = useSelector((state: RootState) => state.tracks);

  // Handle file input change, filter valid audio/video files, and dispatch an action
  const handleFileChange = (newFiles: File[]): void => {
    const validFiles = newFiles.filter(
      (file: File): boolean =>
        file.type.startsWith("audio") || file.type.startsWith("video"),
    );
    handleValidMediaFiles(validFiles, dispatch);
  };

  // Handle the click event to trigger file input
  const handleClick = () => fileInputRef.current?.click();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        onClick={() => !tracks.length && handleClick()}
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
          className="hidden"
          ref={fileInputRef}
          id="file-upload-handle"
          accept="audio/*,video/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleFileChange(Array.from(event.target.files || []))
          }
        />

        {/* Content for uploading area */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 mt-2 font-sans text-sm font-normal text-neutral-400 dark:text-neutral-400">
            Drag or drop your files here or click to upload
          </p>

          {/* File upload icon and animation */}
          <div className="relative mx-auto mt-10 w-full max-w-xl">
            {/* Display tracks from the playlist if they exist */}
            {tracks.length > 0 &&
              tracks.map((track) => (
                <div key={track.id} className="my-2">
                  {track.name.length > 20
                    ? `${track.name.substring(0, 17)}...`
                    : track.name}
                </div>
              ))}

            {/* Action buttons when tracks exist */}
            {tracks.length > 0 && (
              <div className="mt-4 flex items-center justify-end gap-4">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                  onClick={handleClick}
                >
                  <PlusIcon />
                </Button>
                <Button>Continue</Button>
              </div>
            )}

            {/* Animated file upload icon */}
            {!tracks.length && (
              <>
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white text-neutral-600 group-hover/file:shadow-2xl dark:bg-neutral-900",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                  )}
                >
                  <UploadIcon size={16} />
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddTracks;
