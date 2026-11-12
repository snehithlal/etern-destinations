# Phase 2: bookings, enquiries and OTA synchronization

## Chosen direction

Keep the Astro site static. Link to a hosted booking engine backed by a channel manager and, where useful, a lightweight property-management system. The property is one sellable cottage; a confirmed reservation must consume its whole inventory for the booked nights.

A backend and database exist inside the provider's service. This project does not need its own application database for that model.

## Vendor evaluation

Evaluate Aiosell first because it documents Go-MMT connectivity. Compare at least one alternative if price or features are unsuitable. Do not subscribe without a written one-unit quote and a demonstration of the required behavior.

Required capabilities:

- Whole-cottage inventory, not separate room sales.
- Direct booking engine that works well on mobile and in INR.
- MakeMyTrip/Goibibo connection and inventory/rate-plan mapping.
- Booking, date modification and cancellation updates.
- Manual reservations and maintenance blocks.
- Suitable payment gateway, settlement and refund workflow.
- Owner-controlled account, reservation export, support and sync failure visibility.

Ask about package minimums, setup costs, taxes, commissions, payment processing, SMS and per-channel fees. Target low cost, but the owner has allowed a higher monthly budget when necessary for reliable automation. No budget or vendor contract is approved by this codebase.

## Integration sequence

1. Finalize rates, capacity, stay rules and cancellation policy.
2. Set up and verify the cottage's OTA listings.
3. Connect the chosen provider through the authorized Go-MMT extranet flow.
4. Map one cottage, occupancy and rate plans consistently.
5. Enter all existing bookings/owner blocks before exposing direct availability.
6. Configure payments and booking communications in the provider's system.
7. Run the end-to-end scenarios below using vendor-approved test procedures.
8. Add the hosted booking URL to `site.bookingUrl`. The main header and shared CTA use it.
9. Update contact/privacy copy and add cancellation/terms links required by the service.
10. Rebuild, review and activate direct bookings.

A URL is enough for the first integration; a booking widget can be evaluated later if it preserves mobile accessibility and speed. Do not put OTA tokens or payment secrets into client code.

## Enquiries

Add a managed form service only when Phase 2 begins. Collect name, contact method, requested dates, guest count and message. Include server-side validation/spam controls supplied by that service, delivery monitoring, clear success/error states and a contact fallback. An enquiry must never reserve inventory.

Do not add a frontend-only form that displays success without delivery. Update the privacy notice for whichever service is actually selected.

## Synchronization and cancellations

The intended scope is to receive cancellation events from the originating OTA and update shared availability. It is not a promise that guests can cancel OTA bookings on the cottage site. Refund rules and initiation permissions depend on the booking origin and provider.

Use the booking platform as the inventory source of truth. Enter telephone/WhatsApp reservations there before confirming them. Do not expose an independently maintained availability calendar on the Astro site.

Synchronization can have delays and outages. Require operational visibility and a manual closure procedure; do not claim integrations eliminate all double-booking risk. Do not use delayed iCal import/export as the only control for instant bookings of the same single cottage across channels.

## Acceptance scenarios

- Direct reservation blocks corresponding nights on connected OTAs.
- OTA reservation blocks the direct booking engine.
- Reservation date modification releases/blocks the correct nights.
- Cancellation follows policy and updates availability, respecting other blocks.
- Manual reservations and maintenance prevent sales.
- Adjacent check-out/check-in stays behave correctly.
- Failed/expired payment does not produce an incorrectly confirmed booking.
- Duplicate notifications or retries do not duplicate reservations.
- Concurrent attempts and slow synchronization are demonstrated with the provider.
- Staff can detect sync failure, close inventory and reconcile reservations.
- Actual refund and settlement behavior is verified before launch.

## Custom backend threshold

Only consider custom development if the external services cannot satisfy a demonstrated business requirement. Default future stack: Django + PostgreSQL for custom reservation/admin workflows; Rails is reasonable if the implementing team is stronger in Ruby. A bespoke backend still needs authorized OTA connectivity and payment integrations. It adds maintenance, backups, security and concurrency responsibilities and is outside Phase 1.

References: [Aiosell Go-MMT setup](https://support.aiosell.com/portal/en/kb/articles/how-to-enable-aiosell-as-a-channel-manager-on-makemytrip-goibibo-gommt), [Aiosell pricing](https://aiosell.com/pricing/).
