import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

const createIncidentSchema = z.object({
  title: z.string().min(5),
  service: z.string().min(2),
  severity: z.enum(["low", "medium", "high", "critical"]),
  owner: z.string().min(2)
});

export async function incidentRoutes(app: FastifyInstance) {
  app.get("/incidents", async () => {
    const incidents = await prisma.incident.findMany({
      orderBy: [{ status: "asc" }, { openedAt: "desc" }]
    });

    return incidents.map((incident) => ({
      ...incident,
      openedAt: incident.openedAt.toISOString()
    }));
  });

  app.post("/incidents", async (request, reply) => {
    const body = createIncidentSchema.parse(request.body);
    const workspace = await prisma.workspace.findFirstOrThrow();

    const incident = await prisma.incident.create({
      data: {
        ...body,
        status: "open",
        workspaceId: workspace.id
      }
    });

    return reply.code(201).send(incident);
  });
}
