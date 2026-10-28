# Pricing and offer decision — working recommendation

## What is known

The owner supplied €47 for the two-ebook purchase. They clarified that the chatbot is for everyday parenting questions beyond the guides: meal ideas, recipes, wording for specific situations and follow-up questions. Its implementation remains outside this frontend task and its availability is unverified.

€12.99/month is a working chatbot price, converted to the same currency as the owner’s book price for a clear proposal. It has not been approved or validated by market research. No live purchase is enabled.

## Recommendation to test

Keep a books-only option and make recurring help an optional combined offer:

| Offer                        | Initial charge | Subsequent charges                   | What the buyer gets                                  |
| ---------------------------- | -------------- | ------------------------------------ | ---------------------------------------------------- |
| Two-guide bundle             | €47            | None                                 | Both ebooks to keep                                  |
| Guides + AI parenting helper | €59.99         | €12.99/month starting with month two | Both ebooks to keep + chatbot during the paid period |

The combined option is €47 for books plus €12.99 for the first chatbot month, not a discount or joining fee. No claim of savings, free trial or invented standalone value is made. There must be a separate Whop checkout for each option; a customer must not buy both. The monthly portion is optional and never preselected.

Only confirm the combined checkout URL after the actual Whop setup shows the exact first charge and the €12.99 renewal. Whop’s current support for a combined upfront/recurring offer has not been verified. The frontend does not implement billing. If the required checkout cannot be configured in Whop, revise the public offer rather than hiding the split or charging through an unexpected second checkout.

## Why this is a starting hypothesis

- Books-only gives a parent a purchase they can understand without committing to recurring access. This is a hypothesis about purchase friction, not measured conversion evidence.
- The monthly service needs its own reason to keep paying: help with new everyday questions, rather than continued possession of static ebooks.
- At €12.99/month, four payments (€51.96) exceed one €47 book payment before fees, refunds and operating costs. That arithmetic does not predict retention or compare profit.
- Putting €47 books-only next to €12.99/month with those same books included forever gives a price-sensitive reader a cheaper way to obtain the books and cancel. The books-only and recurring-only options would need different packaging to avoid that conflict.
- Making €59.99 upfront plus monthly renewal mandatory could discourage buyers who only want the guides. Only real purchase and retention data can quantify that tradeoff.

A possible later test is €47 initially for both books and an explicitly included first chatbot month, then €12.99/month. That is a different introductory offer, with different costs and consent/renewal wording; it is not implemented or promised. It should not be labelled free without clear terms.

The exact €47 book price still needs to earn its place through readable samples, accurate scope and creator transparency. No guide contents were inspected, so neither a price premium nor efficacy is claimed as proven.

## How the offer uses the requested principles

- Lead with the parent’s immediate situation and desired next step: something to cook, words to say, another idea to consider.
- Make the deliverables and payment schedule easy to understand.
- Reduce effort by suggesting one topic or one question, not a new elaborate parenting routine.
- Explain repeat value with realistic examples; do not imply human coaching, clinical accuracy, unlimited use, permanent memory or guaranteed results.
- Supply real proof when available: inspected ebook samples and actual tested chatbot responses. Question examples are clearly previews, not fabricated responses.
- Apply only a real, adopted refund policy. The earlier proposed first-chatbot-payment guarantee is not silently extended to the €47 books.

## Live research status

Requests to the following official sources on 28 October 2026 were blocked by the environment’s outbound proxy (403 during tunnel establishment):

- https://www.goodinside.com/membership/
- https://biglittlefeelings.com/
- https://solidstarts.com/
- https://docs.whop.com/payments/pricing

No current competitor prices or Whop checkout capabilities are asserted from those failed requests. Network-domain additions were saved to the environment configuration draft; they have not been applied or published. Review/save them in environment settings and publish the environment to make another check possible, then retry before treating those sources as read.

The linked research conversation is also unavailable through this session’s tools. The uploaded brief and owner’s current clarification are the available source context.

## What to measure

Compare contribution per visitor over a fixed period, not just clicks or gross subscription signups. Record actual verified purchases in Whop, first-charge conversion, renewals, refunds, cancellations and chatbot usage/cost. Separate books-only orders from combined orders. The static thank-you page must not be counted as payment proof.

No optimum price or highest-converting offer has been established.
