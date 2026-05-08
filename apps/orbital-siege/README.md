# Orbital Siege

> Real-time orbital defense — fend off 20 escalating waves of alien hostiles with a rotating arsenal of weapons and autonomous orbital platforms.

![Game](https://img.shields.io/badge/Game-TypeScript%20%2F%20Canvas%202D-orange)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Browser-blue)

---

## About

**Orbital Siege** is a top-down, real-time orbital defense game running entirely in the browser — no build step, no framework, just a single HTML file and a Canvas 2D renderer. You command a rotating space station at the center of the battlefield; enemies spawn from all directions in escalating waves. Survive all 20 waves to achieve victory.

---

## Features

- **20-wave progression** — enemy count, types, HP, and speed scale continuously from Wave 1 through Wave 20
- **4 weapon modes** switchable with `1`–`4`
  - Scatter Cannon (default) — wide burst, no cost
  - Plasma Beam — rapid-fire, no cost
  - Homing Missile — high damage, costs energy
  - Railgun — sniper shot, highest damage, costs energy
- **Orbital platforms** — deploy up to 8 autonomous platforms (`SPACE`) that auto-target and fire at the nearest enemy
- **Shield burst** — `RMB` consumes 20 shields to instantly destroy all enemy projectiles in radius
- **Resource management** — hull, shields, and energy regenerate between combat; pickups drop from defeated enemies
- **Particle & visual effects** — screen shake on damage, parallax star field, particle trails, explosion flashes, pulsing station glow
- **Difficulty curve** — starts with Drone swarms, escalates through Fighter, Cruiser, Carrier, and finally Mothership threats by late game

---

## Tech Stack

| Layer | Technology |
|---|---|
| Renderer | Canvas 2D API |
| Language | Vanilla JavaScript (ES2020) |
| Delivery | Single `index.html` — zero dependencies |
| Dev server | `npx serve` (optional) |

No build tools, no frameworks, no external assets. Everything renders procedurally.

---

## Run Instructions

### Option 1 — Open directly

```bash
# Open in default browser (no server needed)
open /tmp/orbital-siege/index.html
```

### Option 2 — Local server (recommended for dev)

```bash
cd /tmp/orbital-siege
npm install
npm start
# → serves at http://localhost:3000
```

---

## Controls

| Input | Action |
|---|---|
| `Click` | Start game / restart after game over |
| `SPACE` | Deploy orbital platform (max 8) |
| `LMB` (hold) | Fire current weapon |
| `RMB` | Shield burst — destroys all enemy projectiles nearby (costs 20 shields) |
| `WASD` | Pan camera |
| `1` | Scatter Cannon |
| `2` | Plasma Beam |
| `3` | Homing Missile |
| `4` | Railgun |
| `P` | Pause / resume |

---

## HUD Reference

```
Wave: N    Score: N
Hull: N%   Shields: N%
Platforms: N   Energy: N
```

Energy regenerates over time and is consumed by certain weapons. Shields regenerate slowly and fully absorb incoming damage before hull takes hits. Hull does not regenerate — survive on shields and pickups.

---

## File Structure

```
orbital-siege/
├── index.html    # Full game — ~1100 lines, self-contained
├── package.json  # Dev: serve; no other dependencies
└── README.md
```