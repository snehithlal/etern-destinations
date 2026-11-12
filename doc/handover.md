# Project handover

## Delivery

Phase 1 is a local static website implementation. No repository remote, production deployment, custom domain, paid service or OTA account has been created. The folder can be opened directly in an editor and deployed after the launch inputs are supplied.

## Owner handover

Start with `README.md`, then `content-guide.md` and `seo-and-launch.md`.

The website currently presents a mood board and the proposed stay. Actual property information was not supplied. Owner-approved photographs and property facts are the main remaining launch work. Phone/email/WhatsApp/map fields are null rather than invented; configure them to activate those contact routes.

Contact forms, real-time availability, payment, guest accounts and OTA synchronization belong to Phase 2 and are not functioning features in this delivery. The site does not pretend to accept reservations or store submitted enquiries.

## Developer handover

1. Use Node 24 LTS and `npm ci`.
2. Copy `.env.example` to `.env` for local configuration; retain preview mode while developing.
3. Run `npm run dev`.
4. Read `architecture.md` before changing URL generation, metadata or image handling.
5. Run `npm run verify` for type/build/static checks.
6. Install Playwright browsers and run the browser suite after interactive/layout changes.
7. Read `deployment.md` for host configuration and nested-path support.

### Key design choices

- Astro static output; no runtime server dependency.
- Custom components rather than a general-purpose UI kit.
- Local fonts and photographs; no third-party requests needed to render the site.
- Simple contact links rather than an unconnected form.
- Small interactive scripts with no-JavaScript fallbacks.
- Build-time environment configuration, not runtime settings.

### Known limitations

- Stock photography; source references in `asset-sources.md`.
- Unconfirmed property details are explicitly identified in copy.
- No accommodation entity in JSON-LD until facts are verified.
- No persistent enquiry inbox or booking backend.
- Gallery filter counts are currently fixed to the six configured images.
- No production host/browser-on-real-phone verification until a deployment exists.
- Owner contact information and social profile were not provided.

### Handover of accounts at launch

The owner should control the domain registrar, DNS, GitHub repository, hosting, contact channels, Search Console and later booking/channel-manager accounts. Document access owners and recovery methods privately; do not commit credentials to this repository.

## Normal update procedure

Create a descriptive `feat/`, `fix/` or `chore/` branch; edit; verify; review a preview; merge; deploy. Do not use the `codex/` branch prefix. Keep the lockfile in version control. Back up original photography outside the generated `dist/` output.

## Troubleshooting and rollback

Use the deployment dashboard to return to the last known working version. A content rollback is a source revert plus rebuild. Contact and domain changes also require rebuilds. Hosting a static export means there is no service process or database to restart.

## Next milestone

Approve Phase 1 content and imagery, deploy to the owner's domain, and then evaluate a booking engine/channel manager using the acceptance scenarios in `phase-2.md`.
