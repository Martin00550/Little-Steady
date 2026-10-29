import { formatPrice, priceLabel, renewalLabel } from '../config'
import { hasOfferPreviews } from '../content/previews'
import { track } from '../lib/analytics'
import { Book } from './Artwork'
import { OfferPreviews } from './OfferPreviews'
import {
  Accordion,
  CheckItem,
  CheckoutCTA,
  Header,
  PolicyLink,
  PrimaryCTA,
} from './Shared'

const companionQuestions = [
  'What could I say when it’s time to leave?',
  'My child rejected dinner again. Help me think through the next step.',
  'How can I hold this limit without getting into a long argument?',
  'That suggestion doesn’t fit our routine. What else could I try?',
]
const tantrumContents = [
  'A quick-start page for the next tantrum.',
  'Practical language for limits, comfort and difficult transitions.',
  'Everyday examples covering screens, shops, bedtime and sibling conflict.',
  'Guidance for moments when your own frustration rises.',
  'A flexible two-week practice sequence and printable tools.',
]
const mealtimeContents = [
  'A quick-start page for the next meal.',
  'Ways to offer familiar and less familiar foods with less pressure.',
  'Words to use when food is refused.',
  'Examples covering brand preferences, mixed foods, snacks and eating away from home.',
  'A flexible two-week practice sequence and printable tools.',
  'Signs that a feeding concern needs professional assessment.',
]
const faqs = [
  {
    q: 'Will this work for my child?',
    a: 'Children and families differ. Little Steady offers ideas and practical education, not guaranteed changes in behaviour or eating. You can explain what does and doesn’t fit when asking the companion a follow-up question.',
  },
  {
    q: 'Is this just another parenting book?',
    a: 'The membership combines two reference guides with access to an AI companion. You can read a section, ask a question and talk through an everyday situation without needing to finish both books first.',
  },
  {
    q: 'Why wouldn’t I just use a general AI chatbot?',
    a:
      'Little Steady brings its parenting guides and a focused companion together in one offer.' +
      (hasOfferPreviews()
        ? ' You can preview the material and an example response before deciding whether that convenience is valuable to you.'
        : ''),
  },
  {
    q: 'Is someone personally answering my messages?',
    a: 'No. The parenting companion is AI. Human customer support, where offered, is separate from the companion.',
  },
  {
    q: 'Do I need a new app?',
    a: 'You need access to Facebook Messenger. The ebooks are delivered through your Whop purchase library.',
  },
  {
    q: 'What if we need more specialised help?',
    a: 'Little Steady is for general parenting education. Significant feeding difficulties, developmental concerns, safety concerns or ongoing distress may need assessment from a qualified professional. The membership does not replace that care.',
  },
  {
    q: 'What if I cancel?',
    a: 'Future renewals stop. You keep the ebooks, and companion access ends after your paid period. Refund requests are handled separately under the published refund policy.',
  },
]

