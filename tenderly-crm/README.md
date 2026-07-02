# Tenderly CRM

Tenderly CRM is a B2B tender and proposal management workspace for sales teams that handle complex procurement pipelines.

This project uses a different stack from PulseOps: PHP/Laravel-style backend code, Vue 3, Vite, MySQL, Redis and Tailwind CSS. The goal is to show business workflow modeling, backend service boundaries and a clean Vue product interface.

## Stack

- Backend: Laravel-style PHP, Form Requests, Eloquent-style models, service layer
- Frontend: Vue 3, TypeScript, Vite, Tailwind CSS
- Data: MySQL, Redis
- Infrastructure: Docker Compose

## Product Scope

- Tender pipeline dashboard.
- Proposal status tracking.
- Deal value and win probability metrics.
- Service object for pipeline transitions.
- API routes for listing and creating tenders.
- Database migrations for tenders and proposals.

## Quick Start

This repository is intentionally lightweight and portfolio-focused. In a real Laravel install, copy the backend files into a Laravel app or run them inside a Laravel skeleton.

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Infrastructure:

```bash
docker compose up -d
```

## Demo Value

Tenderly CRM demonstrates a different engineering profile than PulseOps:

- PHP backend organization;
- Vue component design;
- MySQL schema modeling;
- Redis-ready workflow queueing;
- operational business domain instead of another dashboard clone.
