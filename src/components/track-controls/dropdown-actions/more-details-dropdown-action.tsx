import React from "react";
import { InfoIcon } from "@/assets";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const MoreDetailsDropdownAction: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <DropdownMenuItem
    onClick={onClick}
    aria-label="More details"
    className="flex items-center gap-4 rounded"
  >
    <InfoIcon size={20} />
    <span>More details</span>
  </DropdownMenuItem>
);

export default MoreDetailsDropdownAction;
