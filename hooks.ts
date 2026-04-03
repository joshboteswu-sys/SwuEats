import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useSpringIn = (
  startFrame: number,
  delay: number = 0,
  damping: number = 200
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - startFrame - delay,
    fps,
    config: { damping, stiffness: 100, mass: 0.5 },
    durationInFrames: 40,
  });
};

export const useFadeIn = (startFrame: number, duration: number = 20) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useFadeOut = (endFrame: number, duration: number = 12) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [endFrame - duration, endFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const useCountUp = (
  startFrame: number,
  endFrame: number,
  from: number,
  to: number
) => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [startFrame, endFrame], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
};

export const useStrokeProgress = (startFrame: number, durationFrames: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
