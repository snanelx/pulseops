"use client";

import { useEffect, useState } from "react";
import { Activity, GitBranch, KeyRound, Receipt, Siren } from "lucide-react";
import type { LiveEvent } from "@pulseops/shared";

const icons = {
  deployment: GitBranch,
  payment: Receipt,
  job: Activity,
  incident: Siren,
  auth: KeyRound
};

function formatEventTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC"
  }).format(new Date(value));
}

export function EventFeed({ initialEvents }: { initialEvents: LiveEvent[] }) {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const wsUrl = apiUrl.replace(/^http/, "ws");
    const socket = new WebSocket(`${wsUrl}/realtime`);

    socket.addEventListener("message", (message) => {
      const payload = JSON.parse(message.data);

      if (payload.type === "event.created") {
        setEvents((current) => [payload.data, ...current].slice(0, 25));
      }
    });

    return () => socket.close();
  }, []);

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-panel">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Live events</h2>
        <span className="rounded-full bg-limewash px-3 py-1 text-xs font-medium text-ink">Streaming</span>
      </div>
      <div className="mt-4 space-y-3">
        {events.map((event) => {
          const Icon = icons[event.kind];

          return (
            <article key={event.id} className="flex gap-3 rounded-md border border-ink/10 p-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-paper text-moss">
                <Icon aria-hidden size={18} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{event.title}</p>
                <p className="mt-1 text-xs text-ink/50">{event.source} - {formatEventTime(event.createdAt)} UTC</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
