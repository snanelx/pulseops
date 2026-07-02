# Architecture

PulseOps is structured as a modular monorepo. The goal is to show how a fullstack product can be split into clear boundaries without adding unnecessary enterprise ceremony.

## System Overview

```txt
Next.js Web App
  |
  | REST + WebSocket
  v
Fastify API
  |
  | Prisma
  v
PostgreSQL

Fastify API -> Redis-ready layer for cache, rate limits and pub/sub
```

## Applications

### `apps/web`

The frontend is a Next.js dashboard focused on operational workflows:

- KPI cards for fast scanning.
- Incident table for repeated triage work.
- Service health panel.
- Live event feed connected to the WebSocket endpoint.

The UI is intentionally dense and product-like. It avoids landing-page composition because this project is meant to demonstrate application design, not marketing design.

### `apps/api`

The backend is a Fastify API organized by feature modules:

- `metrics`: operational KPI aggregation.
- `events`: event ingestion and real-time publishing.
- `incidents`: incident lifecycle endpoints.

The API uses Prisma for database access and Zod for input validation. JWT and rate limiting are already registered at the server level so the project can grow into protected routes without changing the core structure.

### `packages/shared`

Shared TypeScript contracts keep the API and web app aligned:

- event kinds;
- incident severity and status;
- dashboard metric shapes.

This is a small but important fullstack signal: the project avoids duplicating domain contracts across client and server.

## Data Model

Core entities:

- `Workspace`: tenant boundary.
- `User`: team member within a workspace.
- `Event`: immutable activity stream item.
- `Incident`: operational issue that can be triaged and resolved.

The model is intentionally extendable. Good next additions would be audit logs, incident comments, service ownership, notification rules and API keys.

## Real-time Flow

1. A client creates an event through `POST /api/events`.
2. The API validates the payload with Zod.
3. Prisma persists the event in PostgreSQL.
4. The API publishes the event to connected WebSocket clients.
5. The dashboard prepends the new event without a page refresh.

For a larger deployment, the in-memory WebSocket publisher can be replaced with Redis pub/sub so multiple API instances can broadcast the same event stream.

## Production Roadmap

- Add authentication routes and password hashing.
- Add Redis-backed session revocation and pub/sub.
- Add background workers for alert rules.
- Add OpenTelemetry traces and structured dashboards.
- Add Playwright tests for dashboard workflows.
- Add service-level objectives and incident postmortems.
