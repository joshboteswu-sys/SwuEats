# 🤝 Neighbor-Watch Explainer Video

**Community Emergency Resource Sharing System**
Educational explainer video built with [Remotion](https://remotion.dev).

- **Format:** 1080×1920 (vertical/mobile)
- **Duration:** 3 minutes (5400 frames @ 30fps)
- **Scenes:** 5 scenes with spring animations, SVG self-drawing, count-up numbers, particle effects

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Preview in Remotion Studio
```bash
npm start
# Opens http://localhost:3000 — scrub through all 5 scenes live
```

### 3. Render to MP4
```bash
mkdir out
npm run build
# Output: out/neighbor-watch.mp4
```

---

## 🎬 Scene Breakdown

| Scene | Title | Time | Theme |
|-------|-------|------|-------|
| 1 | The Chaos | 0:00–0:18 | Typhoon Odette chaos, displaced icons |
| 2 | The Idea | 0:17–0:35 | Bayanihan network, glowing nodes |
| 3 | The Features | 0:35–0:59 | Dashboard, Registry, Request cards |
| 4 | The Impact | 0:58–1:22 | Before/after split, count-up stats |
| 5 | The Call | 1:22–3:00 | Particles, map lighting, CTA |

---

## 🎨 Design System

- **Background:** `#0a0a0a`
- **Accent:** `#6366f1` (indigo)
- **Success:** `#22c55e` (green)
- **Font:** Inter (400, 600, 800)
- **Safe zone:** 150px top, 170px bottom, 60px sides

---

## 📦 Project Structure

```
src/
├── index.ts           # Remotion entry point
├── Root.tsx           # Composition registration
├── NeighborWatch.tsx  # Main compositor (all 5 scenes)
├── FadeTransition.tsx # Crossfade wrapper
├── constants.ts       # Colors, timing, safe zones
├── hooks.ts           # Animation helpers
└── scenes/
    ├── Scene1.tsx     # The Chaos
    ├── Scene2.tsx     # The Idea
    ├── Scene3.tsx     # The Features
    ├── Scene4.tsx     # The Impact
    └── Scene5.tsx     # The Call
```

---

## 🛠 Requirements

- Node.js 18+
- npm 8+

Remotion installs everything else automatically.
