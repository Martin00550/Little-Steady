# Internal content and launch notes

The public pages use the latest owner-supplied sales copy. Checkout is disabled until a real link is provided. This frontend does not build or verify the external chatbot, billing or fulfilment.

## Supplied facts and assets

- The owner selected one €37 EUR/month membership: Calmer Tantrums and Calmer Mealtimes to keep, plus the AI parenting companion in Messenger during the paid period. No joining fee or separate book purchase.
- The latest copy specifies parents of children aged 18 months to 5 years. It supplies guide contents: quick-start pages, scripts, everyday examples, flexible two-week practice sequences, printable tools and guidance about seeking professional feeding assessment. These are owner-supplied descriptions; the actual ebooks have not been inspected.
- Everyday companion questions include wording for difficult situations, meal ideas, recipes and follow-ups. It is AI, not a human coach, healthcare or emergency service.
- Around-the-clock messaging is included in the supplied copy. It is not a response-time or uptime guarantee. The external implementation still needs testing.
- Generated ebook covers are artwork, not interior-page previews or customer photographs. Responsive WebPs and high-resolution PNGs are included.
- The website uses the owner's original logo. Forest green #2C5449 and warm ivory #FAF7F0 come from that artwork. Covers retain their existing plain brand text.

## Actual previews

No real ebook excerpts or tested companion conversation were supplied. `src/content/previews.ts` is empty, so the preview section and the FAQ sentence promising previews remain hidden. Do not publish bracketed editing instructions, invented guide pages or an editorial answer as tested product output. Supply real guide excerpts and an approved, clearly labelled conversation with a useful reply to enable the section.

## External setup still required

- Supply the real ebook files and confirm every advertised feature is present.
- Create the exact €37/month checkout, renewal/cancellation settings and ebook ownership/access rules. Enable the checkout URL only when fulfilment works.
- Build and test the Messenger companion: access restrictions, follow-ups, message availability, instructions and entitlement changes after cancellation/refund. No chatbot backend is implemented here.
- Supply actual library, Messenger and membership-management destinations. The static thank-you page uses account/instruction routes until precise links exist.
- Supply actual support/seller details and final service/privacy/refund policies. Configure those policies in the checkout. No voluntary money-back guarantee or trial is advertised; consumer rights remain unaffected.

## Claims excluded

No fabricated testimonials, endorsements, discounts, scarcity, guaranteed behaviour/eating changes or clinical efficacy. No knowledge integration, persistent memory, personalisation, unlimited use, instant activation or new-guide schedule is claimed. Visiting `/thank-you` does not verify a purchase or grant chat access.

Evaluate conversion and retention only after external fulfilment is working. The frontend's completion and the service's readiness are separate.
