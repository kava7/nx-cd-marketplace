# NX/CD Marketplace MVP Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Implement and verify a bilingual static-export NX/CD indicator marketplace MVP aligned with the existing PRD, UI design, development plan, and TODO.

**Architecture:** Next.js 14 App Router lives in `src/app/[locale]`, with a client `LocaleProvider` loading static dictionaries from `src/locales`. Static product, signal, alert, and sector data drive all pages. Shared client components handle tabs, simulated payment, scanning, real-time alert logs, and forms.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, lucide-react, Vitest, React Testing Library.

---

## Task 1: Scaffold and Configuration

- Create `package.json`, Next, TypeScript, Tailwind, PostCSS, ESLint, Vitest, and Cloudflare static-export configuration.
- Create `src/app/[locale]` route tree, global CSS, static assets, and environment example.
- Verification: `npm install`.

## Task 2: Core Types, Data, Locale, and Utilities

- Add product, signal, alert, sector, and subscription data.
- Add locale dictionaries and `LocaleContext`.
- TDD: `formatPrice` and locale lookup tests fail first, then pass.

## Task 3: Shared UI Components

- Add Navbar, Footer, LocaleLink, ProductCard, ImageCarousel, PaymentModal, tabs, SubscribeCard, AlertLog, SignalTable, SectorStrengthList, ContactForm, and loading helpers.
- TDD: PaymentModal, SignalTable, AlertLog, and ContactForm tests fail first, then pass.

## Task 4: Pages

- Implement `/zh` and `/en` pages for home, indicators, indicator detail, screener, alerts, sector strength, contact, purchase success, not found, and error boundary.
- Verify locale routes and static params.

## Task 5: Acceptance Audit and Repair

- Compare PRD acceptance items, TODO task groups, and actual files.
- Repair missing P0/P1 gaps found during audit.
- Run `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, and a final checklist.
