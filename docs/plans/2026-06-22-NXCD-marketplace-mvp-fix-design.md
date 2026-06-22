# NX/CD Marketplace MVP Fix Design

## Goal

Build a verifiable Next.js 14 static-export MVP that satisfies the PRD P0 acceptance checklist for the bilingual NX/CD indicator marketplace.

## Confirmed Scope

- Implement the real app under `src/app/[locale]/`.
- Support `/zh` and `/en` routes with locale-aware navigation.
- Provide core pages: home, indicators, indicator detail, screener, alerts, sector strength, contact, purchase success, not found, and error boundary.
- Use local data only and static export.
- Include payment/subscription/contact simulation with Discord webhook helpers.
- Add focused tests for `formatPrice`, locale lookup, payment modal, signal table, alert log, and contact form.
- Verify with type-check, lint, tests, and production build.

## Approach

Use a compact component set that mirrors the PRD: shared navigation/footer, product cards, payment modal, tabs, signal table, alert log, sector list, and contact form. Keep the UI dark, responsive, bilingual, and static-friendly. Use Vitest and React Testing Library for the behavior named in the plan, plus Next.js build verification for static export.

## Out Of Scope

- Real payment processing.
- Real Discord credentials or secrets.
- Live market data.
- Production deployment to Cloudflare.
