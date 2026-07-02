import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.upsert({
    where: { slug: "acme-cloud" },
    update: {},
    create: { name: "Acme Cloud", slug: "acme-cloud" }
  });

  await prisma.user.upsert({
    where: { email: "demo@pulseops.dev" },
    update: {},
    create: {
      email: "demo@pulseops.dev",
      name: "Demo Operator",
      role: "admin",
      workspaceId: workspace.id
    }
  });

  await prisma.event.deleteMany({ where: { workspaceId: workspace.id } });
  await prisma.incident.deleteMany({ where: { workspaceId: workspace.id } });

  await prisma.event.createMany({
    data: [
      { kind: "deployment", title: "Checkout API deployed", source: "github-actions", workspaceId: workspace.id },
      { kind: "payment", title: "Payment volume crossed target", source: "billing-worker", workspaceId: workspace.id },
      { kind: "job", title: "Nightly reconciliation finished", source: "scheduler", workspaceId: workspace.id },
      { kind: "incident", title: "Latency spike detected", source: "synthetics", severity: "high", workspaceId: workspace.id }
    ]
  });

  await prisma.incident.createMany({
    data: [
      { title: "Checkout latency above SLO", service: "checkout-api", severity: "high", status: "investigating", owner: "Nina", workspaceId: workspace.id },
      { title: "Delayed webhook delivery", service: "webhooks", severity: "medium", status: "open", owner: "Roman", workspaceId: workspace.id },
      { title: "Search index lag", service: "catalog-search", severity: "low", status: "resolved", owner: "Mira", workspaceId: workspace.id }
    ]
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
