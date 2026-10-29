import { CornerDownRight, MessageSquareText, RefreshCw } from 'lucide-react'
import { formatPrice, priceLabel, renewalLabel } from '../config'
import { mealtimeExample, playgroundExample } from '../content/conversations'
import { track } from '../lib/analytics'
import { Book } from './Artwork'
import { Conversation } from './Conversation'
import { GuidePreview } from './GuidePreview'
import {
  Accordion,
  CheckItem,
  CheckoutCTA,
  Header,
  PolicyLink,
  PrimaryCTA,
} from './Shared'

const faqs = [
  {
    q: 'Will this work for my child?',
    a: 'Little Steady is for parents of children aged 18 months to 5 years. Families differ: the guides and companion offer practical education, not guaranteed changes in behaviour or eating. Explain what does and doesn’t fit when you ask a follow-up.',
  },
  {
    q: 'Is someone personally answering my messages?',
    a: 'No. The parenting companion is AI. It can misunderstand a situation or make mistakes. Human customer support, where offered, is separate from the companion.',
  },
  {
    q: 'Why wouldn’t I just use a general AI chatbot?',
    a: 'Little Steady brings two focused parenting guides and a Messenger companion together. The guides give you a reference; the companion is a place for everyday questions and follow-ups. Decide whether that combination is useful for your family.',
  },
  {
    q: 'Do I need a new app or have to finish the books first?',
    a: 'You need Facebook Messenger for the companion. You can start with a question before finishing either guide. Your ebooks and Messenger access instructions are in your purchase library.',
  },
  {
    q: 'What if we need more specialised help?',
    a: 'Significant feeding difficulties, developmental concerns, safety concerns or ongoing distress may need assessment from a qualified professional. Little Steady is general parenting education, not diagnosis, therapy or emergency support.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'Cancel future renewals in your account before your next billing date. You keep both ebooks. Companion access continues through your paid period, then ends. Refund requests are handled separately under the published refund policy and consumer law.',
  },
  {
    q: 'What should I share in the chat?',
    a: 'Describe the situation without children’s names, birth dates, medical records or other identifying details. Messenger and AI services process messages; this is not a private clinical consultation. Read the service’s privacy terms before use.',
  },
]

