import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const FadeTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  transitionFrames?: number;
}> = ({ children, startFrame, endFrame, transitionFrames = 12 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [
      startFrame,
      startFrame + transitionFrames,
      endFrame - transitionFrames,
      endFrame,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const isVisible = frame >= startFrame && frame <= endFrame;

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        opacity,
      }}
    >
      {children}
    </div>
  );
};
