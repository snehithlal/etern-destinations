# Deployment guide

## Build settings

| Setting | Value |
| --- | --- |
| Framework | Astro |
| Install | `npm ci` |
| Build | `npm run build` |
| Output | `dist` |
| Node | 26.13.1 LTS (see `.nvmrc`) |
| Runtime adapter | None; static output |

Build variables:

```dotenv
SITE_URL=https://your-real-domain.example
BASE_PATH=/
PUBLIC_SITE_LIVE=false
```

`SITE_URL` is the origin, without a repository path. `BASE_PATH` contains any path prefix. These values affect generated files; changing them requires a rebuild. Use the real production URL, not an invented domain. Preview builds stay `PUBLIC_SITE_LIVE=false` and should use their own URL when available.

## Cloudflare Pages: recommended

1. Push the project to an owner-controlled GitHub repository.
2. Create a Pages project from that repository.
3. Set the settings above, and add the three environment variables.
4. Use `main` for production; branch builds are previews.
5. Review the first deployment while still non-indexed.
6. Connect the owner's domain and verify DNS and HTTPS.
7. Complete `seo-and-launch.md`, then enable the live flag only for production and redeploy.

No Workers adapter or database is needed. A normal Phase 1 site targets the free tier within provider limits. Confirm current account terms when creating the project.

## Vercel

1. Import the GitHub repository.
2. Use the detected Astro preset, `npm run build` and `dist`.
3. Set the build variables separately for production and preview.
4. Add the custom domain and verify HTTPS.
5. Follow the same launch checklist.

Select Node 26.x in Vercel build settings. Vercel manages minor/patch updates within that major; the local and GitHub Actions version is pinned in `.nvmrc`.

Static Astro requires no Vercel adapter. Vercel Hobby is restricted to personal/non-commercial use; this cottage business should use a suitable paid plan. Do not select Hobby simply because the code is static.

## GitHub Pages: automatic preview deployment

The Pages workflow deploys automatically whenever a commit is pushed or merged into `main`. You can also start it manually from the Actions tab. GitHub Pages has restrictions on business/transaction-oriented hosting; use it for a permitted personal preview. Cloudflare Pages remains the production recommendation for this business.

One-time setup:

1. Push the project, including `.github/workflows/`, to your GitHub repository on `main`.
2. Open repository **Settings → Pages** and select **GitHub Actions** as the source.
3. Open **Actions → Deploy preview to GitHub Pages → Run workflow** for the first deployment if Pages was enabled after the initial push. No URL inputs or custom secrets are required.
4. Subsequent pushes to `main` build and publish automatically. The deployment job runs only if type checking, build and static tests succeed.

The workflow reads the site origin and base path from `actions/configure-pages`, so the repository owner/name do not need to be hard-coded. It supports repository subfolders and root/custom-domain Pages configurations. `PUBLIC_SITE_LIVE=false` remains fixed for this preview workflow. Pull requests use the separate verification workflow and do not publish.

For a project URL such as `https://OWNER.github.io/etern-destinations/`:

```sh
SITE_URL=https://OWNER.github.io BASE_PATH=/etern-destinations PUBLIC_SITE_LIVE=false npm run build
```

For a local build targeting a root custom domain, use `BASE_PATH=/`. In GitHub Actions, these values come from the Pages configuration automatically. The workflow uploads `dist/` and uses the repository-provided `GITHUB_TOKEN` permissions for deployment. Verify relative paths and nested routes on the actual host after the first deployment.

If the deployment waits for approval, check the repository’s `github-pages` environment protection settings. If the URL changes, update the Pages configuration and rerun deployment. The output uses the URL reported by GitHub; a custom domain must be configured there first.

## CI

The build workflow runs type checking, root and nested-base builds, static link/SEO tests and browser tests. It does not publish a site. GitHub Pages publishing is a separate workflow triggered by pushes to `main` or manually. It runs its own type/build/static checks; the browser checks in the verification workflow are separate and do not gate publishing.

## Rollback and troubleshooting

- Roll back using the hosting dashboard's previous successful deployment, or revert the source change and rebuild.
- Missing CSS/images on a repository path: check `BASE_PATH`, then rebuild.
- Wrong canonical or sitemap origin: correct `SITE_URL`, then rebuild.
- Site absent from search: confirm launch is approved before changing `PUBLIC_SITE_LIVE`; preview blocking is intentional.
- Contact links missing: configure owner-verified contacts in `src/data/site.ts`.
- No availability calendar: expected in Phase 1; see `phase-2.md`.

A build with indexing enabled and an example/local domain is rejected. This is only a guard against an obvious mistake; it does not replace the owner launch checklist.

References: [Astro Vercel](https://docs.astro.build/en/guides/deploy/vercel/), [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [GitHub Pages restrictions](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [Vercel plans](https://vercel.com/pricing).

Workflow metadata reference: [actions/configure-pages URL outputs](https://github.com/actions/configure-pages/blob/v5/action.yml).
