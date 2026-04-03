// Design tokens
export const COLORS = {
  bg: "#0a0a0a",
  white: "#ffffff",
  accent: "#6366f1",
  accentLight: "#818cf8",
  accentDim: "#312e81",
  success: "#22c55e",
  successDim: "#14532d",
  danger: "#ef4444",
  dangerDim: "#7f1d1d",
  warning: "#f59e0b",
  muted: "#6b7280",
  card: "#111827",
  cardBorder: "#1f2937",
};

// Safe zone
export const SAFE = {
  top: 150,
  bottom: 170,
  side: 60,
};

// Font sizes
export const FONT = {
  headline: 64,
  subheadline: 44,
  body: 36,
  label: 28,
};

// Transition duration in frames
export const TRANSITION_FRAMES = 12;

// Scene durations (frames at 30fps)
export const SCENE_DURATIONS = {
  scene1: 540, // 18s
  scene2: 540, // 18s
  scene3: 720, // 24s
  scene4: 720, // 24s
  scene5: 900, // 30s (with outro hold)
};

export const SCENE_STARTS = {
  scene1: 0,
  scene2: 540,
  scene3: 1080,
  scene4: 1800,
  scene5: 2520,
};
