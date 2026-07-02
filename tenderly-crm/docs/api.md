# API

Base URL:

```txt
http://localhost:8080/api
```

## List Tenders

```http
GET /tenders
```

Returns tenders plus weighted forecast value.

```json
{
  "data": [
    {
      "id": 101,
      "title": "Fleet telemetry platform",
      "buyer": "Northline Logistics",
      "stage": "proposal",
      "budget_cents": 18400000,
      "probability": 62
    }
  ],
  "forecast_cents": 11408000
}
```

## Create Tender

```http
POST /tenders
Content-Type: application/json
```

```json
{
  "title": "Procurement analytics suite",
  "buyer": "Aster Manufacturing",
  "budget_cents": 24100000,
  "probability": 78,
  "deadline_at": "2026-08-04T12:00:00Z",
  "owner_name": "Nina"
}
```

## Move Tender Stage

```http
PATCH /tenders/{id}/stage
Content-Type: application/json
```

```json
{
  "stage": "negotiation"
}
```
