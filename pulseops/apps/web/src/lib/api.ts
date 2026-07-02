import type { Incident, LiveEvent, OperationalMetric } from "@pulseops/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}/api${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getMetrics() {
  return request<OperationalMetric[]>("/metrics");
}

export function getEvents() {
  return request<LiveEvent[]>("/events");
}

export function getIncidents() {
  return request<Incident[]>("/incidents");
}
