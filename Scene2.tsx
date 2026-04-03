import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../constants";

const NODES = [
  { x: 540, y: 960, label: "BARANGAY\nHALL", isPrimary: true },
  { x: 200, y: 700, label: "Residents" },
  { x: 880, y: 700, label: "Officials" },
  { x: 150, y: 1100, label: "Resources" },
  { x: 930, y: 1100, label: "Requests" },
  { x: 540, y: 650, label: "Real-time\nData" },
  { x: 300, y: 1250, label: "Volunteers" },
  { x: 780, y: 1250, label: "Supplies" },
];

const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
];

export const Scene2: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  const headlineSpring = spring({
    frame: f,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  const sceneOpacity = interpolate(f, [0, 15, 500, 540], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bayanihan text stroke progress
  const bayanihanProgress = interpolate(f, [120, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse animation for center node
  const pulse = interpolate(
    (f % 60) / 60,
    [0, 0.5, 1],
    [1, 1.15, 1]
  );

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
      {/* Gradient background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentDim}44 0%, transparent 70%)`,
        }}
      />

      {/* Network SVG */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Edges */}
        {EDGES.map(([from, to], i) => {
          const edgeProgress = interpolate(f, [30 + i * 8, 70 + i * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fromNode = NODES[from];
          const toNode = NODES[to];
          const totalLength = Math.sqrt(
            Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2)
          );
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={COLORS.accent}
              strokeWidth={2}
              opacity={0.5}
              strokeDasharray={totalLength}
              strokeDashoffset={totalLength * (1 - edgeProgress)}
            />
          );
        })}

        {/* Animated data particles on edges */}
        {EDGES.map(([from, to], i) => {
          const fromNode = NODES[from];
          const toNode = NODES[to];
          const t = ((f + i * 20) % 90) / 90;
          const px = fromNode.x + (toNode.x - fromNode.x) * t;
          const py = fromNode.y + (toNode.y - fromNode.y) * t;
          const particleOpacity = interpolate(f, [60, 80], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <circle
              key={`p${i}`}
              cx={px}
              cy={py}
              r={5}
              fill={COLORS.success}
              opacity={particleOpacity * 0.8}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const nodeSpring = spring({
            frame: f - 20 - i * 10,
            fps,
            config: { damping: 150, stiffness: 100 },
            durationInFrames: 40,
          });
          const nodeOpacity = interpolate(f, [20 + i * 10, 40 + i * 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const r = node.isPrimary ? 70 : 48;
          const scale = node.isPrimary ? pulse * nodeSpring : nodeSpring;

          return (
            <g key={i} opacity={nodeOpacity}>
              {/* Glow ring for primary */}
              {node.isPrimary && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r * 1.4 * pulse}
                  fill="none"
                  stroke={COLORS.accent}
                  strokeWidth={2}
                  opacity={0.3}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={r * scale}
                fill={node.isPrimary ? COLORS.accent : COLORS.card}
                stroke={node.isPrimary ? COLORS.accentLight : COLORS.accent}
                strokeWidth={node.isPrimary ? 3 : 2}
              />
            </g>
          );
        })}
      </svg>

      {/* Node labels */}
      {NODES.map((node, i) => {
        const nodeOpacity = interpolate(f, [30 + i * 10, 55 + i * 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const lines = node.label.split("\n");
        const fontSize = node.isPrimary ? 22 : FONT.label;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              opacity: nodeOpacity,
              pointerEvents: "none",
            }}
          >
            {lines.map((l, li) => (
              <div
                key={li}
                style={{
                  fontSize,
                  fontWeight: node.isPrimary ? 800 : 600,
                  color: COLORS.white,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                }}
              >
                {l}
              </div>
            ))}
          </div>
        );
      })}

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 40,
          left: SAFE.side,
          right: SAFE.side,
          transform: `translateY(${(1 - headlineSpring) * -50}px)`,
          opacity: headlineSpring,
        }}
      >
        <div style={{ fontSize: FONT.headline, fontWeight: 800, color: COLORS.white, lineHeight: 1.15 }}>
          What if your barangay
        </div>
        <div style={{ fontSize: FONT.headline, fontWeight: 800, color: COLORS.accent, lineHeight: 1.15 }}>
          had a nervous system?
        </div>
      </div>

      {/* BAYANIHAN text with draw effect */}
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 40,
          left: SAFE.side,
          right: SAFE.side,
        }}
      >
        <svg width="960" height="100" viewBox="0 0 960 100">
          <defs>
            <linearGradient id="bayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.accent} />
              <stop offset="100%" stopColor={COLORS.success} />
            </linearGradient>
          </defs>
          <text
            x="480"
            y="75"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="72"
            fontWeight="800"
            fill="none"
            stroke="url(#bayGrad)"
            strokeWidth="2"
            strokeDasharray="1200"
            strokeDashoffset={1200 * (1 - bayanihanProgress)}
            letterSpacing="8"
          >
            BAYANIHAN
          </text>
        </svg>
        <div style={{ fontSize: FONT.body, color: COLORS.muted, textAlign: "center", marginTop: 8 }}>
          One dashboard. One barangay. Zero confusion.
        </div>
      </div>
    </div>
  );
};
