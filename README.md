# PulseOps

PulseOps is a production-style real-time operations platform for monitoring business events, incidents, service health and team activity across multiple workspaces.

This repository is designed as a portfolio-grade fullstack project: it shows frontend product thinking, backend architecture, real-time delivery, database modeling, Docker-based local infrastructure and clear engineering documentation.

## Why this project is portfolio-worthy

- Real business domain instead of a generic CRUD demo.
- Monorepo architecture with separate web, API and shared packages.
- Real-time event stream via WebSocket.
- PostgreSQL data model with Prisma migrations.
- Redis-ready architecture for caching, rate limits and pub/sub.
- Docker Compose environment for PostgreSQL and Redis.
- CI workflow prepared for linting, type checking and build checks.
- Clean README, architecture notes and API examples.

## Tech Stack

- Web: Next.js, React, TypeScript, Tailwind CSS
- API: Fastify, TypeScript, Prisma, JWT, Zod
- Data: PostgreSQL, Redis
- Realtime: WebSocket
- Tooling: pnpm workspaces, Turborepo, Docker, GitHub Actions

## Main Features

- Workspace overview dashboard with operational KPIs.
- Live event feed for deployments, payments, jobs and incidents.
- Incident management with severity, assignee and status.
- Metrics API for charts and health widgets.
- Auth-ready structure with JWT utilities.
- Shared TypeScript types between frontend and backend.

## Quick Start

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm db:generate
pnpm db:migrate
pnpm seed
pnpm dev
```

The web app runs on `http://localhost:3000`.
The API runs on `http://localhost:4000`.

## Demo Data

The frontend includes fallback demo data, so the dashboard stays reviewable even before the API and database are started. Running the seed command loads matching data into PostgreSQL.

## Repository Structure

```txt
apps/
  api/      Fastify API, Prisma schema, modules
  web/      Next.js dashboard application
packages/
  shared/   Shared domain types and constants
docs/
  architecture.md
  api.md
```

## What to show recruiters

Start with `docs/architecture.md`, then open the dashboard UI and API modules. The project intentionally highlights system design decisions: module boundaries, shared contracts, real-time event flow and infrastructure setup.
