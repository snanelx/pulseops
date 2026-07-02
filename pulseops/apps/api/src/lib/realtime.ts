import type { Server } from "node:http";
import WebSocket, { WebSocketServer } from "ws";
import type { LiveEvent } from "@pulseops/shared";

const clients = new Set<WebSocket>();

export function attachRealtime(server: Server) {
  const wss = new WebSocketServer({ server, path: "/realtime" });

  wss.on("connection", (socket) => {
    clients.add(socket);
    socket.send(JSON.stringify({ type: "connected", at: new Date().toISOString() }));

    socket.on("close", () => {
      clients.delete(socket);
    });
  });
}

export function publishEvent(event: LiveEvent) {
  const payload = JSON.stringify({ type: "event.created", data: event });

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}
