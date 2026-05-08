// Collab Whiteboard — Real-time multiplayer WebSocket canvas
// Run: bun run server.ts

import { Server } from "bun";
import type { WebSocket } from "bun";

interface DrawOp {
  type: "draw" | "line" | "fill" | "clear" | "cursor";
  x?: number;
  y?: number;
  x2?: number;
  y2?: number;
  color?: string;
  size?: number;
  userId?: string;
}

interface ClientState {
  ws: WebSocket<{ userId: string }>;
  userId: string;
  color: string;
  size: number;
  cursorX: number;
  cursorY: number;
  lastX: number;
  lastY: number;
}

const COLORS = ["#ffffff","#ff4444","#ff8800","#ffee00","#00ff66","#00ccff","#4488ff","#aa44ff","#ff44aa","#cccccc","#666666","#000000"];
const CURSOR_COLORS = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6bcf","#c9a0ff","#ff9f43","#54e0c8"];

let colorIdx = 0;
const clients = new Map<string, ClientState>();

const server = Bun.serve<{ userId: string }>({
  port: 7895,
  fetch(req, ws) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("uid") || `anon_${Math.random().toString(36).slice(2, 6)}`;
    const color = CURSOR_COLORS[colorIdx % CURSOR_COLORS.length];
    colorIdx++;

    ws.subscribe("whiteboard");

    const state: ClientState = {
      ws, userId, color, size: 3,
      cursorX: -1, cursorY: -1, lastX: -1, lastY: -1,
    };
    clients.set(userId, state);

    // Send init state
    ws.send(JSON.stringify({
      type: "init",
      userId,
      color,
      colorPalette: COLORS,
      userCount: clients.size,
    }));

    // Broadcast join
    broadcast({
      type: "system",
      text: `${userId} joined`,
      userCount: clients.size,
    }, userId);

    return; // no response body
  },

  websocket(ws: WebSocket<{ userId: string }>) {
    const state = clients.get(ws.data.userId);
    if (!state) return;

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data as string) as DrawOp;
        state.lastX = data.x ?? state.lastX;
        state.lastY = data.y ?? state.lastY;

        if (data.type === "draw") {
          const op: DrawOp = {
            type: "draw",
            x: data.x, y: data.y,
            x2: state.lastX, y2: state.lastY,
            color: data.color ?? state.color,
            size: data.size ?? state.size,
            userId: state.userId,
          };
          state.lastX = data.x ?? state.lastX;
          state.lastY = data.y ?? state.lastY;
          broadcast(op);
        } else if (data.type === "line") {
          broadcast({ ...data, userId: state.userId });
        } else if (data.type === "clear") {
          broadcast({ type: "clear", userId: state.userId });
        } else if (data.type === "fill") {
          broadcast({ type: "fill", color: data.color, userId: state.userId });
        } else if (data.type === "cursor") {
          state.cursorX = data.x ?? -1;
          state.cursorY = data.y ?? -1;
          broadcast({
            type: "cursor",
            x: state.cursorX, y: state.cursorY,
            color: state.color,
            userId: state.userId,
          }, state.userId);
        } else if (data.type === "color") {
          state.color = data.color ?? state.color;
          state.size = data.size ?? state.size;
        }
      } catch {}
    };

    ws.onclose = () => {
      clients.delete(state.userId);
      broadcast({
        type: "system",
        text: `${state.userId} left`,
        userCount: clients.size,
      });
    };
  },
});

function broadcast(msg: object, excludeUserId?: string) {
  const payload = JSON.stringify(msg);
  for (const [, client] of clients) {
    if (excludeUserId && client.userId === excludeUserId) continue;
    client.ws.send(payload);
  }
}

console.log(`Collab Whiteboard running on http://${server.hostname}:${server.port}`);
