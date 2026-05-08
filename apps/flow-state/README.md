# Flow State

Generative audio-visual synthesizer. Click anywhere to begin, then explore two modes — **Ambient** (drone pads + vortex field) and **Rhythmic** (kick-snare-hat patterns, bass, melody). Mouse movement adds ripple waves and particle bursts. BPM adjustable from 60–180.

```
    ╭─────────────────────────────────────╮
    │  ◎ FLOW STATE                       │
    │  ambient flow / rhythmic pulse      │
    │                                     │
    │  Dual engine synthesis:             │
    │  • Ambient: 3-oscillator pads        │
    │    Chord progression (Cmaj7→Dm9→...) │
    │    8s per chord, reverb feedback    │
    │                                     │
    │  • Rhythmic: 16-step drum sequencer │
    │    4-voice bass pattern             │
    │    Procedural melody motifs        │
    │    Kick/Snare/Hi-hat synthesis     │
    │                                     │
    │  Canvas: Lissajous vortex field     │
    │  Particles: polygon boids + trails  │
    │  Ripple waves on click              │
    ╰─────────────────────────────────────╯
```

## Features

### Audio Engine (Web Audio API)

- **Ambient mode:** 3-oscillator pad voices (sine + triangle, detuned), chord progression across 8 movements (Cmaj7, Dm9, Bm7, Am7, Em9...), filter sweep per note, 0.65s delay with feedback
- **Rhythmic mode:** 16-step drum sequencer (kick, snare, hat, open-hat), 4-row bass pattern, procedural melody (random motif of 4–6 notes, scheduled 2 bars ahead)
- **LFO panner** — slow sine-wave stereo panner in ambient mode only
- **BPM control** — slider from 60–180 BPM, affects all sequencer timing

### Visual Engine (Canvas 2D)

- **Vortex field** — 28×28 grid of line segments, each pointing along `angle + flow`, wave amplitude from distance and time
- **Particles** — up to 280 polygon particles with 10-point trails, spawn from center in ambient, from cursor on click
- **Ripple waves** — expand outward from mouse clicks, fade over ~330ms
- **Beat flash** — screen tint pulses on kick hits in rhythmic mode, color cycles with beatHue

### Modes

| Mode | Engine |
|------|--------|
| `Ambient` | Pad chords, LFO panner, center particle emission |
| `Rhythmic` | 16-step drums, bass, procedural melody, beat-synced ripples |

Toggle with the top-right button or programmatically via `mode = 'ambient' | 'rhythmic'`.

## Controls

| Input | Effect |
|-------|--------|
| `Click` | Start audio context; spawn particle burst + ripple |
| `Mouse move` | In ambient: add ripples + particles probabilistically |
| `BPM slider` | Adjust tempo 60–180 BPM |
| `Mode button` | Toggle ambient/rhythmic |

## Tech Stack

- **Single HTML file** — no build step
- **Web Audio API** — AudioContext, OscillatorNode, GainNode, BiquadFilterNode, DelayNode, StereoPannerNode
- **Canvas 2D** — all rendering, no WebGL
- **Express static server** — `server.js` for local hosting

## Run

```bash
npm install
node server.js
# → http://localhost:3000
```

## License

MIT