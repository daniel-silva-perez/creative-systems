# Creative Systems

A consolidated monorepo for Daniel Silva Perez's visual / audio / simulation / browser-art experiments.

This repo turns a scattered set of standalone art repos into one **coherent creative systems portfolio**:
- one catalog
- one gallery landing page
- one place to inspect patterns across rendering, interaction, audio, and play
- original standalone repos still preserved separately for now

## Included apps

- `morphix` — live GLSL playground
- `neon-flock` — boids / murmuration simulator
- `echo-chamber` — spatial audio memory palace
- `abyssal-garden` — bioluminescent generative world
- `flow-state` — audio-reactive visual synthesizer
- `void-walker` — procedural space exploration game
- `luminal-threads` — harmonic resonance visualizer
- `orbital-siege` — orbital defense game
- `sonic-bloom` — particle-based audio visualizer
- `collab-whiteboard` — realtime collaborative drawing surface

## Why this exists

The standalone repos were strong individually but weaker as a portfolio line. Together they tell a sharper story:

- **graphics / rendering taste**
- **interaction design**
- **simulation thinking**
- **audio-reactive systems**
- **browser-native experimentation**

## Structure

```text
apps/
  <project>/
manifest.json       # app metadata used by the root gallery
index.html          # monorepo landing page
styles.css          # shared catalog styling
tools/check_apps.py # verifies expected app directories / entrypoints
```

## Quick start

### Root gallery
```bash
npm run dev
# then open http://localhost:4321
```

### Per-project notes

Most projects are static HTML experiences and can be served directly from the repo root server.

Projects with special runtime needs:
- `apps/collab-whiteboard` — uses a realtime WebSocket server (`server.ts` / `server.js`)
- `apps/flow-state` — uses a tiny Node static server in its standalone form
- `apps/void-walker` — proper Vite app; run inside that directory for hot reload / builds

### Verify inventory
```bash
npm run check:apps
```

## Next cleanup passes

- add screenshot thumbnails for every project card
- create a unified `apps/<name>/meta.json` convention
- normalize package scripts where useful
- decide which original repos should remain public, archive, or redirect here
- optionally split into `games`, `audio-reactive`, `simulation`, and `tools-for-art` sub-lines

## Source preservation

This monorepo currently imports **clean snapshots** of the original repos rather than merging their git histories.
That keeps the portfolio clean and easy to publish now. If wanted, a later pass can preserve history using subtree/filter-repo migration.
