# NX/CD 指标商城 — AGENTS.md

## Project Overview

A bilingual (zh/en) stock indicator marketplace for retail investors trading US, Japan, and HK equities. Built with Next.js 14 App Router + TypeScript + Tailwind CSS. Static export (`output: 'export'`) deployed to Cloudflare Pages.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `lucide-react`, `tailwindcss-animate`, `lightweight-charts` (future). Deploy target: Cloudflare Pages.

**Pages:** `/` (home), `/indicators` (marketplace), `/indicators/[id]` (detail), `/screener`, `/alerts`, `/sector-strength`, `/contact`, `/purchase-success`. i18n via `app/[locale]/` dynamic routing: `/zh/*`, `/en/*`.

**i18n:** React Context dictionary (no `next-intl`). `LocaleContext` provides `t(key)` for dot-path lookups into `locales/zh.json` / `locales/en.json`. Language persisted in localStorage.

---

## Build / Lint / Test Commands

```bash
npm install            # Install dependencies
npm run dev            # Development server (http://localhost:3000)
npm run build          # Production build (outputs out/)
npm run start          # Start production server
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm test -- path/to/test.ts      # Run a single test file
npm test -- -t "pattern"         # Run tests matching a pattern
npm test -- --coverage           # Run tests with coverage
npx tsc --noEmit       # Type-check (no output files)
npm run lint           # ESLint (next lint)
npx prettier --check . # Format check
npx prettier --write . # Format fix
npx serve out          # Preview static export locally
```

---

## Code Style & Conventions

### Imports

- Use `import` (not `require`). Path alias `@/` maps to `src/` or root.
- Group: (1) external libs, (2) `@/` aliases, (3) relative — separate groups with a blank line.
- Prefer named exports over default exports (except for pages, layouts, `next.config`).

### File & Directory Naming

| Type | Convention | Example |
|------|-----------|---------|
| Pages/routes | `kebab-case` | `sector-strength/page.tsx` |
| Components | `PascalCase` | `ProductCard.tsx` |
| Contexts | `PascalCase` | `LocaleContext.tsx` |
| Hooks | `camelCase`, prefixed `use` | `useLocale.ts` |
| Utils | `camelCase` | `formatPrice.ts` |
| Locale JSON | `kebab-case` | `zh.json`, `en.json` |
| Data files | `kebab-case` | `mock-signals-us.ts` |

### Types

- Define shared types in `src/types/` or colocated. Prefer `interface` over `type` for object shapes; use `type` for unions.
- Core domain types: `Product`, `StockSignal`, `Alert`, `CartItem`, `SubscriptionPlan`, `Market` (`'us' | 'jp' | 'hk'`), `SignalStrength` (`'强' | '中' | '低'`).
- Avoid `any`. Use `unknown` when truly unknown. Prefer explicit typed returns on all functions.
- Enable `strict: true` in `tsconfig.json`.

### React / Next.js

- **Server Components by default** (no `'use client'`). Only add `'use client'` for interactivity (state, effects, event handlers, Context usage).
- Data fetching from local JSON/TS files only — no API routes (static export).
- Pages and layouts are default exports. All other components should be named exports.
- All user-facing strings via `useLocale().t('key')` — never hardcode text. Keys in `locales/{zh,en}.json`.
- Route group `app/[locale]/` for dynamic i18n routing. All pages live under `[locale]/`.

### Styling

- Tailwind CSS utility classes only. No CSS modules or styled-components.
- Dark theme color tokens (from PRD):
  - `bg-[#0B0E11]` (page background), `bg-[#1E2329]` (cards), `border-[#2B3139]` (default border), `border-[#363E47]` (hover border)
  - `accent-green: #0ECB81` (up/buy/CTA), `accent-red: #F6465D` (down/sell/danger), `accent-cyan: #00F0FF` (brand/links), `accent-amber: #FFB800` (warnings)
  - Text: `text-white` (primary), `text-[#EAECEF]` (body), `text-[#848E9C]` (muted)
- Glassmorphism: `backdrop-blur-xl bg-black/60 border-b border-[#2B3139]`
- CTA buttons: `bg-gradient-to-r from-[#0ECB81] to-[#00C896]` with hover glow `shadow-[0_0_20px_rgba(14,203,129,0.5)]`
- Candlestick colors: Western convention — green (#0ECB81) for up, red (#F6465D) for down.
- Font: `Inter` (headings, via `next/font/google`), `JetBrains Mono` (numbers/ticker symbols), system font (body).
- Mobile-first responsive design. Breakpoints: sm:640 / lg:1024.
- `prefers-reduced-motion: reduce` — disable all animations.

### Error Handling

- React `error.tsx` error boundaries at route segment level (under `[locale]/error.tsx`).
- No API routes (static export); form submissions via Discord Webhook `fetch()`.
- Form validation on both client (required + live validation) and server (Discord side).
- `console.error` in dev only — no `console.log` in production code.
- 404 via `not-found.tsx` under `[locale]/`.

### State Management

- i18n state: React Context (`LocaleContext`) wrapping the root layout.
- Cart state: not implemented (purchase flow is direct, no cart).
- Simulated payment: `PaymentModal` + Discord Webhook + `router.push` to `/purchase-success`.
- No Redux or external state library.

### Testing

- Vitest + React Testing Library.
- Test files colocated: `ComponentName.test.tsx` next to the component.
- Test behavior, not implementation. Prefer `getByRole` and `findByText` over test IDs.
- Snapshot tests for stable UI only.
- TDD tasks: `LocaleContext`, `formatPrice`, `PaymentModal`, `SignalTable`, `AlertLog`, `ContactForm`.

### Internationalization

- All UI strings in `locales/zh.json` and `locales/en.json` (same key structure).
- React Context `useLocale()` returns `{ locale, setLocale, t(key) }`. `t()` supports dot-path traversal.
- Currency: Chinese `¥{price}`, English `${price}`. Via `formatPrice(price, locale)`.
- Language persisted in `localStorage`. Set via `setLocale('zh'|'en')`.
- Navbar language button switches locale + updates route path.

### Git

- Commit messages in English, imperative mood: `"Add SignalTable sortable column headers"`.
- Branch names: `feat/`, `fix/`, `chore/` prefixes.

### Performance

- Static export — all pages pre-rendered at build time.
- `next/image` with `images.unoptimized: true` (static export requirement).
- `next/dynamic` for heavy components (chart libraries, alert log).
- Keep bundle size small — no unnecessary dependencies.

### Security

- No secrets, API keys, or tokens in code. Use `NEXT_PUBLIC_*` env vars only for public-facing config (e.g., `NEXT_PUBLIC_DISCORD_WEBHOOK_URL`).
- Discord webhook URL is user-provided via form input — never log server-side in production.
- Ensure all form inputs are reasonably sanitized before sending via webhook.
