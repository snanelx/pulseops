# Tenderly CRM Architecture

Tenderly CRM models a sales team workflow around tenders, proposals and weighted revenue forecasting.

## Structure

```txt
Vue 3 SPA
  |
  | REST
  v
Laravel-style API
  |
  | Eloquent ORM
  v
MySQL

Redis is reserved for queue-backed notifications and workflow jobs.
```

## Backend

The backend uses Laravel conventions:

- Form Requests validate incoming payloads.
- Controllers stay thin.
- `TenderPipelineService` owns business rules for stage transitions and forecast calculations.
- Eloquent-style models describe relationships between tenders and proposals.

This separation is intentionally portfolio-oriented: it shows that business logic is not buried directly in controllers.

## Frontend

The Vue app is a product dashboard with:

- KPI strip for active pipeline health;
- kanban-style tender stages;
- selected tender details panel;
- demo data that can later be replaced by API responses.

## Data Model

Core tables:

- `tenders`: opportunity, buyer, pipeline stage, budget, probability, owner and deadline.
- `proposals`: proposal versions linked to a tender.

## Extension Points

- Add Sanctum authentication.
- Add Redis queue jobs for deadline reminders.
- Add proposal PDF generation.
- Add role-based access for sales managers and proposal writers.
- Add MySQL full-text search over buyers and tender titles.
