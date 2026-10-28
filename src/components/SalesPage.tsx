import {
  canPurchase,
  formatPrice,
  guaranteeLabel,
  offer,
  priceLabel,
  renewalLabel,
} from '../config'
import { track } from '../lib/analytics'
import { Book } from './Artwork'
import { Accordion, CheckItem, CheckoutCTA, Header, PrimaryCTA } from './Shared'

const faqs = [
  {
    q: 'What ages is Little Steady for?',
    a: offer.readiness.ageRange
      ? `The guides cover ${offer.readiness.ageRange}. Every child and family is different.`
      : 'The focus is everyday early-childhood tantrums and mealtimes. Exact age coverage and guide samples will be confirmed before purchases open.',
  },
  {
    q: 'What exactly would I receive?',
    a: 'The proposed membership includes Calmer Tantrums and Calmer Mealtimes, plus access to an AI companion in Messenger while subscribed. Under the proposed terms, both ebooks are yours to keep after cancellation.',
  },
  {
    q: 'Why is it a monthly membership?',
    a: 'The ebooks are the reference material. The planned ongoing service is access to the AI companion for follow-up questions about everyday situations. There is no promise of new guides or content each month.',
  },
  {
    q: 'Is the companion a person? Can it be wrong?',
    a: 'It is AI, not a person or a clinician. It can misunderstand your question or give incorrect information. It is intended for general parenting education, not diagnosis, treatment or emergency support.',
  },
  {
    q: 'Do I need Messenger or have to read everything first?',
    a: 'Messenger is the planned channel for the one-to-one AI conversation. The ebooks are delivered through Whop. You can choose the topic that matters to you first; there is no requirement to read both guides before choosing a starting point.',
  },
  {
    q: 'Will this work for my child?',
    a: 'No particular result is guaranteed. Children and families have different needs, and the aim is to help you find a clearer starting point. If you are concerned about feeding, growth, development or persistent distress, speak with a qualified professional.',
  },
  {
    q: 'How do cancellation and refunds work?',
    a: `The proposed terms let you cancel future renewal through Whop, keep your ebooks, and use the companion for the remaining paid period. Cancelling is separate from asking for a refund. The proposed ${offer.refund.days}-day guarantee covers the first payment only, without completing lessons or proving failure. A successful refund would stop future renewals. Later payments are not covered by that introductory guarantee. Final instructions will be provided before checkout opens.`,
  },
  {
    q: 'What about privacy and sharing with another caregiver?',
    a: 'The final privacy and account-sharing policies will be available before sales open. Messenger involves Meta and the AI may involve other providers. Storage, processing, administrator access and deletion arrangements have not been confirmed. Avoid sharing children’s names, birth dates or medical records. Do not assume one membership includes a second Messenger account.',
  },
]

