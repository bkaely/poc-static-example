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

The home page ([app/page.js](app/page.js)) fetches the book list from the API
in [src/api](../api) at runtime, client-side. The API URL is currently
hard-coded — there's no local API running, no books render (the page shows an
error state instead). See the root README for how to run the API alongside
this site.

## Build

```bash
npm run build
```

Produces a static export in `out/` (`output: "export"` in
[next.config.mjs](next.config.mjs)), which is what
[.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) uploads to
GitHub Pages.
