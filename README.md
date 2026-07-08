# poc-static-example

A minimal Next.js app statically exported and deployed to GitHub Pages, at
<https://bkaely.github.io/poc-static-example/>

This is a proof of concept that Next.js can flow through the GitHub Pages
hosting pipeline. It will later connect to a separate API repo for auth and
book listings.

## Development

```bash
npm install
npm run dev
```

## Deployment

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds a static export (`next build` with `output: "export"`) and
publishes it via GitHub Pages' "Deploy from GitHub Actions" flow.
