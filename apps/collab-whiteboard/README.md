# Collab Whiteboard

Real-time collaborative whiteboard with WebSocket multi-user sync. Draw on a shared infinite canvas with other users — every stroke, cursor, and action broadcasts instantly to all connected peers.

```
    ╭──────────────────────────────────────────╮
    │  ⎋ COLLAB WHITEBOARD                     │
    │  Real-time WebSocket multiplayer canvas │
    │                                          │
    │  Bun server (port 7895)                  │
    │  Broadcast draw/line/fill/clear/cursor    │
    │  Per-user color assignment               │
    │  System join/leave messages             │
    ╰──────────────────────────────────────────╯
```

## Features

- **Bun WebSocket server** — `Bun.serve()` with WebSocket upgrade on port 7895
- **Draw operations broadcast** — `draw` (point-to-point line), `line` (free-form), `fill` (solid color fill), `clear` (reset canvas)
- **Live cursor tracking** — `cursor` events broadcast each user's mouse position in real-time
- **Per-user color** — assigned from `CURSOR_COLORS` palette on join, persisted for session
- **System messages** — join/leave notifications broadcast to all clients
- **No persistence** — canvas state is in-memory only; reconnects start fresh

## Running

```bash
cd collab-whiteboard
bun run server.ts
# → ws://localhost:7895
```

Then open `index.html` in multiple browser tabs to collaborate.

## API

### WebSocket Messages (client → server)

| Type | Fields | Description |
|------|--------|-------------|
| `draw` | `x, y, color?, size?` | Draw from last position to (x, y) |
| `line` | `x, y, x2, y2, color?, size?` | Straight line |
| `fill` | `color` | Fill canvas with color |
| `clear` | — | Clear canvas |
| `cursor` | `x, y` | Cursor position update |
| `color` | `color, size` | Update pen color/size |

### Server → Client messages

| Type | Fields | Description |
|------|--------|-------------|
| `init` | `userId, color, colorPalette, userCount` | On connect |
| `system` | `text, userCount` | Join/leave events |
| `draw/line/fill/clear/cursor` | same as above + `userId` | Broadcast |

## Tech Stack

- **Bun** — server runtime (`bun run server.ts`)
- **TypeScript** — `server.ts` is typed
- **Canvas 2D** — client rendering, no framework

## Architecture

```
server.ts
  └─ Bun.serve({ port: 7895, fetch, websocket })
      ├─ on connect: assign color, send init, subscribe "whiteboard" room
      ├─ on message: parse DrawOp, broadcast to all except sender
      └─ on close: remove client, broadcast leave

index.html
  └─ Canvas 2D
  └─ WebSocket client (connect with ?uid= query param)
  └─ Event handlers: mousedown/move/up → send draw/cursor
  └─ On message: render draw operations, update user count
```

## License

MIT