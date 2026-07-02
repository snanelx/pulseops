import type { FastifyInstance } from "fastify";
import type { OperationalMetric } from "@pulseops/shared";
import { prisma } from "../../lib/prisma.js";

export async function metricRoutes(app: FastifyInstance) {
  app.get("/metrics", async (): Promise<OperationalMetric[]> => {
    const [openIncidents, events] = await Promise.all([
      prisma.incident.count({ where: { status: { not: "resolved" } } }),
      prisma.event.count()
    ]);

    return [
      { label: "Uptime", value: 99.94, unit: "%", trend: 0.03 },
      { label: "P95 latency", value: 184, unit: "ms", trend: -12 },
      { label: "Open incidents", value: openIncidents, unit: "count", trend: -1 },
      { label: "Events today", value: events, unit: "count", trend: 18 }
    ];
  });
}
