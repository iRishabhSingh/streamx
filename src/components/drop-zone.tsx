import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { UploadIcon } from "@/assets";
import { handleValidMediaFiles } from "@/utils/handleMediaFiles";

const DropZone: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Helper to validate file types (audio or video)
  const isValidMediaFile = (file: File) =>
    file.type.startsWith("audio") || file.type.startsWith("video");

  // Handle when files are dragged over the drop zone
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle when files are dragged out of the drop zone
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Handle file drop event and pass valid media files
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    const validMediaFiles = files.filter(isValidMediaFile);

    if (validMediaFiles.length)
      handleValidMediaFiles(validMediaFiles, dispatch);
  };

  return (
    <div
      className="relative h-screen w-screen"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="z-20 h-full w-full">{children}</div>

      {isDragging && (
        <div className="absolute left-0 top-0 z-40 flex h-full w-full flex-col items-center justify-center text-center backdrop-blur-lg">
          <div className="relative">
            {/* Main Upload Icon Box */}
            <div
              className={cn(
                "relative z-40 flex h-32 w-[8rem] flex-col items-center justify-center rounded-md bg-white text-neutral-600 dark:bg-neutral-900",
                "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                "-translate-y-5 translate-x-5 transform opacity-90 transition-transform duration-700 ease-out",
              )}
            >
              <UploadIcon size={20} />
              <span className="mt-2 text-sm">Drop it</span>
            </div>

            {/* Border and Dashed Outline */}
            <div className="absolute inset-0 z-30 flex h-32 w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-100 transition-opacity duration-700 ease-in" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
