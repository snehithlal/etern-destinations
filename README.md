# Etern Destinations

A modern, mobile-first cottage website for Wayanad, Kerala. Built with **Astro, TypeScript, Tailwind CSS and Lucide**, with static HTML, responsive local images and locally hosted fonts. No backend, database or paid runtime is required for Phase 1.

## Development installation and setup

### 1. Install Node.js

Use **Node.js 26.13.1 LTS**, pinned in `.nvmrc` and `.tool-versions`. Both GitHub Actions workflows read this file, so local development and CI use the same version. `package.json` supports Node 26 starting at this patch release.

Choose **nvm or asdf** below; you only need one Node version manager for this project.

#### Option A: nvm

For macOS/Linux, install [nvm using its official instructions](https://github.com/nvm-sh/nvm#installing-and-updating), then open a new terminal. If nvm is already installed, skip its installation.

```sh
cd /Users/snps/Documents/workspace/etern-destinations
nvm install
nvm use
node --version
npm --version
```

`node --version` should print `v26.13.1`. npm is included with Node; no global Astro installation is needed. On another computer, use the path where you checked out this project. Windows users can install this version from the [official Node.js downloads](https://nodejs.org/en/download) and run the remaining commands in their project directory.

#### Option B: asdf

For macOS with Homebrew, install asdf and the Node plugin dependencies:

```sh
brew install asdf gpg gawk
```

With current asdf (0.16+), add this line once to `~/.zshrc`:

```sh
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"
```

For Bash or Linux, follow the [official asdf installation and shell setup](https://asdf-vm.com/guide/getting-started.html), including the Node plugin dependencies. Open a new terminal after configuring the shell.

Add the [Node.js plugin](https://github.com/asdf-vm/asdf-nodejs) once; skip this command if `asdf plugin list` already shows `nodejs`:

```sh
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

Then install the project's version:

```sh
cd /Users/snps/Documents/workspace/etern-destinations
asdf install
asdf current nodejs
node --version
npm --version
```

The included `.tool-versions` selects Node **26.13.1** automatically inside this directory. No global version change, `asdf local`, or `.nvmrc` compatibility setting is needed. `node --version` should print `v26.13.1`. Continue with step 2 below.

If another Node installation takes precedence, run `type -a node` and check that the asdf shims directory comes first in `PATH`. Avoid activating nvm in the same shell when using asdf.

The version was checked against the [official Node.js 26.13.1 LTS release](https://nodejs.org/en/blog/release/v26.13.1) on 12 November 2026. When upgrading later, update `.nvmrc`, `.tool-versions`, the package engine requirement, lockfile metadata and setup documentation together, then verify the build.

### 2. Install dependencies

```sh
npm ci
```

Use `npm ci` for initial installation and clean checkouts: it installs the exact dependency versions from `package-lock.json`. Use `npm install <package>` only when intentionally changing dependencies, and commit the updated lockfile.

### 3. Configure the local environment

On the first setup, copy the example configuration:

```sh
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env`. Do not overwrite an existing `.env` when returning to the project.

The defaults are safe for local development:

| Variable | Local value | Purpose |
| --- | --- | --- |
| `SITE_URL` | `https://example.com` | Canonical and sitemap origin; replace with the real domain before launch |
| `BASE_PATH` | `/` | Use a repository prefix only for subfolder hosting |
| `PUBLIC_SITE_LIVE` | `false` | Keeps the design preview out of search indexing |

Restart the development server after changing environment variables. Never put secrets in `PUBLIC_` variables. `.env` files are ignored by Git; `.env.example` stays versioned.

### 4. Start development

```sh
npm run dev
```

Open the local URL printed by Astro, normally http://127.0.0.1:4321. Changes to source files reload automatically. Press **Ctrl+C** in the server terminal to stop development.

No backend, database, API keys or booking-provider account is needed for Phase 1.

### 5. Verify and preview the production build

```sh
npm run verify
npm run preview
```

`verify` runs type checking, the static build and the generated-page tests. The deployable output is `dist/`; do not edit generated files there. `preview` serves the built output, so run a new build after source changes. Astro may run preview as a background process; use `npx --no-install astro preview stop` to stop it if needed.

For browser and accessibility checks:

```sh
npx playwright install chromium webkit
npm run build
npm run test:browser
```

On Linux, use `npx playwright install --with-deps chromium webkit` if browser system libraries are missing.

### Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with automatic reload |
| `npm run check` | Astro/TypeScript diagnostics |
| `npm run build` | Generate the static site |
| `npm test` | Verify generated pages; requires a build first |
| `npm run verify` | Run type checks, build and static tests |
| `npm run preview` | Serve the production build locally |
| `npm run test:browser` | Run Playwright checks; requires a build and installed browsers |

If `nvm` is not found, reopen the terminal and check the shell setup in its installation guide. If npm reports an unsupported Node version, run `nvm use` for nvm, or `asdf install` and `asdf current nodejs` for asdf, in this directory. If port 4321 is occupied, use the URL Astro prints or choose a port with `npm run dev -- --port 4322`.

In a restricted environment, `ASTRO_TELEMETRY_DISABLED=1 npm run verify` avoids writing Astro telemetry preferences outside the project.

## Git ignore rules

The `.gitignore` excludes installed dependencies, Astro/build caches, generated output, local environment files, logs, test reports, coverage, OS files and personal IDE settings. Keep `package-lock.json`, `.nvmrc`, `.tool-versions`, `.env.example`, source photographs and the handover documentation in version control.

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
