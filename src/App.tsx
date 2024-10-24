import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import DropZone from "@/components/drop-zone";
import AddTracks from "@/components/add-tracks";

function App() {
  const isPlaylistPlaying = useSelector(
    (state: RootState) => state.isPlaylistPlaying,
  );

  return (
    <DropZone>
      {!isPlaylistPlaying && (
        <div className="flex h-full w-full items-center justify-center">
          <AddTracks />
        </div>
      )}
    </DropZone>
  );
}

export default App;