export function SalesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="sales-page">
        <section
          className="hero section container"
          id="hero"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <p className="eyebrow">For parents · ages 18 months to 5 years</p>
            <h1 id="hero-heading">
              <span>Dinner refused. Another meltdown.</span>Know what to try
              next.
            </h1>
            <p className="hero-intro">
              Get practical help with everyday parenting questions inside
              Messenger—plus two clear, useful guides to tantrums and picky
              eating.
            </p>
            <PrimaryCTA />
            <p className="billing-note">
              {formatPrice()} charged today. {renewalLabel()}
            </p>
            <p className="ownership-note">
              Both ebooks included to keep.
              <br className="desktop-break" /> AI companion access while
              subscribed.
            </p>
          </div>
          <div className="hero-product">
            <Conversation id="hero-chat" messages={playgroundExample} compact />
            <div className="hero-guides">
              <div className="hero-cover-pair">
                <Book kind="tantrums" compact />
                <Book kind="mealtimes" compact />
              </div>
              <div>
                <span className="eyebrow">Also included</span>
                <p>
                  Two practical guides.
                  <br />
                  Yours to keep.
                </p>
                <a href="#included" className="text-link">
                  Explore the guides{' '}
                  <CornerDownRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="companion-section section"
          id="companion"
          aria-labelledby="companion-heading"
        >
          <div className="container companion-layout">
            <div className="companion-copy">
              <p className="eyebrow">A place for the next question</p>
              <h2 id="companion-heading">
                The advice made sense. Then real life happened.
              </h2>
              <p>
                You read something helpful. But now dinner has been refused, and
                you’re wondering how to put it into practice.
              </p>
              <p>
                Bring the situation to the companion. Start with one question,
                then ask about the part that doesn’t fit.
              </p>
              <ul className="companion-benefits">
                <li>
                  <MessageSquareText aria-hidden="true" size={21} />
                  <span>Explain the situation in your own words.</span>
                </li>
                <li>
                  <CornerDownRight aria-hidden="true" size={21} />
                  <span>Ask a follow-up.</span>
                </li>
                <li>
                  <RefreshCw aria-hidden="true" size={21} />
                  <span>Consider another suggestion.</span>
                </li>
              </ul>
              <p className="ai-disclosure">
                The companion is AI, not a human coach. It can make mistakes and
                provides general education—not diagnosis, therapy or emergency
                support.
              </p>
            </div>
            <Conversation id="mealtime-chat" messages={mealtimeExample} />
          </div>
        </section>

        <section
          className="guides-section section container"
          id="included"
          aria-labelledby="guides-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Read at your own pace</p>
              <h2 id="guides-heading">Two guides. Yours to keep.</h2>
            </div>
            <p>
              Start with the situation that keeps happening in your home. Choose
              one manageable change.
            </p>
          </div>
          <div className="guide-grid">
            <article className="guide-feature" aria-labelledby="tantrums-title">
              <div className="guide-art">
                <Book kind="tantrums" />
              </div>
              <div className="guide-copy">
                <span className="ownership-tag">Yours to keep</span>
                <h3 id="tantrums-title">Calmer Tantrums</h3>
                <p>
                  Understand big feelings and find practical words for clear,
                  caring limits.
                </p>
                <ul className="guide-contents">
                  <li>A quick-start page for the next tantrum.</li>
                  <li>Language for limits and difficult transitions.</li>
                  <li>
                    A flexible two-week practice sequence and printable tools.
                  </li>
                </ul>
                <GuidePreview kind="tantrums" title="Calmer Tantrums" />
              </div>
            </article>
            <article
              className="guide-feature"
              aria-labelledby="mealtimes-title"
            >
              <div className="guide-art">
                <Book kind="mealtimes" />
              </div>
              <div className="guide-copy">
                <span className="ownership-tag">Yours to keep</span>
                <h3 id="mealtimes-title">Calmer Mealtimes</h3>
                <p>
                  A practical starting point for food refusal, with less
                  pressure at the table.
                </p>
                <ul className="guide-contents">
                  <li>A quick-start page for the next meal.</li>
                  <li>Ways to offer familiar and less familiar foods.</li>
                  <li>Words to use when food is refused.</li>
                </ul>
                <GuidePreview kind="mealtimes" title="Calmer Mealtimes" />
              </div>
            </article>
          </div>
        </section>

        <section
          className="how-section section"
          id="how-it-works"
          aria-labelledby="how-heading"
        >
          <div className="container">
            <p className="eyebrow">A simple starting point</p>
            <h2 id="how-heading">From joining to your first question.</h2>
            <ol className="onboarding-sequence">
              <li>
                <span className="step-number" aria-hidden="true">
                  01
                </span>
                <div>
                  <h3>Join through Whop</h3>
                  <p>
                    One membership includes both ebooks and access to the
                    Messenger companion.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">
                  02
                </span>
                <div>
                  <h3>Open your guides &amp; access instructions</h3>
                  <p>
                    Sign in to your purchase library. Follow the instructions
                    there to activate Messenger access.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">
                  03
                </span>
                <div>
                  <h3>Bring your first question</h3>
                  <p>
                    Describe an everyday situation in your own words. Add what
                    you’ve tried, then ask a follow-up.
                  </p>
                </div>
              </li>
            </ol>
            <p className="activation-note">
              If your Messenger access isn’t ready, check the instructions and
              help options in your purchase.
            </p>
          </div>
        </section>

        <section
          className="membership-section section container"
          id="membership"
          aria-labelledby="membership-heading"
        >
          <div className="membership-copy">
            <p className="eyebrow">
              Support for the questions that keep coming
            </p>
            <h2 id="membership-heading">
              The next moment may need a different answer.
            </h2>
            <p>
              The guides are yours to keep. Your membership gives you continuing
              access to the Messenger companion.
            </p>
            <ul className="check-list">
              <CheckItem>One-to-one AI conversations in Messenger</CheckItem>
              <CheckItem>Everyday parenting questions and follow-ups</CheckItem>
              <CheckItem>Calmer Tantrums and Calmer Mealtimes ebooks</CheckItem>
              <CheckItem>
                Scripts, practice sequences and printable tools inside the
                guides
              </CheckItem>
            </ul>
          </div>
          <div className="pricing-panel">
            <p className="eyebrow">Little Steady membership</p>
            <p className="membership-price">
              <strong>{formatPrice()}</strong>
              <span>per month</span>
            </p>
            <p className="price-context">
              Both guides + your Messenger companion
            </p>
            <CheckoutCTA />
            <p className="billing-note">
              Your first payment is {formatPrice()} today. Your membership
              renews monthly until cancelled.
            </p>
            <p className="cancellation-note">
              Cancel future renewals through your account before your next
              billing date. Companion access continues through the period you’ve
              paid for. Both ebooks remain yours.
            </p>
            <nav className="offer-policies" aria-label="Offer policies">
              <PolicyLink policy="refund">Refund policy</PolicyLink>
              <span aria-hidden="true">·</span>
              <PolicyLink policy="terms">Membership terms</PolicyLink>
            </nav>
          </div>
        </section>

        <section
          className="faq-section section container"
          id="questions"
          aria-labelledby="faq-heading"
        >
          <div className="faq-intro">
            <p className="eyebrow">Before you decide</p>
            <h2 id="faq-heading">A few good questions.</h2>
            <p>
              What’s included, how the companion works, and what happens if you
              cancel.
            </p>
          </div>
          <div className="faq-accordions">
            {faqs.map((faq) => (
              <Accordion
                key={faq.q}
                question={faq.q}
                onOpen={() => track('preview_interaction', { target: 'faq' })}
              >
                <p>{faq.a}</p>
              </Accordion>
            ))}
          </div>
        </section>

        <section className="closing-band" aria-labelledby="closing-heading">
          <div className="container closing-layout">
            <div>
              <h2 id="closing-heading">Start with today’s question.</h2>
              <p>Two ebooks to keep. A Messenger companion to return to.</p>
            </div>
            <div className="closing-action">
              <PrimaryCTA placement="closing" />
              <p className="billing-note">
                {priceLabel()}. {renewalLabel()}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
