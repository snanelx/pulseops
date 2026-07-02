export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "open" | "investigating" | "resolved";
export type EventKind = "deployment" | "payment" | "job" | "incident" | "auth";

export interface OperationalMetric {
  label: string;
  value: number;
  unit: "%" | "ms" | "count" | "usd";
  trend: number;
}

export interface LiveEvent {
  id: string;
  kind: EventKind;
  title: string;
  source: string;
  createdAt: string;
  severity?: IncidentSeverity;
}

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  owner: string;
  openedAt: string;
}

export const severityWeight: Record<IncidentSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};
