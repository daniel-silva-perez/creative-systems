# NEON FLOCK

Murmuration boids simulator. 2000 luminous birds move as one liquid organism — a murmuration. Your cursor is the predator: move to scatter them, watch them reform like a liquid aurora. Click to drop food that attracts birds for 30 seconds.

```
    ╭────────────────────────────────────────╮
    │  ≋≋≋ NEON FLOCK ≋≋≋                   │
    │  Murmuration Simulator                │
    │                                        │
    │  2000 boids                           │
    │  2000 trails (8-pos circular buffer)   │
    │  Predator cursor (180px repulsion)     │
    │  Food sources (attract for 30s)          │
    │  Spatial hash grid (50px cells)         │
    │  Velocity → color (cyan→magenta)        │
    ╰────────────────────────────────────────╯
```

## Features

- **2000 boids** — separation (w=1.8, radius 40px), alignment (w=1.0), cohesion (w=1.0); max speed 4.2, max force 0.18
- **Spatial hash grid** — O(n) neighbor lookup via grid cell bucketing (50px cells); avoids O(n²) brute force
- **Predator cursor** — 180px repulsion radius, force strength 12; cursor ring visually shown at 360px diameter
- **Food drop** — click to place food source (neon green, `#39ff14`), attracts birds within 130px, decays over 30 seconds; pulsing ring shows radius
- **Velocity → color** — slow birds are electric cyan `#00e5ff`, fast birds are hot magenta `#ff00aa`; trail opacity 0.25
- **8-position trail buffer** — circular buffer per boid, oldest-to-newest line segments drawn each frame
- **Edge wrapping** — birds wrap at ±20px beyond canvas bounds
- **Stats HUD** — Orbitron font, live FPS / bird count / avg speed

## Controls

| Input | Effect |
|-------|--------|
| `Mouse move` | Predator repulsion — scatter birds |
| `Click` | Drop food source — attract birds for 30s |
| `Esc` | Lock/unlock cursor |

## Tech Stack

- **Single HTML file** — no build step, Canvas 2D, vanilla JS
- **Spatial grid** — custom hash map, 16-bit coordinate packing `(cx<<16 | cy)`
- **Dual-loop** — FPS counter loop + render loop; `requestAnimationFrame`

## Architecture

```
Boid {
  x, y, vx, vy, speed
  trail[8] — circular {x,y} buffer
  trailIdx — current head position
}

Grid {
  data: Map<cellKey, Boid[]>
  insert(boid), query(x, y, radius) → Boid[]
}

Per frame:
  1. Clear grid, insert all boids
  2. For each boid:
     - query neighbors (radius 50px)
     - compute sep/ali/coh forces
     - apply predator repulsion (mouse)
     - apply food attraction
     - clamp speed, integrate position
     - wrap edges
     - update trail buffer
  3. Draw food pulses
  4. Draw all trails (strokeStyle = speedColor, globalAlpha=0.25)
  5. Draw all heads (arc, speedColor)
  6. Update HUD stats
```

## License

MIT