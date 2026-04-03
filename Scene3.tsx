import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../constants";

const FEATURES = [
  {
    icon: "🗺️",
    title: "Barangay Dashboard",
    desc: "Live view of all requests, donations & alerts for officials.",
    color: COLORS.accent,
    barHeights: [40, 65, 35, 80, 55, 70, 45],
  },
  {
    icon: "📦",
    title: "Resource Registry",
    desc: "Residents list what they have — or urgently need.",
    color: COLORS.success,
    items: ["🌾 Rice (50kg)", "💧 Water (20L)", "💊 Paracetamol"],
  },
  {
    icon: "🔔",
    title: "Request & Respond",
    desc: "Needs matched to resources automatically. Both parties notified.",
    color: COLORS.warning,
    steps: ["Request posted", "Match found", "Confirmed ✓"],
  },
];

const BarChart: React.FC<{ heights: number[]; color: string; progress: number }> = ({
  heights,
  color,
  progress,
}) => (
  <svg width="220" height="70" viewBox="0 0 220 70">
    {heights.map((h, i) => (
      <rect
        key={i}
        x={i * 32}
        y={70 - h * progress}
        width={24}
        height={h * progress}
        rx={4}
        fill={color}
        opacity={0.8}
      />
    ))}
  </svg>
);

export const Scene3: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  const headlineSpring = spring({
    frame: f,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  const sceneOpacity = interpolate(f, [0, 15, 680, 720], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: COLORS.bg,
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        opacity: sceneOpacity,
      }}
    >
      {/* Subtle grid bg */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.04 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="1080" y2={i * 100} stroke="white" strokeWidth="1" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="1920" stroke="white" strokeWidth="1" />
        ))}
      </svg>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 40,
          left: SAFE.side,
          right: SAFE.side,
          opacity: headlineSpring,
          transform: `translateY(${(1 - headlineSpring) * -40}px)`,
        }}
      >
        <div style={{ fontSize: FONT.label, fontWeight: 600, color: COLORS.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Three Tools
        </div>
        <div style={{ fontSize: FONT.headline, fontWeight: 800, color: COLORS.white, lineHeight: 1.15 }}>
          Total clarity.
        </div>
      </div>

      {/* Feature Cards */}
      {FEATURES.map((feat, i) => {
        const cardDelay = 60 + i * 90;
        const cardSpring = spring({
          frame: f - cardDelay,
          fps,
          config: { damping: 180, stiffness: 80 },
          durationInFrames: 50,
        });
        const cardOpacity = interpolate(f, [cardDelay, cardDelay + 25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // SVG stroke draw progress for card border
        const strokeProgress = interpolate(
          f,
          [cardDelay + 10, cardDelay + 60],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const barProgress = interpolate(
          f,
          [cardDelay + 30, cardDelay + 80],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const cardTop = SAFE.top + 230 + i * 420;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: cardTop,
              left: SAFE.side,
              right: SAFE.side,
              opacity: cardOpacity,
              transform: `translateY(${(1 - cardSpring) * 80}px)`,
            }}
          >
            {/* Card background */}
            <div
              style={{
                background: COLORS.card,
                borderRadius: 24,
                padding: 36,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Animated border */}
              <svg
                style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
                width="960"
                height="380"
                viewBox="0 0 960 380"
              >
                <rect
                  x="1"
                  y="1"
                  width="958"
                  height="378"
                  rx="23"
                  fill="none"
                  stroke={feat.color}
                  strokeWidth="2"
                  strokeDasharray="2600"
                  strokeDashoffset={2600 * (1 - strokeProgress)}
                />
              </svg>

              {/* Left color bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  background: feat.color,
                  borderRadius: "24px 0 0 24px",
                }}
              />

              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 52, lineHeight: 1 }}>{feat.icon}</div>
                <div>
                  <div style={{ fontSize: FONT.subheadline, fontWeight: 700, color: COLORS.white }}>
                    {feat.title}
                  </div>
                  <div style={{ fontSize: FONT.body, color: COLORS.muted, marginTop: 4 }}>
                    {feat.desc}
                  </div>
                </div>
              </div>

              {/* Feature-specific visual */}
              {i === 0 && feat.barHeights && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 0, paddingTop: 16 }}>
                  <BarChart
                    heights={feat.barHeights}
                    color={feat.color}
                    progress={barProgress}
                  />
                  <div style={{ marginLeft: 24, fontSize: FONT.label, color: COLORS.muted }}>
                    <div style={{ color: feat.color, fontWeight: 700, fontSize: FONT.body }}>
                      Live Activity
                    </div>
                    <div>Reports · Donations</div>
                    <div>Alerts · Requests</div>
                  </div>
                </div>
              )}

              {i === 1 && feat.items && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
                  {feat.items.map((item, ii) => {
                    const itemOpacity = interpolate(
                      f,
                      [cardDelay + 50 + ii * 15, cardDelay + 70 + ii * 15],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    return (
                      <div
                        key={ii}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          opacity: itemOpacity,
                          background: `${feat.color}22`,
                          padding: "12px 20px",
                          borderRadius: 12,
                          fontSize: FONT.body,
                          color: COLORS.white,
                          fontWeight: 500,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: feat.color,
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}

              {i === 2 && feat.steps && (
                <div style={{ display: "flex", alignItems: "center", gap: 0, paddingTop: 12 }}>
                  {feat.steps.map((step, si) => {
                    const stepOpacity = interpolate(
                      f,
                      [cardDelay + 50 + si * 25, cardDelay + 75 + si * 25],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    return (
                      <React.Fragment key={si}>
                        <div
                          style={{
                            opacity: stepOpacity,
                            textAlign: "center",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              width: 52,
                              height: 52,
                              borderRadius: "50%",
                              background: si === 2 ? feat.color : COLORS.cardBorder,
                              border: `2px solid ${feat.color}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 10px",
                              fontSize: 22,
                              fontWeight: 800,
                              color: COLORS.white,
                            }}
                          >
                            {si + 1}
                          </div>
                          <div style={{ fontSize: FONT.label, color: COLORS.white, fontWeight: 600 }}>
                            {step}
                          </div>
                        </div>
                        {si < feat.steps!.length - 1 && (
                          <div style={{ width: 40, height: 2, background: feat.color, opacity: 0.5, flexShrink: 0 }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Bottom tag */}
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 20,
          left: SAFE.side,
          right: SAFE.side,
          textAlign: "center",
          opacity: interpolate(f, [300, 330], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          fontSize: FONT.label,
          color: COLORS.muted,
        }}
      >
        Works offline-first — syncs when connection returns
      </div>
    </div>
  );
};
