import React from "react";
import { IconProps } from "@/types/iconProps";

const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  fill = "none",
  strokeWidth = 2,
  stroke = "currentColor",
  ...props
}) => (
  <svg
    fill={fill}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M6 12H12M12 12H18M12 12V18M12 12V6"
    />
  </svg>
);

export default PlusIcon;
