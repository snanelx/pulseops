import { nanoid } from "nanoid";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { publishEvent } from "../../lib/realtime.js";

const createEventSchema = z.object({
  kind: z.enum(["deployment", "payment", "job", "incident", "auth"]),
  title: z.string().min(3),
  source: z.string().min(2),
  severity: z.enum(["low", "medium", "high", "critical"]).optional()
});

export async function eventRoutes(app: FastifyInstance) {
  app.get("/events", async () => {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      take: 25
    });

    return events.map((event) => ({
      ...event,
      createdAt: event.createdAt.toISOString()
    }));
  });

  app.post("/events", async (request, reply) => {
    const body = createEventSchema.parse(request.body);
    const workspace = await prisma.workspace.findFirstOrThrow();
    const event = await prisma.event.create({
      data: { ...body, workspaceId: workspace.id }
    });

    publishEvent({
      id: event.id || nanoid(),
      kind: body.kind,
      title: body.title,
      source: body.source,
      severity: body.severity,
      createdAt: event.createdAt.toISOString()
    });

    return reply.code(201).send(event);
  });
}
