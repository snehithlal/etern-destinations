# Etern Destinations

A modern, mobile-first cottage website for Wayanad, Kerala. Built with **Astro, TypeScript, Tailwind CSS and Lucide**, with static HTML, responsive local images and locally hosted fonts. No backend, database or paid runtime is required for Phase 1.

## Start here

Requires **Node.js 22.23.4+** (Node 24 LTS recommended) and npm.

```sh
npm ci
cp .env.example .env
npm run dev
```

Open the local URL printed by Astro (normally http://localhost:4321). To check the production output:

```sh
npm run verify
npm run preview
```

The deployable site is generated in `dist/`. For the browser suite:

```sh
npx playwright install chromium webkit
npm run build
npm run test:browser
```

If running in a restricted environment, `ASTRO_TELEMETRY_DISABLED=1 npm run verify` avoids writing Astro telemetry preferences outside the project.

## What is implemented

- Home, Cottage, Gallery, Explore Wayanad, Location & Contact, Privacy and 404 pages.
- Responsive menu; gallery filters and keyboard-accessible photo dialog.
- Responsive WebP image generation at build time; no image CDN dependency at runtime.
- Page titles/descriptions, canonicals, social metadata, sitemap and robots output.
- Preview mode: noindex, blocked crawling, and a visible placeholder photography notice.
- Configurable phone, WhatsApp, email, map and future external booking links.
- Static deployments compatible with Cloudflare Pages, Vercel and GitHub Pages base paths.
- Build-output verification and Playwright accessibility/navigation checks.

## Important current state

This is a **design preview**, not a live reservation website. Stock images are inspiration, not actual property photographs. Exact address, contact details, capacity, amenities, policies and production domain were not supplied; no substitute facts or contact numbers were invented. Missing contact channels are hidden. Confirm them before launch.

`PUBLIC_SITE_LIVE=false` is intentional. Read the launch checklist before enabling indexing. Phase 2 booking, payments, enquiry submission and OTA synchronization are documented but not implemented.

## Where to make changes

| Task | Location |
| --- | --- |
| Name, contact channels, location, future booking URL | `src/data/site.ts` |
| Photo imports, alt text, gallery captions | `src/data/photos.ts` |
| Original images | `src/assets/images/` |
| Page content | `src/pages/` |
| Colors, typography, layout | `src/styles/global.css` |
| Shared SEO, metadata, layout | `src/layouts/Layout.astro` |
| Production URL, base path, indexing | Deployment environment / `.env` |

## Documentation

- [Architecture and decisions](doc/architecture.md)
- [Editing content and photographs](doc/content-guide.md)
- [Hosting and deployment](doc/deployment.md)
- [SEO and launch checklist](doc/seo-and-launch.md)
- [Developer and owner handover](doc/handover.md)
- [Phase 2 booking plan](doc/phase-2.md)
- [Image sources and licensing](doc/asset-sources.md)
- [Verification record](doc/verification.md)

No deployment, domain purchase, repository creation or vendor subscription has been performed. Use the property owner's accounts for production assets and services.
