import "dotenv/config";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import { eventRoutes } from "./modules/events/routes.js";
import { incidentRoutes } from "./modules/incidents/routes.js";
import { metricRoutes } from "./modules/metrics/routes.js";
import { attachRealtime } from "./lib/realtime.js";

const app = Fastify({
  logger: true
});

await app.register(cors, { origin: true });
await app.register(rateLimit, { max: 120, timeWindow: "1 minute" });
await app.register(jwt, { secret: process.env.JWT_SECRET || "dev-secret" });

app.get("/health", async () => ({
  status: "ok",
  service: "pulseops-api",
  checkedAt: new Date().toISOString()
}));

await app.register(metricRoutes, { prefix: "/api" });
await app.register(eventRoutes, { prefix: "/api" });
await app.register(incidentRoutes, { prefix: "/api" });

const port = Number(process.env.API_PORT || 4000);
await app.listen({ port, host: "0.0.0.0" });

attachRealtime(app.server);
