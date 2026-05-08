# Sonic Bloom — Real-Time Audio Visualizer

> Generative art that breathes with your audio. Bass creates gravitational explosions. Mids sculpt flowing currents. Treble paints fine starlight threads.

An generative art visualizer that transforms audio into living, breathing particle ecosystems.
Every session is unique — seeded by the audio fingerprint itself.

---

## Quick Start

```bash
# Open index.html directly, or serve locally:
python3 -m http.server 8080
# Then open http://localhost:8080
```

- Grant microphone access when prompted, or drag-drop an audio file
- Click anywhere to spawn a burst of particles
- Double-click to toggle controls visibility
- ESC to reset

---

## Particle System Specifications

| Band | Frequency | Particle Behavior | Visual Character |
|------|-----------|-------------------|------------------|
| Sub-bass | 20–60 Hz | Explosive radial force | Large, slow orbs |
| Bass | 60–250 Hz | Gravitational pull / ripple | Pulsing clusters |
| Low-mid | 250–500 Hz | Swirling vortices | Orbital streams |
| Mid | 500–2 kHz | Flowing streams | Directed currents |
| High-mid | 2–6 kHz | Delicate sparks | Tiny bright flecks |
| Treble | 6–20 kHz | Starfield threads | Fine starlight |

### Technical Limits

- **Particle budget:** 512–1024 particles max (performance-tuned)
- **Particle structure:** `{x, y, vx, vy, hue, size, life, freqBand}`
- **Render target:** 60fps via Canvas 2D `requestAnimationFrame`
- **FFT size:** 2048 or 4096 for frequency detail

---

## Audio Pipeline

1. **Source:** microphone (`getUserMedia`) or file (`FileReader` → `decodeAudioData`)
2. **节点:** `AudioContext.createMediaElementSource()` or `createMediaStreamSource()`
3. **分析:** `AnalyserNode` (fftSize: 2048 or 4096)
4. **转换:** Frequency data → particle physics engine
5. **渲染:** Canvas render loop at 60fps

---

## Controls

| Control | Action |
|---------|--------|
| Mic / File toggle | Switch input source |
| Color mode | Switch color palette |
| Intensity slider | Adjust particle energy |
| Click anywhere | Spawn particle burst |
| Double-click | Toggle controls visibility |
| ESC | Reset scene |

---

## Color System

- **Hue mapping:** Frequency → HSL hue (0=red, 120=green, 240=blue, wraps)
- **Energy mapping:** RMS amplitude → saturation + lightness pulse
- **Background:** Deep black with subtle trail fade (`fillRect` alpha ~0.05)

---

## Effects

| Effect | Implementation |
|--------|----------------|
| Bloom | Multiple layered canvases with `filter: blur` + additive blend |
| Trails | Semi-transparent background clear (not full clear) |
| Glow | `shadowBlur` proportional to particle energy |
| Centrifuge | Bass hits spin the entire particle field |
| Waveform ribbon | Raw waveform rendered as 3D-looking ribbon at bottom |

---

## Presets

| Preset | Character | Palette |
|--------|-----------|---------|
| **Ocean** | Smooth, flowing, wave-like | Blue-dominant |
| **Fire** | Explosive, energetic, urgent | Red-orange |
| **Aurora** | Ethereal, wave-like, mystical | Green-purple |
| **Stardust** | Delicate, sparse, serene | White-blue |

---

## Tech Stack

- Vanilla JS + Canvas 2D API (no deps, runs anywhere)
- Web Audio API (`AudioContext`, `AnalyserNode`, `getUserMedia`)
- Phase Vocoder for pitch shifting (stretching demo)
- File drag-drop + mic input

---

## UI Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     [ FULL-VIEWPORT CANVAS ]                   │
│                                                                 │
│                                                                 │
│                                                           ┌────┐│
│                                                           │CONT││
│                                                           │ROLS││
│                                                           └────┘│
│                                                                 │
│  ▁▂▃▄▅▆▇▆▅▄▃▂▁▂▃▄▅▆▇▆▅▄▃▂▁▂▃▄▅▆▇▆▅▄▃▂▁▂▃▄▅▆▇▆▅▄▃▂▁  WAVEFORM │
└─────────────────────────────────────────────────────────────────┘
```
