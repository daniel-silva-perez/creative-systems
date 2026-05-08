# NEON FLOCK — Murmuration Simulator

## Concept & Vision

Thousands of luminous birds move as one living organism — a murmuration. You are the predator. Move your cursor to scatter them, watch them reform like a liquid aurora. Pure visual meditation meets fascinating emergent behavior. The screen becomes a living painting.

## Design Language

**Aesthetic:** Deep space bioluminescence — like watching deep-sea creatures in the abyss
**Palette:**
- Background: #050510 (near-black void)
- Primary birds: #00e5ff (electric cyan) → #ff00aa (hot magenta) gradient based on speed
- Trail glow: rgba(0, 229, 255, 0.12)
- Predator cursor: #ff3366 with pulsing aura
- Food sources: #39ff14 (neon green) with expanding ring pulse

**Typography:** Orbitron (Google Fonts) for HUD
**Motion:** 60fps boids, ghost trails 600ms fade, predator pulse 150ms

## Features

1. **Boids Core** — 2000 birds with separation, alignment, cohesion (Boids 1987 Reynolds)
2. **Grid Optimization** — spatial hash for O(n) neighbor lookup vs O(n²)
3. **Predator Cursor** — 180px repulsion radius, birds scatter then reform organically
4. **Food Drop** — click to place food, birds within 120px get attracted (decays 30s)
5. **Color by Speed** — slow=cyan, fast=magenta, creates velocity heatmap
6. **Trail System** — circular buffer of 8 positions per bird, drawn as fading line
7. **Attraction Pulse** — visual ring expands when food active
8. **Stats HUD** — FPS, bird count, avg velocity, instructions

## Technical Approach

- Single HTML file with Canvas 2D
- Boids: separation(w=1.8), alignment(w=1.0), cohesion(w=1.0), maxSpeed=4, maxForce=0.15
- Grid cell size = 50px for spatial hashing
- RequestAnimationFrame with delta-time
- No dependencies — pure vanilla JS + Orbitron from Google Fonts

## Component Inventory

| Component | Description |
|-----------|-------------|
| Boid | position, velocity, acceleration, trail (8-pos circular buffer), color |
| FoodSource | x, y, strength (decays over 30s), pulseRing radius |
| PredatorCursor | tracked from mousemove, repulsion applied per frame |
| HUD | FPS counter, bird count, avg velocity, help text |