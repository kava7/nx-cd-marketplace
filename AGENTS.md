# NX/CD 商城 — AGENTS.md

## Project Overview

A bilingual (zh/en) stock indicator marketplace for retail investors trading US, Japan, and HK equities. Built with Next.js 14 App Router + TypeScript + Tailwind CSS.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `next-intl`, `lucide-react`, `lightweight-charts`. Deploy target: Vercel.

**Pages:** `/` (home), `/store` (marketplace), `/store/[productId]` (detail), `/contact`. i18n paths: `/zh/*`, `/en/*`.

---

## Build / Lint / Test Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Type-checking
npx tsc --noEmit

# Lint (ESLint)
npm run lint

# Format check (Prettier)
npx prettier --check .

# Format fix
npx prettier --write .

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run a single test file
npm test -- path/to/test.ts

# Run tests matching a pattern
npm test -- -t "component name"

# Run tests with coverage
npm test -- --coverage
```

---

## Code Style & Conventions

### Imports

- Use `import` (not `require`). Path aliases via `@/` (maps to `src/`).
- Group imports in order: (1) Node built-ins / external libs, (2) `@/` aliases, (3) relative imports — separate groups with a blank line.
- Prefer named exports over default exports (except for pages, layouts, and `next.config`).

### File & Directory Naming

| Type | Convention | Example |
|------|-----------|---------|
| Pages/routes | `kebab-case` | `product-detail.tsx` |
| Components | `PascalCase` | `ProductCard.tsx` |
| Hooks | `camelCase`, prefixed `use` | `useCart.ts` |
| Utils | `camelCase` | `formatPrice.ts` |
| Locale JSON | `kebab-case` | `zh.json`, `en.json` |

### Types

- Define shared types in `src/types/` or colocated near use. Prefer `interface` over `type` for object shapes; use `type` for unions.
- Use `Product`, `CartItem`, `Order`, `StockSignal`, `Alert` as core domain types.
- Avoid `any`. Use `unknown` when the type is truly unknown. Prefer explicit typed returns on all functions.

### React / Next.js

- Use **Server Components** by default. Only add `'use client'` when interactivity (state, effects, event handlers) is needed.
- Data fetching in Server Components using `async` functions — no `useEffect` for data unless unavoidable.
- Pages and layouts must be default exports. All other components should be named exports.
- Use `next-intl` for all user-facing strings. Never hardcode text in components — add keys to locale JSON.
- Route groups `(zh)` / `(en)` for shared layouts per locale.

### Styling

- Tailwind CSS utility classes. No CSS modules or styled-components.
- Dark theme: `bg-[#0D1117]` (page), `bg-[#161B22]` (cards), glassmorphism via `backdrop-blur-xl bg-white/5 border border-white/10`.
- Accent colors: `text-cyan-400` / `border-cyan-400` (#00F0FF, bullish), `text-amber-400` (#FFB800, alerts).
- Candlestick colors: Chinese convention — red for up, green for down.
- Font: `Inter` (body), `JetBrains Mono` (numbers/ticker symbols). Configured in `layout.tsx` via `next/font`.
- Mobile-first responsive design.

### Error Handling

- Use React `error.tsx` error boundaries at route segment level.
- API routes: return `NextResponse.json({ error: string }, { status })`.
- Form validation on both client (react state) and server (zod).
- Catch async errors in Server Components and render a fallback UI; do not swallow errors silently.
- `console.error` in dev only — no `console.log` in production code.

### State Management

- Cart state: React Context (`useContext`) wrapping the provider in the root layout.
- No Redux or external state library. Server state through Next.js data fetching only.
- Simulated payment flow: local state + setTimeout transitions (no real payment integration).

### Testing

- Vitest + React Testing Library.
- Test files colocated: `ComponentName.test.tsx` next to the component.
- Test behavior, not implementation. Prefer `getByRole` and `findByText` over test IDs.
- Snapshot tests for stable UI only.

### Internationalization

- All UI strings in `messages/zh.json` and `messages/en.json`.
- Use `next-intl` `useTranslations()` hook in client components; `getTranslations()` in Server Components.
- Currencies: Chinese prices in `¥` (yuan), English prices in `$` (USD). Format via a `formatPrice()` util.

### Git

- Commit messages in English, imperative mood: `"Add stock screener table component"`.
- Branch names: `feat/`, `fix/`, `chore/` prefixes.

### Performance

- Image optimization via `next/image`. Product screenshots served as static SVGs or WebP.
- `next/dynamic` for heavy components (chart libraries, terminal-style alert log).
- Keep bundle size in check — avoid large dependencies.

### Security

- No secrets, API keys, or tokens in code. Use `NEXT_PUBLIC_*` env vars only for public-facing config.
- Sanitize any user input in contact forms before processing.
- Discord webhook URLs are user-provided — never log them to server-side consoles in production.
