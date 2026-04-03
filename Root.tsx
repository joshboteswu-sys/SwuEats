import React from "react";
import { Composition } from "remotion";
import { NeighborWatch } from "./NeighborWatch";

// Total: 1044 frames at 30fps = ~34.8 seconds
// Full video: 5400 frames = 3 minutes at 30fps
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="NeighborWatch"
        component={NeighborWatch}
        durationInFrames={5400}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
