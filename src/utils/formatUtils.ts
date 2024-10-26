// Utility function to truncate track name
export const truncateTrackName = (name: string): string => {
  return name.length > 30 ? name.substring(0, 17) + "..." : name;
};
