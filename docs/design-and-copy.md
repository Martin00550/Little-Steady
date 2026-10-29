# Visual redesign

This revision changes composition and hierarchy while preserving the €37/month membership and existing checkout/access logic. It replaces the narrow, centred document layout.

## Section order and composition

1. An 80px horizontal header, original logo on the left and navigation on the right. Mobile retains one compact offer action.
2. A 1160px desktop hero with approximately 52/48 copy/product columns. The main visual is a substantial, readable Messenger conversation; existing ebook covers sit below it. Mobile follows copy, CTA/terms, chat and covers.
3. A sage companion section: two short recognition paragraphs, three benefit labels, AI disclosure and a different conversation with a useful answer and follow-up question.
4. Two balanced ebook features, each with the actual cover, benefit, three owner-supplied contents, ownership label and page-preview action. Mobile puts each cover beside its title, then gives the benefit and contents full reading width.
5. A connected three-step onboarding sequence, horizontal on desktop and vertical on mobile. Instructions refer to actual purchase-library access information and do not promise instant activation.
6. A continuing-value explanation and compact checklist beside a focused pricing panel. The price is €37 per month with billing, cancellation and policy details together.
7. An accessible FAQ beside a short introduction; stacked on mobile.
8. A compact sage closing band and footer. No sticky CTA.

The thank-you page uses the same typography, spacing and container. Steps sit beside membership/help information on desktop and stack on mobile. Clipboard actions, configured destinations, fallback instructions and static unverified behaviour remain unchanged.

## Typography and colour

Locally served Fraunces for major editorial headings; DM Sans for body/UI. Two Latin variable WOFF2 files, about 74KB combined, use `font-display: swap`. Body defaults to 18px/1.6. The desktop headline reaches 64px; mobile uses responsive 36–42px sizing and natural wrapping.

Ivory #FAF7F0, forest #234E43, sage #E9EFE8, dark body #283C34 and restrained neutral borders. The original logo retains its own artwork colours and aspect ratio. Covers are existing responsive WebPs. Spacing tokens and composition provide rhythm without repeated full-width rules, decorative animation or a card around every paragraph.

## Preview status

Messenger conversations are clearly labelled **Illustrative conversation · Static preview**. They are editorial examples using the owner-supplied guide topics, not tested output or customer outcomes. An AI disclosure is adjacent to the main demonstration.

Actual ebook files/interior pages were not supplied. **Real interior previews remain unfinished.** Each guide's preview action is disabled with an availability note. The implemented lightbox accepts individual approved sample-page images and text transcripts, supports zoom and keyboard/focus handling, and does not need public paid-file URLs. Its working state is tested with a test-only sample, not presented in production screenshots as an actual ebook page.

## Verification

Browser checks cover 360, 390, 768 and 1440px on both pages, accessibility, no horizontal overflow, desktop columns, mobile ordering, cover loading, checkout availability, policy controls, static redirect behaviour, clipboard actions and preview zoom/focus. Rendered screenshots are inspected for composition; source inspection alone is insufficient.

There is no new pricing research or claim that this is a proven highest-converting design. Actual purchases, retention and refunds remain the measures of offer performance.
