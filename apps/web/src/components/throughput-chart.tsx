"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "09:00", events: 28, latency: 142 },
  { time: "10:00", events: 42, latency: 136 },
  { time: "11:00", events: 51, latency: 151 },
  { time: "12:00", events: 67, latency: 171 },
  { time: "13:00", events: 58, latency: 164 },
  { time: "14:00", events: 76, latency: 184 },
  { time: "15:00", events: 69, latency: 176 }
];

export function ThroughputChart() {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-panel">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Traffic and latency</h2>
        <span className="text-xs font-medium text-ink/50">Last 7 hours</span>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -24, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="events" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#315c45" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#315c45" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#6c756e", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6c756e", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid rgba(23, 33, 27, 0.12)",
                boxShadow: "0 18px 45px rgba(27, 38, 31, 0.10)"
              }}
            />
            <Area type="monotone" dataKey="events" stroke="#315c45" fill="url(#events)" strokeWidth={2} />
            <Area type="monotone" dataKey="latency" stroke="#e46f55" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
