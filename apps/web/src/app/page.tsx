import { Bell, Command, Search } from "lucide-react";
import { EventFeed } from "@/components/event-feed";
import { IncidentTable } from "@/components/incident-table";
import { MetricCard } from "@/components/metric-card";
import { ServiceHealth } from "@/components/service-health";
import { ThroughputChart } from "@/components/throughput-chart";
import { getEvents, getIncidents, getMetrics } from "@/lib/api";
import { demoEvents, demoIncidents, demoMetrics } from "@/lib/demo-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let metrics = demoMetrics;
  let events = demoEvents;
  let incidents = demoIncidents;

  try {
    [metrics, events, incidents] = await Promise.all([
      getMetrics(),
      getEvents(),
      getIncidents()
    ]);
  } catch {
    // The dashboard remains reviewable even before the API stack is started.
  }

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase text-moss">PulseOps</p>
            <h1 className="text-xl font-semibold tracking-normal">Operations command center</h1>
          </div>
          <div className="hidden min-w-80 items-center gap-2 rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm text-ink/50 md:flex">
            <Search aria-hidden size={16} />
            Search services, events, incidents
            <Command aria-hidden className="ml-auto" size={14} />
          </div>
          <button className="flex size-10 items-center justify-center rounded-md border border-ink/10 bg-white text-ink">
            <Bell aria-hidden size={18} />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <ThroughputChart />
          <IncidentTable incidents={incidents} />
        </section>

        <aside className="space-y-5">
          <ServiceHealth />
          <EventFeed initialEvents={events} />
        </aside>
      </div>
    </main>
  );
}
