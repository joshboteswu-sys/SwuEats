import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../constants";

const useCountUp = (start: number, end: number, from: number, to: number) => {
  const frame = useCurrentFrame();
  return Math.round(
    interpolate(frame, [start, end], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
};

const FlowStep: React.FC<{
  label: string;
  color: string;
  icon: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}> = ({ label, color, icon, x, y, opacity, scale }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      textAlign: "center",
    }}
  >
    <div
      style={{
        width: 90,
        height: 90,
        borderRadius: 20,
        background: `${color}22`,
        border: `2px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        margin: "0 auto 10px",
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 24, fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>
      {label}
    </div>
  </div>
);

export const Scene4: React.FC<{ startFrame: number }> = ({ startFrame }) => {
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

  // Divider line animation
  const dividerH = interpolate(f, [40, 120], [0, 900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Count-up stats
  const responseTime = useCountUp(200, 360, 0, 3);
  const redundancy = useCountUp(200, 360, 0, 80);

  // Before-side chaos arrows
  const beforeOpacity = interpolate(f, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // After-side flow
  const afterFlowSteps = [
    { label: "Request", icon: "📝", delay: 140 },
    { label: "Matched", icon: "🔗", delay: 180 },
    { label: "Deliver", icon: "🚚", delay: 220 },
    { label: "Done ✓", icon: "✅", delay: 260 },
  ];

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
      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 30,
          left: SAFE.side,
          right: SAFE.side,
          opacity: headlineSpring,
          transform: `translateY(${(1 - headlineSpring) * -40}px)`,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: FONT.headline, fontWeight: 800, color: COLORS.white, lineHeight: 1.15 }}>
          Less waste.{" "}
          <span style={{ color: COLORS.success }}>Less chaos.</span>
        </div>
        <div style={{ fontSize: FONT.headline, fontWeight: 800, color: COLORS.success, lineHeight: 1.15 }}>
          More lives reached.
        </div>
      </div>

      {/* BEFORE label */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: SAFE.side,
          fontSize: FONT.subheadline,
          fontWeight: 800,
          color: COLORS.danger,
          opacity: beforeOpacity,
          letterSpacing: 2,
        }}
      >
        BEFORE
      </div>

      {/* AFTER label */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: "50%",
          paddingLeft: 40,
          fontSize: FONT.subheadline,
          fontWeight: 800,
          color: COLORS.success,
          opacity: interpolate(f, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          letterSpacing: 2,
        }}
      >
        AFTER
      </div>

      {/* Vertical divider line */}
      <svg
        style={{ position: "absolute", top: 360, left: 530 }}
        width="20"
        height={dividerH}
      >
        <line
          x1="10"
          y1="0"
          x2="10"
          y2={dividerH}
          stroke="white"
          strokeWidth="2"
          opacity="0.3"
        />
      </svg>

      {/* BEFORE side - chaos */}
      <div
        style={{
          position: "absolute",
          top: 450,
          left: SAFE.side,
          width: 460,
          height: 800,
          opacity: beforeOpacity,
        }}
      >
        {/* Chaotic arrows SVG */}
        <svg width="460" height="500" viewBox="0 0 460 500">
          {/* Overlapping random arrows */}
          {[
            { x1: 50, y1: 80, x2: 300, y2: 200, color: COLORS.danger },
            { x1: 400, y1: 60, x2: 100, y2: 250, color: COLORS.danger },
            { x1: 80, y1: 300, x2: 380, y2: 150, color: "#f97316" },
            { x1: 200, y1: 400, x2: 60, y2: 100, color: COLORS.danger },
            { x1: 350, y1: 350, x2: 120, y2: 450, color: "#f97316" },
          ].map((arrow, i) => {
            const prog = interpolate(f, [60 + i * 10, 100 + i * 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const dx = arrow.x2 - arrow.x1;
            const dy = arrow.y2 - arrow.y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            return (
              <g key={i}>
                <line
                  x1={arrow.x1}
                  y1={arrow.y1}
                  x2={arrow.x1 + dx * prog}
                  y2={arrow.y1 + dy * prog}
                  stroke={arrow.color}
                  strokeWidth="3"
                  opacity="0.7"
                  strokeDasharray="8 4"
                />
              </g>
            );
          })}
          {/* Question marks */}
          {["?", "?", "?"].map((q, i) => (
            <text
              key={i}
              x={[120, 280, 200][i]}
              y={[180, 320, 420][i]}
              fontSize="48"
              fill={COLORS.danger}
              opacity={beforeOpacity}
              fontWeight="800"
              fontFamily="Inter, sans-serif"
            >
              {q}
            </text>
          ))}
        </svg>

        {/* Before stats */}
        <div style={{ padding: "0 10px" }}>
          {["Overlapping deliveries", "Expired unused goods", "No visibility"].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 18,
                opacity: interpolate(f, [80 + i * 15, 110 + i * 15], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.danger, flexShrink: 0 }} />
              <div style={{ fontSize: FONT.body, color: "#fca5a5" }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AFTER side - clean flow */}
      <div
        style={{
          position: "absolute",
          top: 450,
          left: 570,
          width: 460,
          height: 800,
        }}
      >
        {/* Vertical flow chain */}
        {afterFlowSteps.map((step, i) => {
          const stepSpring = spring({
            frame: f - step.delay,
            fps,
            config: { damping: 180 },
            durationInFrames: 40,
          });
          const stepOpacity = interpolate(f, [step.delay, step.delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const yPos = 30 + i * 130;
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: stepOpacity,
                  transform: `translateX(${(1 - stepSpring) * 40}px)`,
                  marginBottom: i < afterFlowSteps.length - 1 ? 0 : 0,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    background: i === 3 ? `${COLORS.success}33` : `${COLORS.accent}22`,
                    border: `2px solid ${i === 3 ? COLORS.success : COLORS.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    flexShrink: 0,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: FONT.body,
                    fontWeight: 600,
                    color: i === 3 ? COLORS.success : COLORS.white,
                  }}
                >
                  {step.label}
                </div>
              </div>
              {i < afterFlowSteps.length - 1 && (
                <div
                  style={{
                    marginLeft: 35,
                    width: 2,
                    height: 50,
                    background: COLORS.accent,
                    opacity: stepOpacity * 0.5,
                    marginBottom: 0,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Count-up stats */}
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 40,
          left: SAFE.side,
          right: SAFE.side,
          display: "flex",
          gap: 24,
          opacity: interpolate(f, [180, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {[
          { label: "faster response", value: `${responseTime}×`, color: COLORS.success },
          { label: "less redundancy", value: `${redundancy}%`, color: COLORS.accent },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: COLORS.card,
              borderRadius: 20,
              padding: "28px 20px",
              textAlign: "center",
              border: `1px solid ${stat.color}44`,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: stat.color,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: FONT.body, color: COLORS.muted, marginTop: 8 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
