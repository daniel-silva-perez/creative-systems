# Luminal Threads — Spec

## What It Is

A WebGL harmonic resonance visualizer. Thousands of particles trace invisible Lissajous curves and standing wave interference patterns, creating luminous thread-art that shifts as you interact. The mouse acts as a gravitational perturbation — drag to bend the field, watch threads twist into new harmonics.

## Visual Aesthetic

Deep void background (#020208), particles in electric cyan→violet→rose gradient mapped to velocity. Trails rendered via alpha-blended line segments. Soft bloom glow around high-velocity clusters. CRT scanline overlay at 5% opacity.

## Physics Model

- N = 3000 particles on a 2D plane
- Each particle follows: `pos = A * sin(f1 * t + φ) × ſ + B * cos(f2 * t + ψ) × ĵ`
- Base frequencies f1, f2 drawn from harmonic series (1, 2, 3, 4, 5 Hz)
- Phase offsets φ, ψ randomized per particle → unique curve per particle
- Mouse creates a gravitational perturbation: nearby particles get velocity nudge toward/away from cursor
- Trail: last 40 positions stored per particle, rendered as fading line segments

## Controls

- **Mouse move**: attract/repel field — particles within 150px get pulled toward cursor
- **Click**: burst — particles near cursor get velocity impulse, scatter then reform
- **Space**: pause/resume time
- **C**: clear trails
- **1-5**: switch harmonic series (changes f1, f2 base multipliers)

## HUD

- Top-left: FPS, particle count, harmonic mode label
- Bottom-center: key legend

## Stack

Single HTML file. Three.js r158 via CDN for WebGL points + lines. No build step. Vanilla JS.

## Success Criteria

- 3000 particles at 60fps on modern hardware
- Beautiful emergent patterns without user input (autonomous animation)
- Mouse interaction creates immediate, visible field distortion
- Trails fade smoothly, creating light-painting aesthetic
