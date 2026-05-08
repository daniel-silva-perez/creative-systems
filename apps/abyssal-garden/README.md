# Abyssal Garden

Generative bioluminescent deep ocean visualization. L-system coral structures sway in phantom currents, schools of fish move as responsive organisms, jellyfish drift overhead, and 800 firefly particles fill the water with drifting light. Click anywhere to attract fish toward that point; hover near organisms to illuminate them.

```
    ╭──────────────────────────────────────────╮
    │  ≋≋≋ ABYSSAL GARDEN ≋≋≋                │
    │  Deep ocean bioluminescence              │
    │                                          │
    │  5 coral species (L-system)              │
    │  3 fish schools (boids, 60-100 each)     │
    │  5 jellyfish (pulsing bell + tentacles)  │
    │  800 firefly particles                   │
    │  Caustic light shader on seafloor         │
    │  Auto-orbiting camera                    │
    ╰──────────────────────────────────────────╯
```

## Features

### Scene Elements

- **5 L-system coral species** — Fan Coral, Tube Coral, Branch Coral, Seaweed, Brain Coral; each grown via parametric L-system rules, cluster spawning with main + 4 satellite structures
- **Growth animation** — coral scales from 0 to target over ~12 seconds on load
- **Sway vertex shader** — phantom current via `sin(time * swaySpeed + position.y * 1.5)` applied to coral geometry
- **3 fish schools** — boids with separation/alignment/cohesion, each 60–100 fish; fish within 22 units of a click attract toward that point for 5 seconds
- **5 jellyfish** — pulsing bell (scale oscillates), trailing tentacles (10-segment sinusoidal wave), vertical sinusoidal drift, random horizontal drift
- **800 firefly particles** — individual phase offsets, additive blending, drift with sinusoidal per-axis movement
- **Caustic seafloor shader** — FBM noise driving animated light patterns in deep blue-green palette
- **Exponential fog** — `FogExp2(0x020510, 0.012)` for depth absorption

### Visual Style

- Deep void: `#020510`
- Bioluminescent palette: cyan `#00ffcc`, violet `#8855ff`, gold `#ffcc44`
- UnrealBloomPass (strength=1.4, radius=0.5, threshold=0.75)
- Additive blending on all luminescent elements

### Camera

- Slow auto-orbit: `camera.position.x = sin(angle) * 28`, `camera.position.z = cos(angle) * 28`
- Vertical bob: `8 + sin(t * 0.15) * 3`
- Always looks at `(0, 3, 0)`

## Controls

| Input | Effect |
|-------|--------|
| `Click` | Attract nearby fish toward click point for 5s |
| `Mouse move` | Illuminate nearby organisms (optional glow boost) |

## Tech Stack

- **Three.js r160** via importmap (ES modules CDN)
- **Custom GLSL shaders** — caustic seafloor, coral sway, rim glow
- **EffectComposer** — UnrealBloomPass post-processing
- **Single HTML file** — no build step, ~760 lines

## Architecture

```
Scene
  ├─ Seafloor (PlaneGeometry + caustic ShaderMaterial)
  ├─ Coral clusters (L-system → merged BufferGeometry + sway ShaderMaterial)
  ├─ Fish schools (Boid class × 60-100 per school)
  ├─ Jellyfish (bell + tentacle Line geometry)
  ├─ Fireflies (Points + BufferGeometry, 800 particles)
  ├─ AmbientLight + DirectionalLight + PointLight
  └─ FogExp2

Animation loop
  1. Update seafloor caustic shader uniforms
  2. Orbit camera
  3. Update coral growth + sway uniforms
  4. Flock fish (boids) with mouse attraction check
  5. Update jellyfish (bell pulse + tentacle wave)
  6. Drift fireflies
  7. Render via EffectComposer
```

## License

MIT