export function SalesPage() {
  const live = canPurchase()
  return (
    <>
      <Header />
      <main id="main-content" className="sales-page">
        <section
          className="sales-hero container"
          id="hero"
          aria-labelledby="hero-heading"
        >
          <p className="sales-kicker">
            For everyday tantrums and difficult mealtimes
          </p>
          <h1 id="hero-heading">Know what to try when parenting gets hard.</h1>
          <p className="sales-subhead">
            Two parenting ebooks and a planned AI companion in Messenger, so you
            have a place to start—and somewhere to bring your follow-up
            questions.
          </p>
          <PrimaryCTA />
          <p className="sales-price-note">
            {!live && 'Planned membership: '}
            {priceLabel()}
            <br />
            {renewalLabel()}
            {!live && ' Purchases are not open yet.'}
          </p>
          <figure className="sales-products">
            <div className="sales-books">
              <Book kind="tantrums" />
              <Book kind="mealtimes" />
            </div>
            <figcaption>
              Calmer Tantrums + Calmer Mealtimes
              <br />
              Cover concepts shown. Actual guide samples will be added before
              launch.
            </figcaption>
          </figure>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="recognition-heading"
        >
          <h2 id="recognition-heading">
            You don’t need more parenting advice to scroll through.
          </h2>
          <p>
            Dinner is ready. Your child won’t touch it. Or it’s time to leave
            the playground, and suddenly everything feels difficult.
          </p>
          <p>
            You’ve read suggestions that made sense at the time. Remembering
            what to try in the middle of it is another matter.
          </p>
          <p>
            Little Steady is being put together for those everyday moments: two
            guides you can return to, with a planned companion for the questions
            that come next.
          </p>
          <p>
            <strong>
              The aim is a clearer next step—not a promise of perfect behaviour.
            </strong>
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          id="included"
          aria-labelledby="included-heading"
        >
          <h2 id="included-heading">
            Here’s what’s included in the proposed membership.
          </h2>
          <ol className="sales-inclusions">
            <li>
              <span className="inclusion-number">1</span>
              <div>
                <h3>Calmer Tantrums</h3>
                <p>
                  A parenting ebook about tantrums. Choose this topic when big
                  feelings are the everyday difficulty you want to focus on.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number">2</span>
              <div>
                <h3>Calmer Mealtimes</h3>
                <p>
                  A parenting ebook about mealtimes. Choose this topic when your
                  questions tend to start at the dinner table.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number">3</span>
              <div>
                <h3>Follow-up questions in Messenger</h3>
                <p>
                  The planned AI companion is intended to help you explore how
                  the guides relate to your own everyday situations. A
                  one-to-one conversation, available during your paid
                  membership.
                </p>
                <p className="sales-disclosure">
                  This is AI, not a human coach. It can make mistakes and is not
                  medical advice or emergency support. Companion access is not
                  available yet.
                </p>
              </div>
            </li>
          </ol>
          <p className="sales-disclosure">
            The books are the reference material; companion access is the
            recurring part. Exact guide coverage, readable excerpts and creator
            information will be provided before sales open.
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="how-heading"
        >
          <h2 id="how-heading">Start with the question you have today.</h2>
          <p>
            You don’t have to turn this into another project. Pick the topic
            that feels most useful: tantrums or mealtimes.
          </p>
          <ol className="sales-how">
            <li>
              <strong>Purchase through Whop.</strong> Checkout and your
              membership are managed there.
            </li>
            <li>
              <strong>Open your ebooks.</strong> Find both guides in your Whop
              purchase library.
            </li>
            <li>
              <strong>Follow the companion access instructions.</strong> The
              activation process and timing will be confirmed before sales open.
            </li>
          </ol>
          <PrimaryCTA placement="mid-page">See the membership</PrimaryCTA>
        </section>

        <section
          className="sales-section sales-prose"
          id="membership"
          aria-labelledby="membership-heading"
        >
          <div className="sales-offer">
            <p className="sales-kicker">The Little Steady membership</p>
            <h2 id="membership-heading">
              Both guides. Follow-up support.
              <br />
              One monthly price.
            </h2>
            <p className="sales-offer-price">
              <strong>{formatPrice()}</strong> {offer.price.currency} /{' '}
              {offer.price.interval}
            </p>
            <p className="sales-offer-renewal">
              {!live && 'Proposed price. '}
              {renewalLabel()}
            </p>
            <ul className="check-list">
              <CheckItem>Calmer Tantrums ebook</CheckItem>
              <CheckItem>Calmer Mealtimes ebook</CheckItem>
              <CheckItem>
                Planned AI companion access while subscribed
              </CheckItem>
              <CheckItem>
                Keep both ebooks after cancellation under the proposed terms
              </CheckItem>
              <CheckItem>No joining fee or separate upsell</CheckItem>
            </ul>
            <CheckoutCTA />
            <p className="sales-disclosure">
              {live
                ? 'Checkout is handled securely by Whop.'
                : 'Purchases aren’t open yet. Checkout will be through Whop.'}
            </p>
            <div className="sales-guarantee">
              <h3>
                {offer.refund.adopted
                  ? guaranteeLabel()
                  : `Proposed: ${offer.refund.days}-day first-payment guarantee`}
              </h3>
              <p>
                No lessons to finish or proof that an approach failed. A
                successful refund would stop future renewals. The introductory
                guarantee does not cover later payments.{' '}
                {!offer.refund.adopted &&
                  'Final terms will be confirmed before purchases open.'}
              </p>
            </div>
          </div>
        </section>

        <section
          className="sales-section sales-prose sales-faq"
          id="questions"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading">Questions before you decide?</h2>
          {faqs.map((f) => (
            <Accordion
              key={f.q}
              question={f.q}
              onOpen={() => track('preview_interaction', { target: 'faq' })}
            >
              <p>{f.a}</p>
            </Accordion>
          ))}
        </section>
        <section
          className="sales-section sales-prose sales-close"
          aria-labelledby="closing-heading"
        >
          <h2 id="closing-heading">
            You don’t have to figure everything out at once.
          </h2>
          <p>Start with the moment that’s hardest right now.</p>
          <PrimaryCTA placement="closing">See the membership</PrimaryCTA>
          <p className="sales-price-note">
            {!live && 'Planned at '}
            {priceLabel()} · {renewalLabel()}
          </p>
        </section>
      </main>
    </>
  )
}
