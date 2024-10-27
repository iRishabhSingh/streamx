import { FC, ReactNode } from "react";

import {
  formatDuration,
  formatFileSize,
  truncateTrackName,
  formatRelativeTime,
} from "@/utils/formatUtils";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import type { Track } from "@/types/mediaTypes";
import { AudioIcon, VideoIcon } from "@/assets";
import { useScreenWidth } from "@/hooks/useScreenWidth";

// PopupWrapper Props Type
interface PopupWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDesktop: boolean;
  children: ReactNode;
}

// TrackInfo Props Type (Only used properties from Track)
type TrackInfoProps = Pick<
  Track,
  | "name"
  | "fileFormat"
  | "mediaCategory"
  | "fileSizeInBytes"
  | "durationInSeconds"
  | "dateAddedToPlaylist"
>;

// Main Component Props Type
interface TrackDetailsPopupProps {
  track: Track;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// PopupWrapper Component with Desktop/Mobile Toggle
const PopupWrapper: FC<PopupWrapperProps> = ({
  open,
  children,
  isDesktop,
  onOpenChange,
}) =>
  isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children}
    </Drawer>
  );

// TrackInfo Component for Displaying Track Details
const TrackInfo: FC<TrackInfoProps> = ({
  fileFormat,
  mediaCategory,
  fileSizeInBytes,
  durationInSeconds,
  dateAddedToPlaylist,
}) => (
  <div className="mx-4 flex items-center gap-8 rounded-lg bg-white p-4 shadow-sm dark:bg-neutral-900">
    <div className="rounded-full bg-neutral-200 p-3 dark:bg-neutral-800">
      {mediaCategory === "audio" ? (
        <AudioIcon
          size={80}
          className="text-neutral-900 dark:text-neutral-100"
        />
      ) : (
        <VideoIcon
          size={80}
          className="text-neutral-900 dark:text-neutral-100"
        />
      )}
    </div>
    <div className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400">
      <div className="flex gap-2">
        <span className="font-medium text-neutral-800 dark:text-neutral-300">
          Size:
        </span>
        {formatFileSize(fileSizeInBytes)}
      </div>
      <div className="flex gap-2">
        <span className="font-medium text-neutral-800 dark:text-neutral-300">
          Format:
        </span>
        {fileFormat.toUpperCase()} file
        <span className="rounded-full border border-neutral-700 bg-neutral-200 px-2 text-xs font-semibold text-neutral-800 dark:bg-neutral-600 dark:text-neutral-50">
          {mediaCategory}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-neutral-800 dark:text-neutral-300">Added:</span>
        {formatRelativeTime(new Date(dateAddedToPlaylist))}
        <span className="rounded bg-neutral-200 px-1 text-xs font-semibold text-neutral-800 dark:bg-neutral-600 dark:text-neutral-50">
          {formatDuration(durationInSeconds)}
        </span>
      </div>
    </div>
  </div>
);

// Main TrackDetailsPopup Component
const TrackDetailsPopup: FC<TrackDetailsPopupProps> = ({
  open,
  track,
  onOpenChange,
}) => {
  const isDesktop = useScreenWidth(600);

  return (
    <PopupWrapper open={open} onOpenChange={onOpenChange} isDesktop={isDesktop}>
      {isDesktop ? (
        <DialogContent className="rounded-md p-4 shadow-lg sm:max-w-[425px]">
          <DialogHeader className="mx-4 text-left">
            <DialogTitle className="flex items-center gap-4">
              <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {truncateTrackName(track.name)}
              </span>
            </DialogTitle>
          </DialogHeader>
          <TrackInfo {...track} />
        </DialogContent>
      ) : (
        <DrawerContent className="rounded-md p-4 shadow-lg">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center gap-4">
              <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {truncateTrackName(track.name)}
              </span>
            </DrawerTitle>
          </DrawerHeader>
          <TrackInfo {...track} />
          <DrawerFooter className="flex justify-end pt-4">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      )}
    </PopupWrapper>
  );
};

export default TrackDetailsPopup;