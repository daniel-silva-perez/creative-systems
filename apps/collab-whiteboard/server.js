// CANVASync — Real-time collaborative whiteboard server
// Run: node server.js

const WebSocket = require('ws');

const PORT = 7895;
const CURSOR_COLORS = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6bcf","#c9a0ff","#ff9f43","#54e0c8"];

const clients = new Map();

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`CANVASync running on ws://localhost:${PORT}`);
});

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const userId = url.searchParams.get('uid') || `anon_${Math.random().toString(36).slice(2, 6)}`;
  const color = CURSOR_COLORS[clients.size % CURSOR_COLORS.length];

  const state = { ws, userId, color, lastX: -1, lastY: -1 };
  clients.set(userId, state);

  ws.send(JSON.stringify({ type: 'init', userId, color, userCount: clients.size }));

  const joinMsg = JSON.stringify({ type: 'system', text: `${userId} joined`, userCount: clients.size });
  broadcast(joinMsg, userId);

  ws.on('message', (data) => {
    let msg;
    try { msg = JSON.parse(data.toString()); } catch { return; }
    state.lastX = msg.x ?? state.lastX;
    state.lastY = msg.y ?? state.lastY;

    const out = JSON.stringify({ ...msg, userId });

    if (msg.type === 'draw') {
      broadcastLine(userId, state.lastX, state.lastY, msg.x, msg.y, state.color, msg.size ?? 3);
      state.lastX = msg.x ?? state.lastX;
      state.lastY = msg.y ?? state.lastY;
    } else if (msg.type === 'line' || msg.type === 'clear' || msg.type === 'fill') {
      broadcast(out, userId);
    } else if (msg.type === 'cursor') {
      broadcast(JSON.stringify({ type: 'cursor', x: msg.x, y: msg.y, color: state.color, userId }), userId);
    } else if (msg.type === 'color') {
      state.color = msg.color ?? state.color;
    }
  });

  ws.on('close', () => {
    clients.delete(userId);
    broadcast(JSON.stringify({ type: 'system', text: `${userId} left`, userCount: clients.size }));
  });
});

function broadcast(payload, exclude) {
  for (const [uid, state] of clients) {
    if (uid !== exclude && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(payload);
    }
  }
}

function broadcastLine(exclude, x1, y1, x2, y2, color, size) {
  const msg = JSON.stringify({ type: 'draw', x: x2, y: y2, x2: x1, y2: y1, color, size, userId: exclude });
  for (const [uid, state] of clients) {
    if (uid !== exclude && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(msg);
    }
  }
}
