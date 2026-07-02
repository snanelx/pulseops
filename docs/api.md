# API

Base URL:

```txt
http://localhost:4000
```

## Health

```http
GET /health
```

Returns service status and timestamp.

## Metrics

```http
GET /api/metrics
```

Returns dashboard KPIs.

Example response:

```json
[
  {
    "label": "Uptime",
    "value": 99.94,
    "unit": "%",
    "trend": 0.03
  }
]
```

## Events

```http
GET /api/events
```

Returns the latest operational events.

```http
POST /api/events
Content-Type: application/json
```

Example request:

```json
{
  "kind": "deployment",
  "title": "Checkout API deployed",
  "source": "github-actions"
}
```

When an event is created, connected WebSocket clients receive:

```json
{
  "type": "event.created",
  "data": {
    "id": "event_id",
    "kind": "deployment",
    "title": "Checkout API deployed",
    "source": "github-actions",
    "createdAt": "2026-06-30T20:00:00.000Z"
  }
}
```

## Incidents

```http
GET /api/incidents
```

Returns incidents ordered for triage.

```http
POST /api/incidents
Content-Type: application/json
```

Example request:

```json
{
  "title": "Webhook delivery delayed",
  "service": "webhooks",
  "severity": "medium",
  "owner": "Nina"
}
```

## Realtime

```txt
ws://localhost:4000/realtime
```

The dashboard connects to this endpoint and listens for event messages.
