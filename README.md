# Little Steady

A finished sales-page frontend at `/` and a simple static thank-you redirect at `/thank-you`. React, TypeScript and Vite. The offer is one €37 EUR/month membership: Calmer Tantrums and Calmer Mealtimes to keep, plus the AI parenting helper in Messenger during the paid period. No upfront joining fee, separate book purchase or chatbot upgrade.

Whop handles checkout and paid access. This repository does not build billing, accounts, purchase verification or the chatbot itself.

## Run

```sh
cd /workspace/Little-Steady
npm ci
npm run dev -- --port 5173
```

Use Node 22.12+ (tested with Node 24.19). Use the existing checkout; cloud tasks are already isolated. Do not create a Git worktree unless explicitly requested.

`npm run build` produces `dist/`. `npm run preview` serves the production build locally.

## Connect the checkout and access links

All public settings are in `src/config.ts`:

- `offer.price`: €37 EUR/month. The sales page shows the amount once in the offer block; buttons and captions do not repeat it. The thank-you page shows it once in the membership summary.
- `offer.links.checkout`: the single Whop checkout URL. Adding a valid URL enables the final checkout button; until then it says “Checkout opens soon” and cannot take payment. Set it only when the advertised service is ready to fulfil.
- `offer.links.library`: your actual Whop purchase-library destination.
- `offer.links.messenger`: the actual Messenger member-access route. Until supplied, the thank-you page directs customers to the access instructions in their Whop purchase.
- `offer.links.manage`, `refund`, `privacy`, `terms`: final service and policy destinations, when supplied.
- `offer.support` and `offer.seller`: actual contact and legal seller details. No placeholders are published.
- `offer.logo`: the supplied original logo, used in both page headers and the footer. The original JPEG and an SVG presentation master are retained in `public/brand/`; the site loads an optimised WebP.

The frontend does not validate fulfilment. Configure the Whop membership to include both ebooks on first purchase, keep them accessible under the promised cancellation terms, and manage Messenger entitlement for the paid period. Include actual activation instructions in Whop. Test those external flows before enabling the checkout link. Do not put secrets in browser code.

The owner requested the 14-day money-back guarantee, and `offer.refund.enabled` is now true. Customers can request a full refund of their first membership payment within 14 days of the first purchase, without completing lessons or proving an approach failed. A successful refund must also stop future billing. Later monthly payments are not covered by this introductory guarantee. Configure the matching policy and refund/help process in Whop before enabling checkout: publishing this frontend policy does not itself automate refunds or cancel billing.

## Ebook covers

New original illustrated covers are in `public/covers/`:

- `calmer-tantrums.png` and `calmer-mealtimes.png`: full-resolution 1024×1536 front covers.
- `*-320.webp` and `*-640.webp`: optimised responsive versions for the sales page.

The illustrations are generated artwork, not customer/founder photos or representations of existing ebook pages. The website uses the supplied original logo. Ebook covers still use their existing plain brand text; the page-logo update does not alter those cover illustrations. See [content notes](docs/claims-and-readiness.md).

## Thank-you redirect

After deployment, set the Whop after-purchase redirect to your domain’s `/thank-you` route. It is a static welcome page with three starting steps, copyable question suggestions, membership terms and help directions. It does not verify a purchase, show an invented renewal date, unlock paid files or fire a purchase analytics event.

Whop remains the source of actual receipt and membership details. No live app activation is implied just by visiting the redirect page.

## Deploy on Vercel

Import `Martin00550/Little-Steady`, keep root directory `./`, use Node.js 24.x and deploy. `vercel.json` configures Vite, `npm ci`, `npm run build`, the `dist` directory and SPA rewrites so `/thank-you` loads directly. No environment variables are required for these frontend pages.

## Checks

```sh
npm run build
npm test
npm run test:e2e
npm run format:check
```

Browser tests use `/usr/bin/chromium` or `CHROMIUM_PATH`. They cover mobile/tablet/desktop layouts, image loading, accessibility, keyboard controls, price consistency and copy buttons. Analytics is disabled. Optional hooks record CTA, preview and checkout handoff events only after their configured consent gate; no chat or children’s information is included.

See [design and copy notes](docs/design-and-copy.md) and [the current offer](docs/pricing-and-offer.md).
