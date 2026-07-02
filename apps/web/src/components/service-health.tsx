import { CheckCircle2, CircleAlert, Server } from "lucide-react";

const services = [
  { name: "checkout-api", status: "degraded", latency: 184 },
  { name: "webhooks", status: "healthy", latency: 96 },
  { name: "catalog-search", status: "healthy", latency: 121 },
  { name: "billing-worker", status: "healthy", latency: 74 }
];

export function ServiceHealth() {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-panel">
      <div className="flex items-center gap-2">
        <Server aria-hidden size={18} />
        <h2 className="text-base font-semibold">Service health</h2>
      </div>
      <div className="mt-4 space-y-3">
        {services.map((service) => {
          const healthy = service.status === "healthy";
          const Icon = healthy ? CheckCircle2 : CircleAlert;

          return (
            <div key={service.name} className="flex items-center justify-between gap-3 rounded-md border border-ink/10 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{service.name}</p>
                <p className="mt-1 text-xs text-ink/50">{service.latency} ms p95</p>
              </div>
              <span className={healthy ? "text-moss" : "text-coral"}>
                <Icon aria-hidden size={18} />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
