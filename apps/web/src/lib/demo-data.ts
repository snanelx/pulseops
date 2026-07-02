import type { Incident, LiveEvent, OperationalMetric } from "@pulseops/shared";

const demoBaseDate = "2026-07-02T14:30:00.000Z";

export const demoMetrics: OperationalMetric[] = [
  { label: "Uptime", value: 99.94, unit: "%", trend: 0.03 },
  { label: "P95 latency", value: 184, unit: "ms", trend: -12 },
  { label: "Open incidents", value: 2, unit: "count", trend: -1 },
  { label: "Events today", value: 128, unit: "count", trend: 18 }
];

export const demoEvents: LiveEvent[] = [
  {
    id: "evt_1",
    kind: "deployment",
    title: "Checkout API deployed",
    source: "github-actions",
    createdAt: demoBaseDate
  },
  {
    id: "evt_2",
    kind: "payment",
    title: "Payment volume crossed target",
    source: "billing-worker",
    createdAt: "2026-07-02T14:15:00.000Z"
  },
  {
    id: "evt_3",
    kind: "incident",
    title: "Latency spike detected",
    source: "synthetics",
    severity: "high",
    createdAt: "2026-07-02T14:00:00.000Z"
  }
];

export const demoIncidents: Incident[] = [
  {
    id: "inc_1",
    title: "Checkout latency above SLO",
    service: "checkout-api",
    severity: "high",
    status: "investigating",
    owner: "Nina",
    openedAt: "2026-07-02T13:30:00.000Z"
  },
  {
    id: "inc_2",
    title: "Delayed webhook delivery",
    service: "webhooks",
    severity: "medium",
    status: "open",
    owner: "Roman",
    openedAt: "2026-07-02T12:30:00.000Z"
  },
  {
    id: "inc_3",
    title: "Search index lag",
    service: "catalog-search",
    severity: "low",
    status: "resolved",
    owner: "Mira",
    openedAt: "2026-07-02T11:30:00.000Z"
  }
];
