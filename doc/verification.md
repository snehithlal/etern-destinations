# Verification record

Verified locally on 12 November 2026 using Node 24.13.0, Astro 7.4.11 and the committed npm lockfile.

## Automated results

| Check | Result |
| --- | --- |
| Astro/TypeScript diagnostics | 0 errors, 0 warnings, 0 hints |
| Static production build | Passed; six main routes plus 404, robots and sitemap |
| Build-output tests, root URL | 8 passed |
| Build-output tests, `/etern-destinations` base path | 8 passed |
| Indexed-mode build in a separate temporary directory | 8 passed; index/follow and sitemap robots output verified |
| Playwright browser suite | 11 passed, 1 intentionally skipped |
| npm install audit | 0 reported vulnerabilities at installation |

The browser suite used desktop Chromium, mobile Chromium (Pixel emulation) and mobile WebKit (iPhone emulation). The desktop project skips the mobile-menu-only test by design.

Coverage includes all six main pages, loaded photographs, horizontal overflow, JavaScript errors, axe WCAG A/AA checks, gallery filtering, keyboard photo navigation, Escape/close, focus restoration, mobile menu navigation and content/navigation without JavaScript.

Additional viewport checks at 360px and 768px found no horizontal overflow across all six routes. The normal browser projects cover desktop, 412px Android and 390px iPhone widths.

The indexed-mode check used a test-only `.test` origin and wrote to `/private/tmp/etern-live-build`; it did not publish a site or change the default preview/noindex setting.

## Visual review

Desktop and mobile home screenshots were reviewed. Gallery desktop and Contact mobile screenshots were also captured for handover:

- [Home desktop](preview/home-desktop.png)
- [Home mobile](preview/home-mobile.png)
- [Gallery desktop](preview/gallery-desktop.png)
- [Contact mobile](preview/contact-mobile.png)

## Limits

No production deployment, real-device test, Lighthouse score, real-user Core Web Vitals or Google indexing result is claimed. Automated accessibility checks are useful but do not establish complete accessibility compliance. Actual property photos, contact routes, business structured data and booking operations need verification after the owner supplies details.

The included GitHub CI and Pages workflows were authored locally; they have not run on an owner repository. Hosting compatibility is supported by static output and the tested subfolder build, not by a completed remote deployment.

## Reproduce

```sh
npm ci
npm run verify
npx playwright install chromium webkit
npm run test:browser
SITE_URL=https://example.github.io BASE_PATH=/etern-destinations npm run build
BASE_PATH=/etern-destinations npm test
# Restore normal output after the subfolder check:
npm run build
```

For a sandbox that blocks home-directory telemetry preferences, prefix Astro commands with `ASTRO_TELEMETRY_DISABLED=1`. Browsers for this verification were installed under `/private/tmp/etern-playwright`; set `PLAYWRIGHT_BROWSERS_PATH` to that path only when using those local test installations.

## Node 26 development setup update — 12 November 2026

The project now pins Node 26.13.1 LTS in `.nvmrc`; package engine metadata and GitHub Actions are aligned with it. The earlier browser results above remain the original Node 24 verification record.

Rechecked under the official Node 26.13.1 binary with npm 11.20.0:

- Astro/TypeScript: 0 errors, 0 warnings, 0 hints.
- Production static build: passed.
- Generated-page tests: 8 passed.
- Git ignore checks: local env files, dependencies, build output, hosting caches, logs and test output are ignored; source, README, handover docs, lockfile, `.nvmrc` and `.env.example` remain trackable.

Node was downloaded to a temporary validation directory and its SHA-256 was checked against the official release checksum. No global Node installation was changed, and no development or preview server was started for this update. Browser tests were not rerun for these documentation/runtime configuration changes.
