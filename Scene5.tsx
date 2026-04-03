import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, SAFE } from "../constants";

const PARTICLE_COUNT = 14;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: 80 + (i * 67) % 920,
  size: 18 + (i * 13) % 40,
  speed: 0.4 + (i * 0.11) % 0.6,
  phase: (i * 47) % 100,
  color: i % 3 === 0 ? COLORS.accent : i % 3 === 1 ? COLORS.success : COLORS.accentLight,
  opacity: 0.12 + (i * 0.037) % 0.22,
}));

const MAP_NODES = [
  // Luzon
  { x: 540, y: 380, delay: 20 },
  { x: 480, y: 440, delay: 35 },
  { x: 600, y: 420, delay: 50 },
  { x: 520, y: 500, delay: 65 },
  { x: 460, y: 350, delay: 80 },
  // Visayas
  { x: 400, y: 720, delay: 100 },
  { x: 500, y: 700, delay: 115 },
  { x: 580, y: 740, delay: 130 },
  { x: 450, y: 780, delay: 145 },
  { x: 620, y: 700, delay: 160 },
  // Mindanao
  { x: 420, y: 1000, delay: 180 },
  { x: 520, y: 980, delay: 195 },
  { x: 600, y: 1020, delay: 210 },
  { x: 480, y: 1060, delay: 225 },
  { x: 560, y: 1080, delay: 240 },
];

export const Scene5: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  const sceneOpacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main title spring
  const titleSpring = spring({
    frame: f - 30,
    fps,
    config: { damping: 180, stiffness: 80 },
    durationInFrames: 50,
  });

  // Glow pulse
  const glowPulse = 0.6 + 0.4 * Math.sin((f / 45) * Math.PI);

  // CTA fade
  const ctaOpacity = interpolate(f, [180, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Map nodes light up
  // Final tagline
  const taglineSpring = spring({
    frame: f - 260,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
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
      {/* Floating particles background */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {PARTICLES.map((p) => {
          const yOffset = ((f * p.speed + p.phase * 8) % 2100) - 100;
          const xWobble = Math.sin((f / 80 + p.phase) * Math.PI) * 30;
          return (
            <circle
              key={p.id}
              cx={p.x + xWobble}
              cy={1920 - yOffset}
              r={p.size}
              fill={p.color}
              opacity={p.opacity}
            />
          );
        })}
      </svg>

      {/* Radial gradient glow behind title */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentDim}${Math.round(glowPulse * 80).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
        }}
      />

      {/* Philippine map silhouette with lighting nodes */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Simplified outline */}
        <ellipse cx="520" cy="450" rx="120" ry="200" fill="none" stroke={COLORS.accentDim} strokeWidth="1" opacity="0.25" />
        <ellipse cx="500" cy="750" rx="160" ry="120" fill="none" stroke={COLORS.accentDim} strokeWidth="1" opacity="0.2" />
        <ellipse cx="510" cy="1020" rx="180" ry="150" fill="none" stroke={COLORS.accentDim} strokeWidth="1" opacity="0.2" />

        {/* Connection lines between nodes */}
        {MAP_NODES.slice(0, -1).map((node, i) => {
          if (i % 4 !== 0) return null;
          const next = MAP_NODES[i + 1];
          const lineOpacity = interpolate(
            f,
            [node.delay + 20, node.delay + 50],
            [0, 0.3],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <line
              key={i}
              x1={node.x} y1={node.y}
              x2={next.x} y2={next.y}
              stroke={COLORS.accent}
              strokeWidth="1"
              opacity={lineOpacity}
            />
          );
        })}

        {/* Node circles */}
        {MAP_NODES.map((node, i) => {
          const nodeOpacity = interpolate(
            f,
            [node.delay, node.delay + 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const pulse2 = 1 + 0.3 * Math.sin(((f + node.delay * 3) / 40) * Math.PI);
          return (
            <g key={i} opacity={nodeOpacity}>
              <circle cx={node.x} cy={node.y} r={14 * pulse2} fill={COLORS.accent} opacity={0.15} />
              <circle cx={node.x} cy={node.y} r={7} fill={COLORS.accent} opacity={0.9} />
            </g>
          );
        })}
      </svg>

      {/* Main headline */}
      <div
        style={{
          position: "absolute",
          top: SAFE.top + 40,
          left: SAFE.side,
          right: SAFE.side,
          textAlign: "center",
          transform: `scale(${0.5 + titleSpring * 0.5})`,
          opacity: titleSpring,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.success})`,
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 50,
            boxShadow: `0 0 60px ${COLORS.accent}88`,
          }}
        >
          🤝
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: -2,
            lineHeight: 1,
            textShadow: `0 0 40px ${COLORS.accent}88`,
          }}
        >
          NEIGHBOR
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.success})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          WATCH
        </div>
      </div>

      {/* How to join - 3 steps */}
      <div
        style={{
          position: "absolute",
          top: 820,
          left: SAFE.side,
          right: SAFE.side,
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            fontSize: FONT.subheadline,
            fontWeight: 700,
            color: COLORS.white,
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          Your barangay. Your platform.
        </div>

        {[
          { icon: "🏛️", title: "Officials onboard in minutes", sub: "No technical expertise needed" },
          { icon: "📱", title: "Residents join via phone number", sub: "No app. No email. Just connect." },
          { icon: "💪", title: "Community stays prepared", sub: "Before, during, and after disasters" },
        ].map((item, i) => {
          const itemSpring = spring({
            frame: f - 200 - i * 20,
            fps,
            config: { damping: 200 },
            durationInFrames: 40,
          });
          const itemOpacity = interpolate(f, [200 + i * 20, 230 + i * 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginBottom: 24,
                opacity: itemOpacity,
                transform: `translateX(${(1 - itemSpring) * 50}px)`,
                background: COLORS.card,
                borderRadius: 20,
                padding: "22px 28px",
                border: `1px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 44, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: FONT.body, fontWeight: 700, color: COLORS.white }}>
                  {item.title}
                </div>
                <div style={{ fontSize: FONT.label, color: COLORS.muted, marginTop: 4 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final tagline */}
      <div
        style={{
          position: "absolute",
          bottom: SAFE.bottom + 40,
          left: SAFE.side,
          right: SAFE.side,
          textAlign: "center",
          opacity: taglineSpring,
          transform: `translateY(${(1 - taglineSpring) * 30}px)`,
        }}
      >
        <div
          style={{
            fontSize: FONT.subheadline,
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.4,
          }}
        >
          When the next typhoon comes —
        </div>
        <div
          style={{
            fontSize: FONT.subheadline,
            fontWeight: 800,
            color: COLORS.success,
            lineHeight: 1.4,
          }}
        >
          your community will be ready.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: FONT.label,
            color: COLORS.muted,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Built for barangays · Powered by community
        </div>
      </div>
    </div>
  );
};
