# Architecture

## Why Astro

This project is a content website for one whole cottage. Astro prerenders each route to HTML and sends only small scripts for the mobile menu and gallery. Search engines and visitors can read the content without rendering a React application. Next.js would also support prerendered content; its larger application feature set is unnecessary for the chosen external booking approach.

Tailwind is integrated through its Vite plugin. The visual system uses CSS theme tokens and named layout classes to keep the styles understandable. Lucide renders SVG at build time. DM Sans and Cormorant Garamond font files are bundled locally; visitors do not contact Google Fonts.

## Request and build flow

1. Astro reads page templates, typed property configuration and local photographs.
2. The image service generates responsive WebP assets; the sitemap integration generates XML.
3. The static `dist/` directory contains complete pages, CSS, fonts, image variants and the menu/gallery scripts.
4. The hosting CDN serves those files. No application server runs on each visit.

## Important modules

- `src/data/site.ts`: site identity, contacts, optional external links and base-path URL helper.
- `src/data/photos.ts`: local source imports, alt text and gallery metadata.
- `src/layouts/Layout.astro`: document head, SEO metadata, semantic page landmarks.
- `src/components/`: header, brand, footer, section heading and shared call-to-action.
- `src/pages/`: explicit routes; `robots.txt.ts` runs at build time, not as a runtime API.
- `src/styles/global.css`: typography, design tokens, desktop/mobile layouts and reduced-motion styles.

Keep interactive features progressively enhanced. The gallery links open the image itself if JavaScript is unavailable; native details elements power FAQs. A no-script CSS fallback exposes mobile navigation.

## Interfaces

There is no public backend API. `SITE_URL`, `BASE_PATH` and `PUBLIC_SITE_LIVE` are build-time deployment inputs. Contact fields default to null. `bookingUrl` is reserved for a Phase 2 hosted booking engine; it is not a custom API endpoint.

The `href()` helper prefixes internal routes with Astro's build base path. Do not hard-code root-relative internal links in new components. Images imported from the asset directory are resolved by Astro.

## SEO boundaries

The JSON-LD currently describes the website only. Add a suitable accommodation entity after the property's legal identity, address and accommodation details are verified. Do not manufacture reviews, amenities, rates or geographic coordinates for structured data.

## Maintenance

Use the committed npm lockfile and `npm ci`. Review updates periodically, run the verification suite and review image/layout changes before deployment. No framework migration is necessary to add a hosted booking link or a managed enquiry form.
