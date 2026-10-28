# Little Steady sales page

A mobile-first sales page at `/` and a simple post-purchase thank-you page at `/thank-you`, built with React, TypeScript and Vite. Whop handles checkout and paid access. There is no payment verification, account system or AI backend.

## Run

```sh
cd /workspace/Little-Steady
npm ci
npm run dev -- --port 5173
```

Requires Node 22.12+; tested with Node 24.19. Use the existing checkout; do not create a Git worktree unless explicitly requested.

`npm run build` produces `dist/`. `npm run preview` serves that build locally.

## Add the Whop checkout links

Edit `src/config.ts`:

- `offer.guides`: the €47 EUR one-time price, the books-only Whop checkout URL and confirmed terms.
- `offer.chatbot`: proposed €12.99 EUR/month, a separate **combined books + chatbot** Whop checkout URL, confirmed terms and actual availability.
- Shared library, Messenger, support and policy links remain optional until supplied.

The combined first charge is calculated as €47 + €12.99 = €59.99, with only €12.99 renewing from month two. Do not set the combined URL until the real Whop checkout implements exactly that schedule. Whop’s support for that payment configuration remains unverified. There is no local billing code.

Both checkouts are closed in this preview. Books-only purchasing is independent of chatbot readiness. The monthly price and first-chatbot-payment guarantee are proposals. No book refund guarantee is invented. No real ebook files or logo were provided; readable excerpts and actual product details still need review.

See [pricing and offer notes](docs/pricing-and-offer.md) for the recommendation, its assumptions and the live-research limitation.

## Checks

```sh
npm run build
npm test
npm run test:e2e
npm run format:check
```

Browser tests use `/usr/bin/chromium`, or `CHROMIUM_PATH` if supplied. They cover mobile/tablet/desktop layouts, accessibility, keyboard controls and CTAs. Analytics is disabled; optional click hooks send no chat text or child information.

See [design and headline notes](docs/design-and-copy.md) and [content notes](docs/claims-and-readiness.md).

## After-purchase redirect

Set your Whop after-purchase redirect to `https://YOUR-DOMAIN/thank-you` once the site is deployed. Configure the host to serve `index.html` for `/thank-you` (SPA fallback). The page is public, static and has no payment checks, purchase events, activation codes or paid files. Whop continues to control actual purchase access.

Optionally supply the exact library and Messenger URLs through `offer.links.library` and `offer.links.messenger`. Until then, it links to Whop and directs buyers to the instructions inside their purchase.

## Deploy on Vercel

1. Import `Martin00550/Little-Steady` into Vercel from GitHub.
2. Keep the root directory as `./` and select the Vite preset. The checked-in `vercel.json` sets installation to `npm ci`, the build to `npm run build`, and output to `dist`.
3. Use Node.js 24.x. No environment variables are needed for the current pages.
4. Deploy. Your sales page is at `/`; the after-purchase redirect is `/thank-you` on the same domain.

The rewrite in `vercel.json` lets direct visits and refreshes on `/thank-you` load the React page. Actual static assets are served by Vercel normally. After deployment, use the resulting full `/thank-you` URL in Whop. Deployments from future pushes can run through Vercel's GitHub integration.
