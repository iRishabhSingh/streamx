import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { FC } from "react";

const ConfirmationPopup: FC<{
  open: boolean;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}> = ({ open, message, confirmText, onConfirm, onOpenChange }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>Confirmation</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-end justify-end gap-4">
          <AlertDialogCancel className="w-fit">Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-fit" onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationPopup;
