# API

Simple Node/Express API with stubbed book data, used for local development
against the static site in `src/web`.

## Run locally

```bash
cd src/api
npm install
npm start        # or `npm run dev` for auto-restart on changes
```

The server listens on `http://localhost:3001` by default (override with the
`PORT` env var).

## Endpoints

- `GET /health` — health check
- `GET /api/books` — list all books
- `GET /api/books/:id` — get a single book by id
- `GET /api-docs` — Swagger UI
- `GET /openapi.json` — raw OpenAPI spec
