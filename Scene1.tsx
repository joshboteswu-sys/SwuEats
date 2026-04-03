import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT, SAFE } from "../constants";

const LINES = [
  "December 2021. Typhoon Odette",
  "tears through Visayas — 1.4M displaced.",
  "Relief goods pile up in one barangay",
  "while the next one starves.",
  "The problem isn't generosity.",
  "It's coordination.",
];

const ICONS = [
  { label: "🌾 Rice", x: 180, y: 600, dx: -80, dy: -60 },
  { label: "💧 Water", x: 700, y: 500, dx: 90, dy: -40 },
  { label: "💊 Meds", x: 300, y: 900, dx: -60, dy: 80 },
  { label: "🔦 Light", x: 800, y: 950, dx: 70, dy: 90 },
  { label: "🥫 Food", x: 150, y: 1300, dx: -90, dy: 50 },
  { label: "🧴 Hygiene", x: 780, y: 1200, dx: 80, dy: -70 },
  { label: "🏠 Shelter", x: 450, y: 1100, dx: 30, dy: 100 },
];

export const Scene1: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  // Headline spring
  const headlineSpring = spring({
    frame: f,
    fps,
    config: { damping: 200, stiffness: 80 },
    durationInFrames: 40,
  });

  // Storm spiral rotation
  const rotation = interpolate(f, [0, 540], [0, 720]);

  // Map fade
  const mapOpacity = interpolate(f, [0, 30], [0, 0.18], {
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
      }}
    >
      {/* Background map silhouette */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: mapOpacity }}
      >
        {/* Simplified Philippine archipelago shape */}
        <ellipse cx="540" cy="750" rx="180" ry="320" fill={COLORS.danger} opacity="0.3" />
        <ellipse cx="420" cy="1100" rx="120" ry="200" fill={COLORS.danger} opacity="0.25" />
        <ellipse cx="620" cy="1200" rx="100" ry="180" fill={COLORS.danger} opacity="0.2" />
        <ellipse cx="350" cy="750" rx="60" ry="100" fill={COLORS.danger} opacity="0.15" />
        <ellipse cx="720" cy="900" rx="70" ry="120" fill={COLORS.danger} opacity="0.15" />
      </svg>

      {/* Storm spiral SVG at center */}
      <div
        style={{
          position: "absolute",
          top: 600,
          left: "50%",
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          opacity: interpolate(f, [0, 20, 400, 540], [0, 0.7, 0.7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          {[1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx="200"
              cy="200"
              r={30 + i * 40}
              fill="none"
              stroke={COLORS.danger}
              strokeWidth={4 - i * 0.5}
              strokeDasharray={`${20 + i * 15} ${10 + i * 8}`}
              opacity={0.8 - i * 0.15}
            />
          ))}
          <circle cx="200" cy="200" r="18" fill={COLORS.danger} opacity="0.9" />
          <text x="200" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">
            ODETTE
          </text>
        </svg>
      </div>

      {/* Chaotic floating resource icons */}
      {ICONS.map((icon, i) => {
        const iconSpring = spring({
          frame: f - i * 10,
          fps,
          config: { damping: 60, stiffness: 40 },
          durationInFrames: 60,
        });
        const chaosX = interpolate(f, [0, 540], [0, icon.dx * 3], {
          extrapolateRight: "clamp",
        });
        const chaosY = interpolate(f, [0, 540], [0, icon.dy * 2], {
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(f, [i * 8, i * 8 + 20, 480, 540], [0, 0.9, 0.9, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: icon.x + chaosX,
              top: icon.y + chaosY,
              opacity,
              transform: `scale(${0.3 + iconSpring * 0.7})`,
              background: `${COLORS.dangerDim}cc`,
              border: `2px solid ${COLORS.danger}`,
              borderRadius: 16,
              padding: "10px 18px",
              fontSize: FONT.label,
              color: "white",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {icon.label}
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
          transform: `translateY(${(1 - headlineSpring) * 60}px)`,
          opacity: headlineSpring,
        }}
      >
        <div
          style={{
            fontSize: FONT.headline,
            fontWeight: 800,
            color: COLORS.danger,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          When disaster strikes,
        </div>
        <div
          style={{
            fontSize: FONT.headline,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          help goes to the wrong places.
        </div>
      </div>

      {/* Text lines staggered */}
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 60,
          left: SAFE.side,
          right: SAFE.side,
        }}
      >
        {LINES.map((line, i) => {
          const lineSpring = spring({
            frame: f - 30 - i * 12,
            fps,
            config: { damping: 200 },
            durationInFrames: 30,
          });
          const lineOpacity = interpolate(
            f,
            [30 + i * 12, 30 + i * 12 + 20, 480, 540],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                fontSize: i >= 4 ? FONT.subheadline : FONT.body,
                fontWeight: i >= 4 ? 700 : 400,
                color: i >= 4 ? COLORS.white : "#d1d5db",
                lineHeight: 1.5,
                marginBottom: 6,
                opacity: lineOpacity,
                transform: `translateX(${(1 - lineSpring) * -40}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};
