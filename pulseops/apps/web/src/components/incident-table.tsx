import type { Incident } from "@pulseops/shared";

const severityStyles = {
  low: "bg-blueglass/15 text-ink",
  medium: "bg-limewash text-ink",
  high: "bg-coral/15 text-coral",
  critical: "bg-coral text-white"
};

export function IncidentTable({ incidents }: { incidents: Incident[] }) {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-panel">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Incidents</h2>
        <button className="rounded-md bg-ink px-3 py-2 text-sm font-medium text-white">Create</button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase text-ink/45">
              <th className="py-3 pr-4 font-medium">Incident</th>
              <th className="py-3 pr-4 font-medium">Service</th>
              <th className="py-3 pr-4 font-medium">Severity</th>
              <th className="py-3 pr-4 font-medium">Status</th>
              <th className="py-3 pr-4 font-medium">Owner</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id} className="border-b border-ink/10 last:border-0">
                <td className="py-3 pr-4 font-medium">{incident.title}</td>
                <td className="py-3 pr-4 text-ink/65">{incident.service}</td>
                <td className="py-3 pr-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${severityStyles[incident.severity]}`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="py-3 pr-4 text-ink/65">{incident.status}</td>
                <td className="py-3 pr-4 text-ink/65">{incident.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
