import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { OperationalMetric } from "@pulseops/shared";

export function MetricCard({ metric }: { metric: OperationalMetric }) {
  const improving = metric.trend >= 0;
  const TrendIcon = improving ? ArrowUpRight : ArrowDownRight;

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-ink/60">{metric.label}</p>
        <span className={improving ? "text-moss" : "text-coral"}>
          <TrendIcon aria-hidden size={18} />
        </span>
      </div>
      <div className="mt-4 flex items-end gap-2">
        <strong className="text-3xl font-semibold tracking-normal">{metric.value}</strong>
        <span className="pb-1 text-sm text-ink/55">{metric.unit}</span>
      </div>
      <p className="mt-3 text-xs text-ink/50">{improving ? "+" : ""}{metric.trend} over previous window</p>
    </section>
  );
}
