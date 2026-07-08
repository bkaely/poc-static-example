# web

The Next.js static site, statically exported and deployed to GitHub Pages at
<https://bkaely.github.io/poc-static-example/>.

## Run locally

```bash
cd src/web
npm install
npm run dev
```

Serves at `http://localhost:3000/poc-static-example/` (the `basePath` in
[next.config.mjs](next.config.mjs) applies in dev too, matching the GitHub
Pages URL).

## Data

The home page ([app/page.js](app/page.js)) and login page
([app/login/page.js](app/login/page.js)) fetch from the API in
[src/api](../api) at runtime, client-side — there's no server on this side to
proxy requests. If there's no API reachable, the home page shows an error
state instead of books.

The API's URL is hard-coded in [lib/api.js](lib/api.js) as `API_BASE_URL` —
**update it there** if the API moves (e.g. a different Codespace, a tunnel
URL, or a deployed host). It's imported by both pages rather than duplicated.

## Auth

The home page redirects to `/login` unless a valid session token (from
`POST /api/auth/login`) is present in `localStorage` — see
[lib/auth.js](lib/auth.js) for the storage helpers. See the root README for
the stub credentials.

## Build

```bash
npm run build
```

Produces a static export in `out/` (`output: "export"` in
[next.config.mjs](next.config.mjs)), which is what
[.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) uploads to
GitHub Pages.
