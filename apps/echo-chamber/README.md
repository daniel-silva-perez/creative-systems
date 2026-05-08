# Echo Chamber

Spatial Audio Memory Palace — navigate your voice whispers in 3D space. Record a memory and it appears as a glowing echo node placed randomly in the void. Navigate to it and hear it playback from the exact direction it was recorded, using the Web Audio API's HRTF panner.

```
    ╭──────────────────────────────────────────╮
    │  ◈ ECHO CHAMBER ◈                        │
    │  Spatial Audio Memory Palace             │
    │                                          │
    │  Record → echo node appears in 3D space  │
    │  Navigate → spatial audio playback        │
    │  Click node → sound from that direction  │
    │                                          │
    │  HRTF panning model                      │
    │  First-person + orbit controls           │
    │  Bloom post-processing                   │
    ╰──────────────────────────────────────────╯
```

## Features

- **Voice recording** — press `Space` or `R` to start/stop recording; MediaRecorder captures to WebM, decoded via `AudioContext.decodeAudioData()`
- **Spatial echo nodes** — each recording is placed at a random position in 3D space (radius 6–20 units, random angle, y: -2 to +4), each with a unique hue
- **HRTF 3D audio** — `PannerNode` with `panningModel: 'HRTF'`, `distanceModel: 'inverse'`, position set from stored memory coordinates; listener position/forward vector updated from camera every frame
- **Click to play** — raycasting against echo node meshes; click an echo to trigger spatial playback
- **Demo mode** — load 8 synthetic echo nodes without microphone permission for instant exploration
- **First-person mode** — `F` key toggles pointer lock; WASD movement + mouse look; camera bobs gently
- **Trigger all** — `T` key triggers all echoes in sequence with 120ms stagger
- **Visual feedback** — each echo node has a core sphere + torus ring + point light; rings rotate continuously; triggered nodes pulse with scale animation; particle burst spawns on trigger; ambient ring expands outward

## Controls

| Key | Action |
|-----|--------|
| `Space` / `R` | Start/stop recording |
| `Click echo` | Play back memory from its spatial position |
| `F` | Toggle first-person mode (pointer lock) |
| `W/A/S/D` | Move (first-person) |
| `T` | Trigger all echoes in sequence |
| `Esc` | Exit pointer lock / pause |

## Tech Stack

- **Three.js r160** via importmap (ES modules from CDN)
- **Web Audio API** — MediaRecorder, AudioContext, AudioBufferSourceNode, PannerNode with HRTF
- **OrbitControls** for orbit camera mode
- **EffectComposer** with UnrealBloomPass
- **Custom spawn animation** (no library)
- **Single HTML file** — ~670 lines

## Architecture

```
Audio Pipeline
  MediaRecorder (mic stream)
    → Blob → ArrayBuffer → decodeAudioData()
    → AudioBuffer stored in memory object
    → on playback: AudioBufferSource → PannerNode → destination
    → PannerNode position = memory.position
    → listener = camera position/forward

Echo Node (per memory)
  ├─ core sphere (MeshStandardMaterial, emissiveIntensity=2)
  ├─ torus ring (rotates on Z per frame)
  ├─ point light (color-matched, intensity=1.5, range=6)
  └─ userData: baseY, hoverOffset, hoverSpeed, pulseTime

State
  memories[] — { id, audioBuffer, position, color, group, analyser }
  recording: boolean
  firstPerson: boolean
  particleSystems[] — for trigger bursts
  ambientRings[] — for trigger ring effects
```

## License

MIT