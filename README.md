# NX/CD Indicator Marketplace

Bilingual stock indicator marketplace for retail investors trading US, Japan, and Hong Kong equities.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- lucide-react
- Vitest + React Testing Library
- Static export for Cloudflare Pages

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/zh` or `http://localhost:3000/en`.

## Verification

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

The production build writes static output to `out/`.

## Environment

Copy `.env.example` if you want to test Discord webhook delivery:

```bash
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

The app still works without this variable; payment, subscription, and contact flows remain simulated.

## Cloudflare Pages

Use the build command:

```bash
npm run build
```

Set the output directory to:

```bash
out
```
