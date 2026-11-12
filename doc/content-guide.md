# Content and image editing

## Property information

Edit `src/data/site.ts`. Phone and WhatsApp values must be supplied by the owner. Set `phone` to an international number with `+`; set `whatsapp` to digits including country code, without `+` or spaces. Set email, exact address and a verified directions URL. Absent channels are intentionally hidden.

The prose and FAQ answers live in their corresponding files under `src/pages/`. Do not infer capacity, parking, food, pet rules, Wi-Fi, views, accessibility, check-in times, prices or cancellation policy from placeholder pictures.

Replace the provisional text on the Cottage and Contact pages when these facts are available. The regional coordinate text on Home is explicitly regional, not the cottage's exact location; replace or remove it when the actual address is approved.

## Replacing photographs

1. Obtain the owner's actual property photographs and permission to publish them.
2. Replace the JPG files in `src/assets/images/`, preserving filenames, or update imports in `src/data/photos.ts`.
3. Update each alt text to describe the actual image; remove the inspiration wording only once it is accurate.
4. Update captions and categories. If adding/removing pictures, update the displayed filter counts in `src/pages/gallery.astro`.
5. Check portrait crops on mobile. Adjust the relevant CSS `object-position` where needed.
6. Replace `public/social.jpg` with a branded landscape sharing image (1200 × 630 recommended).
7. Review all inspiration labels in Home, Cottage, Gallery, Explore and the social image alt text.
8. Run `npm run verify`, then review the production preview on mobile and desktop.

Astro automatically creates responsive image variants during the build. Imported images include dimensions to reduce layout shifts. Only the main hero and the first images on dedicated pages are loaded eagerly.

## Copy and SEO

Write original copy describing this cottage and its actual location. Keep page titles concise and descriptions specific. Update the title/description passed to each page's Layout. Use one H1 per page and keep subsequent headings meaningful.

When adding a route, add it to navigation where useful and use `href('/your-route/')` for its internal links. Run the link checks after every change.

## Adding contact links later

The header and mobile menu already provide a prominent route to Contact. Once phone/WhatsApp/email are configured, the Contact page and footer expose working channels. No server or form service is needed for those links.

## Branding

The current wordmark/favicon are original provisional artwork. Replace them with approved brand assets when available. Typography and colors are centralized at the top of `src/styles/global.css`; the Brand component controls the shared wordmark.
