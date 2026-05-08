# Abyssal Garden — Generative Bioluminescent Deep Ocean World

## Concept & Vision

An infinite procedural underwater garden that grows before your eyes. L-system coral structures sway in phantom currents, bioluminescent organisms pulse with soft light, and schools of fish move as one responsive organism. The mouse is a gentle explorer — hover near lifeforms to illuminate them, click to attract a gathering. Time passes slowly here; this is a world to get lost in.

**Feel:** Sacred, meditative, alien-beautiful. Like discovering a garden at the bottom of the ocean that no human has ever seen.

## Technical Architecture

### Stack
- **Three.js r160** — WebGL rendering, post-processing
- **Custom GLSL shaders** — caustics, bioluminescent glow, water absorption
- **L-System plant growth** — parametric coral/seaweed structures
- **Boids flocking** — schooling fish with predator-avoidance
- **Particle systems** — bioluminescent spores, bubble drift, firefly floaters

### Scene Composition
1. **Infinite procedural seafloor** — Perlin noise terrain, loads around camera
2. **L-system coral garden** — 5 species, growing in clusters, full growth animation
3. **Bioluminescent shaders** — vertex-colored geometry with additive glow bloom
4. **Fish schools (3)** — boids with separation/alignment/cohesion, fish respond to mouse
5. **Jellyfish (4-6)** — pulsing bell, trailing tentacles, gentle vertical drift
6. **Firefly particles** — 800 drifting luminescent spores
7. **Caustic light** — animated light patterns on seafloor via fragment shader
8. **Atmospheric fog** — exponential depth fog with blue-green absorption
9. **Mouse interaction** — click to attract fish, hover to illuminate organisms

### Visual Style
- Deep navy/black void (#020510)
- Bioluminescent palette: electric cyan (#00ffcc), soft violet (#8855ff), pale gold (#ffcc44)
- Bloom post-processing for that "glowing from within" look
- Additive blending on all luminescent elements

### Performance
- Instanced geometry for particles and fish
- Spatial grid for boid neighbor lookups
- LOD on seafloor chunks
- Target: 60fps on modern hardware

## Features

- **Growth animation:** Coral structures grow from seeds over 10 seconds
- **Sway animation:** All flora sways via vertex shader with phantom current
- **Fish schooling:** 3 independent schools, each 60-100 fish
- **Fish attraction:** Click anywhere → nearby fish gently orbit the point for 5s
- **Jellyfish drift:** Vertical sinusoidal movement, tentacles trail physics
- **Firefly drift:** 800 particles with individual phase offsets
- **Atmospheric depth:** Fog increases with distance, water color absorption
- **Auto-camera:** Slow orbital camera, no input needed — pure ambient experience

## File Structure
- `/home/daniel/.openclaw/workspace/projects/abyssal-garden/index.html` — single self-contained file

## Rotation
Visual art → this is it. Last visual art: void-walker (May 8), echo-chamber spatial audio. This is deeper — bioluminescent, generative, alive.