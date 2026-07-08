# poc-static-example

A minimal Next.js app statically exported and deployed to GitHub Pages, at
<https://bkaely.github.io/poc-static-example/>

This is a proof of concept that Next.js can flow through the GitHub Pages
hosting pipeline, while talking to a locally-run API for data such as book
listings.

## Layout

- [src/web](src/web) — the Next.js static site (what gets deployed to GitHub Pages)
- [src/api](src/api) — a local Node/Express API with stubbed data and Swagger docs

Each has its own README with setup instructions. The site and API are
separate `npm` projects — install and run each from its own directory.

## Development

Run the API and the site side by side:

```bash
cd src/api && npm install && npm start   # http://localhost:3001
cd src/web && npm install && npm run dev # http://localhost:3000
```

The site currently talks to the API's public URL, hard-coded as
`API_BASE_URL` in [src/web/lib/api.js](src/web/lib/api.js) — update it there
if the API's address changes. The plan is to replace this with a tunnel
(chisel or rathole) so the site can reach a locally-run API without depending
on Codespaces port forwarding. In the meantime, see
[src/api's README](src/api/README.md#reaching-this-from-the-deployed-site)
for how to set the port's visibility to Public.

## Auth

The site gates its home page behind a login screen backed by the API's stub
credentials (`admin` / `password123`, defined in
[src/api/data/users.js](src/api/data/users.js)). There's no real user
management yet — this is enough to exercise the login flow end to end.

## Deployment

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds `src/web` as a static export (`next build` with `output: "export"`)
and publishes it via GitHub Pages' "Deploy from GitHub Actions" flow. The API
is not deployed anywhere — it's for local development only.
