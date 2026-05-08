# Luminal Threads

A WebGL harmonic resonance visualizer. 3000 particles trace invisible Lissajous curves and standing wave interference patterns, creating luminous thread-art that shifts as you interact. The mouse acts as a gravitational perturbation — drag to bend the field, watch threads twist into new harmonics.

```
    ╭──────────────────────────────╮
    │   LUMINAL THREADS            │
    │   ═══════════════════       │
    │   3000 particles             │
    │   Lissajous harmonics        │
    │   Mouse-reactive field       │
    │   60 fps · WebGL             │
    ╰──────────────────────────────╯
```

## Features

- **3000 particle threads** — each follows a parametric Lissajous curve (`A·sin(f₁t+φ) × ſ + B·cos(f₂t+ψ) × ĵ`) with randomized phase offsets
- **5 harmonic modes** — keys `1` through `5` switch between frequency pairs: 1:2, 2:3, 3:4, 3:5, 4:5
- **Mouse gravity well** — hover to bend the field, particles within 200px get pulled toward cursor
- **Click burst** — clicking emits a radial impulse that scatters nearby particles, then they reform
- **Velocity-to-color** — slow particles glow cyan, fast particles bloom hot rose/violet
- **40-frame trails** — each particle stores its last 40 positions as fading alpha-blended line segments
- **CRT scanline overlay** — subtle 4px scanline at 5% opacity for that retro-cosmic feel
- **Real-time HUD** — FPS, particle count, and current harmonic mode label

## Controls

| Key | Action |
|-----|--------|
| `Mouse move` | Attract/repel field — particles within 200px get nudged toward cursor |
| `Click` | Burst — radial impulse scatters nearby particles, decays over 1.5s |
| `Space` | Pause/resume time |
| `C` | Clear all trails |
| `1`–`5` | Switch harmonic series (f₁, f₂ frequency multipliers) |

## Tech Stack

- **Single HTML file** — no build step, everything inline
- **Three.js r128** via CDN for WebGL points + line segments
- **Custom GLSL shaders** — soft dot glow, additive blending
- **BufferGeometry** with Float32Arrays for trail/position/color updates

## Architecture

```
Particles (N=3000)
  ├─ position (x, y)
  ├─ velocity (vx, vy)
  ├─ phase offsets (φ, ψ)
  ├─ trail buffer (Float32Array[40×2])
  └─ target Lissajous position per frame

Rendering
  ├─ LineSegments (trails) — 120k vertices, vertex colors
  ├─ Points (heads) — custom shader, velocity-mapped hue
  └─ Background stars — 400 points, parallax 4-layer depth

Physics per frame
  1. Compute target Lissajous position
  2. Apply mouse gravity well force
  3. Apply burst radial impulse (if active)
  4. Spring toward target (k=0.04)
  5. Velocity damping (0.92)
  6. Integrate position
  7. Append to trail buffer (circular)
```

## License

MIT