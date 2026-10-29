# Little Steady

A sales-page frontend at `/` and a simple static thank-you redirect at `/thank-you`. React, TypeScript and Vite. The offer is one €37 EUR/month membership: Calmer Tantrums and Calmer Mealtimes to keep, plus the AI parenting companion in Messenger during the paid period. No upfront joining fee, separate book purchase or chatbot upgrade.

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

- `offer.price`: €37 EUR/month. The latest owner-supplied copy repeats this same amount in the hero, membership block and join buttons, with clear billing terms. The thank-you page shows it once in the membership summary.
- `offer.links.checkout`: the single Whop checkout URL. Adding a valid URL enables the final checkout button; until then it says “Checkout opens soon” and cannot take payment. Set it only when the advertised service is ready to fulfil.
- `offer.links.library`: your actual Whop purchase-library destination.
- `offer.links.messenger`: the actual Messenger member-access route. Until supplied, the thank-you page directs customers to the access instructions in their Whop purchase.
- `offer.links.manage`, `refund`, `privacy`, `terms`: final service and policy destinations, when supplied.
- `offer.support` and `offer.seller`: actual contact and legal seller details. No placeholders are published.
- `offer.logo`: the supplied original logo, used in both page headers and the footer. The original JPEG and an SVG presentation master are retained in `public/brand/`; the site loads an optimised WebP.

The frontend does not validate fulfilment. Configure the Whop membership to include both ebooks on first purchase, keep them accessible under the promised cancellation terms, and manage Messenger entitlement for the paid period. Include actual activation instructions in Whop. Test those external flows before enabling the checkout link. Do not put secrets in browser code.

The latest owner-supplied copy replaces the voluntary cash-back guarantee. No trial or money-back promise is advertised. Refund requests remain separate from cancellation, and consumer rights still apply. Supply the published refund policy and configure the external checkout consistently before taking payment.

## Demonstrations and ebook previews

The page now has two readable, clearly labelled **Illustrative conversation** panels. These are editorial examples of the owner-supplied guide topics, not a live chatbot or tested product output. The text is in `src/content/conversations.ts`.

No ebook PDFs or interior pages were supplied. Each guide therefore shows a disabled “Preview a page” action and an honest availability note. To finish this part, export one approved practical page from each real ebook to an optimised image under `public/previews/`. Never publish the complete paid files.

Configure `guidePreviews.tantrums` and `guidePreviews.mealtimes` in `src/content/previews.ts`, with `src`, accurate `alt`, pixel `width`/`height`, and a `transcript` of the page text. Each preview becomes available independently. The accessible lightbox supports zoom, a text transcript, Escape, a close control, focus containment and return to the trigger. Its configured state is browser-tested using a test-only fixture, never advertised as a real ebook excerpt.

## Visual system

The layout uses a 1160px desktop container, a two-column hero with the Messenger preview on the right, a separate demonstration, two balanced guide features, a connected three-step sequence, a compact split membership offer, a two-column FAQ and a pale-sage closing band. Small screens follow the reading order in the markup. There is no sticky CTA.

Fraunces headings and DM Sans body/UI are served locally as two Latin variable WOFF2 files (about 74KB combined), with `font-display: swap`. The palette is ivory #FAF7F0, forest #234E43, sage #E9EFE8 and body text #283C34. The original logo artwork and existing responsive covers are unchanged. The static thank-you page uses the same header scale, type, spacing and container, with onboarding steps beside a membership/help sidebar on desktop.

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

Browser tests use `/usr/bin/chromium` or `CHROMIUM_PATH`. They cover 360/390/768/1440px layouts, desktop composition, mobile reading order, image loading, accessibility, keyboard controls, preview zoom/focus, price consistency and copy buttons. Analytics is disabled. Optional hooks record CTA, preview and checkout handoff events only after their configured consent gate; no chat or children’s information is included.

See [design and copy notes](docs/design-and-copy.md) and [the current offer](docs/pricing-and-offer.md).
