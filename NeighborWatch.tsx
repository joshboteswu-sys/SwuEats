import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, SCENE_STARTS, SCENE_DURATIONS } from "./constants";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { FadeTransition } from "./FadeTransition";

// Scene timing (with 12-frame overlap for crossfade)
const OVERLAP = 12;

const S1_START = 0;
const S1_END = S1_START + SCENE_DURATIONS.scene1; // 540

const S2_START = S1_END - OVERLAP; // 528
const S2_END = S2_START + SCENE_DURATIONS.scene2; // 1068

const S3_START = S2_END - OVERLAP; // 1056
const S3_END = S3_START + SCENE_DURATIONS.scene3; // 1776

const S4_START = S3_END - OVERLAP; // 1764
const S4_END = S4_START + SCENE_DURATIONS.scene4; // 2484

const S5_START = S4_END - OVERLAP; // 2472
const S5_END = S5_START + SCENE_DURATIONS.scene5; // 3372 (~5400 target, pad with hold)

export const NeighborWatch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Scene 1: The Chaos — 0:00 → 0:18 */}
      <FadeTransition startFrame={S1_START} endFrame={S1_END}>
        <Scene1 startFrame={S1_START} />
      </FadeTransition>

      {/* Scene 2: The Idea — 0:17.6 → 0:35.6 */}
      <FadeTransition startFrame={S2_START} endFrame={S2_END}>
        <Scene2 startFrame={S2_START} />
      </FadeTransition>

      {/* Scene 3: The Features — 0:35.2 → 0:59.2 */}
      <FadeTransition startFrame={S3_START} endFrame={S3_END}>
        <Scene3 startFrame={S3_START} />
      </FadeTransition>

      {/* Scene 4: The Impact — 0:58.8 → 1:22.8 */}
      <FadeTransition startFrame={S4_START} endFrame={S4_END}>
        <Scene4 startFrame={S4_START} />
      </FadeTransition>

      {/* Scene 5: The Call — 1:22.4 → 3:00 */}
      <FadeTransition startFrame={S5_START} endFrame={5400}>
        <Scene5 startFrame={S5_START} />
      </FadeTransition>
    </AbsoluteFill>
  );
};
