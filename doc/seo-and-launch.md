# SEO and public launch

## Implemented technical foundation

Static HTML, unique titles/descriptions, semantic headings, canonical URLs, Open Graph/Twitter metadata, sitemap, robots output, website JSON-LD, responsive images, local fonts and reduced JavaScript. These establish a good foundation; they do not guarantee search rankings.

The preview intentionally emits `noindex,nofollow` and `Disallow: /`. Robots rules are not access control; use host access controls if a preview must be private.

## Owner inputs required

- [ ] Approved brand name and logo.
- [ ] Real photographs of the cottage, with publication rights.
- [ ] Exact address and directions URL.
- [ ] Working owner phone, WhatsApp and email.
- [ ] Bedrooms, bathrooms, maximum guests and sleeping arrangements.
- [ ] Accurate amenities, inclusions and accessibility information.
- [ ] Check-in/out, pet/child rules and cancellation terms.
- [ ] Real production domain and owner-controlled hosting/repository accounts.

## Before enabling indexing

- [ ] Replace every placeholder photo, caption, inspiration label and provisional page statement.
- [ ] Configure and click-test every published contact link.
- [ ] Update the social sharing image and its alt text.
- [ ] Confirm `SITE_URL` and `BASE_PATH` for the production URL.
- [ ] Confirm privacy copy matches the chosen host and any added services.
- [ ] Add accurate lodging structured data only after property facts are verified; validate it.
- [ ] Check desktop and mobile layouts, keyboard navigation and gallery controls.
- [ ] Run `npm run verify` and `npm run test:browser`.
- [ ] Run a mobile Lighthouse audit on the final host; aim for 90+ but record actual results.
- [ ] Set `PUBLIC_SITE_LIVE=true` for production only, rebuild, and verify HTML robots and robots.txt both permit indexing.
- [ ] Keep preview deployments non-indexed independently of production settings.

## After launch

1. Verify the domain in Google Search Console and submit the sitemap.
2. Establish or update the owner's Google Business Profile with consistent name/address/phone.
3. Ensure OTAs and other public property profiles use the same facts and website URL.
4. Monitor crawl/indexing reports and fix broken URLs.
5. Measure real mobile performance when enough traffic is available; prioritize slow hero loads and layout shifts.
6. Publish genuinely useful local information with verified distances, timings and access conditions.

Never add fake guest reviews, review scores or facilities to improve SEO. Accommodation structured data does not by itself guarantee a Google vacation-rental rich result; eligibility and additional requirements apply. See [Google's documentation](https://developers.google.com/search/docs/appearance/structured-data/vacation-rental).