export function SalesPage() {
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
            For parents of children aged 18 months to 5 years
          </p>
          <h1 id="hero-heading">
            <span className="sales-hero-situation">
              Dinner refused. Another meltdown.
            </span>
            Know what to try next.
          </h1>
          <p className="sales-subhead">
            Get practical help with everyday parenting questions inside
            Messenger—plus two clear, useful guides to tantrums and picky
            eating.
          </p>
          <div className="sales-mechanism">
            <p>
              Ask what to say. Talk through what happened. Ask for another
              suggestion when the first one doesn’t fit your family.
            </p>
            <p>Little Steady brings the guidance and the follow-up together.</p>
          </div>
          <PrimaryCTA />
          <p className="sales-price-note">
            {formatPrice()} charged today. {renewalLabel()}
            <br />
            Both ebooks included to keep. AI companion access while subscribed.
          </p>
          <figure className="sales-products">
            <div className="sales-books">
              <Book kind="tantrums" />
              <Book kind="mealtimes" />
            </div>
            <figcaption>
              Two ebooks to keep. A Messenger companion to return to.
            </figcaption>
          </figure>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="recognition-heading"
        >
          <h2 id="recognition-heading">
            The advice made sense. Then real life happened.
          </h2>
          <p>You read something helpful about tantrums.</p>
          <p>
            But now you’re leaving the playground, your child is crying, and you
            can’t remember how to put it into words.
          </p>
          <p>
            Or you’ve made dinner—and heard “I don’t like it” before anyone has
            taken a bite.
          </p>
          <p>You don’t always need another article to read.</p>
          <p>Sometimes you need help answering one question:</p>
          <p className="sales-key-question">
            “What could I try in this situation?”
          </p>
          <p>That’s where Little Steady fits.</p>
        </section>

        <section
          className="sales-section sales-prose"
          id="included"
          aria-labelledby="included-heading"
        >
          <h2 id="included-heading">
            Read when you have time. Ask when you have a question.
          </h2>
          <p className="sales-included-intro">Your membership includes:</p>
          <ol className="sales-inclusions">
            <li>
              <span className="inclusion-number" aria-hidden="true">
                1
              </span>
              <div>
                <h3>Your AI parenting companion in Messenger</h3>
                <p>
                  A one-to-one conversation you can return to for everyday
                  parenting questions.
                </p>
                <p>You can ask:</p>
                <ul className="sales-content-list sales-question-list">
                  {companionQuestions.map((question) => (
                    <li key={question}>“{question}”</li>
                  ))}
                </ul>
                <p>
                  Explain the situation in your own words. Add what you’ve
                  already tried. Ask a follow-up when you need to.
                </p>
                <p>Available to message around the clock, inside Messenger.</p>
                <p className="sales-disclosure">
                  The companion is AI, not a human coach. It can make mistakes
                  and provides general education—not diagnosis, therapy or
                  emergency support.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number" aria-hidden="true">
                2
              </span>
              <div>
                <h3>Calmer Tantrums — yours to keep</h3>
                <p>
                  Understand big feelings, hold clear limits and practise useful
                  skills between difficult moments.
                </p>
                <p>Inside you’ll find:</p>
                <ul className="sales-content-list">
                  {tantrumContents.map((content) => (
                    <li key={content}>{content}</li>
                  ))}
                </ul>
                <p>
                  Start with the situation that keeps happening in your home.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number" aria-hidden="true">
                3
              </span>
              <div>
                <h3>Calmer Mealtimes — yours to keep</h3>
                <p>
                  A practical starting point for everyday food refusal and
                  selective eating.
                </p>
                <p>Inside you’ll find:</p>
                <ul className="sales-content-list">
                  {mealtimeContents.map((content) => (
                    <li key={content}>{content}</li>
                  ))}
                </ul>
                <p>
                  Choose one manageable change instead of trying to overhaul
                  every meal.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <OfferPreviews />

        <section
          className="sales-section sales-prose"
          aria-labelledby="why-heading"
        >
          <h2 id="why-heading">Why a membership?</h2>
          <p>Because finishing a guide doesn’t mean the questions stop.</p>
          <p>
            The next difficult moment may involve a different routine, a
            different setting or something you haven’t tried before.
          </p>
          <p>
            The books are your reference. Your membership gives you continuing
            access to the Messenger companion.
          </p>
          <p>
            Keep asking follow-up questions while subscribed. Keep both ebooks
            even if you cancel.
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          id="membership"
          aria-labelledby="membership-heading"
        >
          <div className="sales-offer">
            <h2 id="membership-heading">
              One membership. A clear monthly price.
            </h2>
            <p className="sales-offer-price">
              <strong>{priceLabel()}</strong>
            </p>
            <p className="sales-offer-included">Included:</p>
            <ul className="check-list">
              <CheckItem>AI parenting companion in Messenger</CheckItem>
              <CheckItem>
                One-to-one conversations and follow-up questions
              </CheckItem>
              <CheckItem>Calmer Tantrums ebook to keep</CheckItem>
              <CheckItem>Calmer Mealtimes ebook to keep</CheckItem>
              <CheckItem>
                Scripts, practice sequences and printable tools inside the
                guides
              </CheckItem>
            </ul>
            <CheckoutCTA />
            <p className="sales-disclosure">
              Your first payment is {formatPrice()} today. Your membership
              renews monthly until cancelled.
            </p>
            <div className="sales-cancellation">
              <p>
                Cancel future renewals through your account before your next
                billing date. Companion access continues through the period
                you’ve paid for. Both ebooks remain yours.
              </p>
            </div>
            <nav className="sales-policy-links" aria-label="Offer policies">
              <PolicyLink policy="refund">Refund policy</PolicyLink>
              <span aria-hidden="true">·</span>
              <PolicyLink policy="terms">Membership terms</PolicyLink>
            </nav>
          </div>
        </section>

        <section
          className="sales-section sales-prose sales-faq"
          id="questions"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading">A few questions before you decide</h2>
          {faqs.map((faq) => (
            <Accordion
              key={faq.q}
              question={faq.q}
              onOpen={() => track('preview_interaction', { target: 'faq' })}
            >
              <p>{faq.a}</p>
            </Accordion>
          ))}
        </section>
        <section
          className="sales-section sales-prose sales-close"
          aria-labelledby="closing-heading"
        >
          <h2 id="closing-heading">
            Start with the question that brought you here.
          </h2>
          <p>
            A difficult transition.
            <br />
            Another refused meal.
            <br />
            Something you tried that didn’t fit.
          </p>
          <p>Bring that question to Little Steady.</p>
          <PrimaryCTA placement="closing" />
          <p className="sales-price-note">
            Two ebooks to keep. A Messenger companion to return to.
          </p>
        </section>
      </main>
    </>
  )
}
