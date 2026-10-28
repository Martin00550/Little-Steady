import { formatPrice, offer, priceLabel, renewalLabel } from '../config'
import { track } from '../lib/analytics'
import { Book } from './Artwork'
import { Accordion, CheckItem, CheckoutCTA, Header, PrimaryCTA } from './Shared'

const examples = [
  {
    topic: 'Something to make for dinner',
    question: '“I have eggs, rice and frozen peas. What could I make?”',
    detail: 'Ask for meal ideas and recipes using what you have.',
  },
  {
    topic: 'Words for a difficult moment',
    question:
      '“We need to leave the playground. My child is saying no. What can I say?”',
    detail: 'Ask for a few words to try when you can’t find your own.',
  },
  {
    topic: 'A different idea when you need one',
    question: '“That won’t work for our family. What else could I try?”',
    detail:
      'Ask a follow-up, explain what doesn’t fit, or ask for a simpler suggestion.',
  },
  {
    topic: 'Help with the next everyday question',
    question: '“Bedtime keeps turning into an argument. Where could I start?”',
    detail: 'Bring questions beyond tantrums and mealtimes, too.',
  },
]
const faqs = [
  {
    q: `What do I get for ${priceLabel()}?`,
    a: 'Both Little Steady ebooks—Calmer Tantrums and Calmer Mealtimes—plus access to the AI parenting helper in a one-to-one Messenger conversation. One membership, one monthly payment. No separate joining fee or paid add-on is required for these items.',
  },
  {
    q: 'Are the books included, or do I pay extra?',
    a: 'Both ebooks are included with your first membership purchase. You keep them if you cancel. There is no separate book payment or additional chatbot subscription to buy.',
  },
  {
    q: 'What can I ask the parenting helper?',
    a: 'Everyday parenting questions: meal ideas, recipes, words for a difficult conversation, transitions, bedtime, and what else to consider when a suggestion doesn’t fit your family. It is not limited to explaining the two ebooks.',
  },
  {
    q: 'Is it a real person?',
    a: 'It is an AI chatbot, not a human coach, clinician or emergency service. It can misunderstand a question or give incorrect information. Use your judgement and seek qualified help for medical, feeding, developmental or safety concerns. Check recipe ingredients for your family’s dietary needs and allergies.',
  },
  {
    q: 'Do I have to read the books before I can ask a question?',
    a: 'No. Start with whichever guide or question feels most useful today. You do not need to finish either ebook before messaging the helper.',
  },
  {
    q: 'Do I need Messenger? Is this a group?',
    a: 'You need Messenger to use the AI helper. It is a one-to-one conversation with the business’s chatbot, not a group. Your ebooks are accessed through Whop. Follow the access instructions inside your Whop purchase to get started.',
  },
  {
    q: 'Why does it renew each month?',
    a: 'The ongoing part is access to the parenting helper for the new questions that come up. It is not a monthly charge to keep your ebooks, and it is not a promise of new guides every month. If you no longer want the chatbot, cancel future renewal through Whop.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'Cancel future renewal through your Whop membership. You keep both ebooks. Chatbot access continues for the remaining paid membership period, then ends. Cancelling renewal does not automatically request a refund.',
  },
  {
    q: 'Will this stop tantrums or change what my child eats?',
    a: 'No particular result is guaranteed. This is parenting education and a place to explore ideas, not a promise of perfect behaviour or a replacement for professional advice. Children and families have different needs.',
  },
  {
    q: 'What should I share in the chat?',
    a: 'Describe the situation in general terms. Avoid children’s names, birth dates, medical records or other identifying details. Messenger is provided by Meta and the chatbot uses AI services. Do not assume the conversation is a private clinical consultation or that nothing is stored. Review the applicable privacy terms before use.',
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
            For the everyday “what do I do now?” moments
          </p>
          <h1 id="hero-heading">
            What can I say?
            <br />
            What can I cook?
            <br />
            What do I try next?
          </h1>
          <p className="sales-subhead">
            Get <strong>Calmer Tantrums</strong> and{' '}
            <strong>Calmer Mealtimes</strong> to keep, plus an{' '}
            <strong>AI parenting helper in Messenger</strong> for meal ideas,
            words for tricky moments, and the questions that come next.
          </p>
          <PrimaryCTA />
          <p className="sales-price-note">
            <strong>{priceLabel()} · No joining fee.</strong>
            <br />
            {renewalLabel()} Keep both ebooks if you cancel.
          </p>
          <figure className="sales-products">
            <div className="sales-books">
              <Book kind="tantrums" />
              <Book kind="mealtimes" />
            </div>
            <figcaption>
              Two ebooks to keep. One AI helper to return to.
              <br />
              All included in your {priceLabel()} membership.
            </figcaption>
          </figure>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="recognition-heading"
        >
          <h2 id="recognition-heading">
            Some days, you just need an idea you can use.
          </h2>
          <p>
            Dinner is ready. Your child won’t touch it. You need to leave, and
            they’re still on the playground. You’re tired, and the words you
            wanted to use have disappeared.
          </p>
          <p>
            You don’t want ten more tabs telling you ten different things. You
            want a starting point for the situation in front of you.
          </p>
          <p>
            A meal idea. A way to explain the boundary. A few words to try.
            Another suggestion when the first one doesn’t fit.
          </p>
          <p>
            <strong>That’s what Little Steady is for:</strong> two guides you
            can return to, and an AI helper you can ask about everyday
            parenting.
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          id="included"
          aria-labelledby="included-heading"
        >
          <p className="sales-kicker">
            One membership. Everything below is included.
          </p>
          <h2 id="included-heading">
            Read when you want to.
            <br />
            Ask when you need an idea.
          </h2>
          <ol className="sales-inclusions">
            <li>
              <span className="inclusion-number">1</span>
              <div>
                <h3>Calmer Tantrums</h3>
                <p>
                  For the days when big feelings take over. Start with this
                  parenting ebook when tantrums are the part of your day you
                  want to focus on.
                </p>
                <p className="inclusion-ownership">
                  Included with your first purchase. Yours to keep.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number">2</span>
              <div>
                <h3>Calmer Mealtimes</h3>
                <p>
                  For the “I’m not eating that” days. Start with this parenting
                  ebook when your questions keep coming back to mealtimes.
                </p>
                <p className="inclusion-ownership">
                  Included with your first purchase. Yours to keep.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number">3</span>
              <div>
                <h3>Your AI parenting helper in Messenger</h3>
                <p>
                  Bring an everyday parenting question. Ask for meal ideas,
                  recipes, wording for a specific situation, or another approach
                  to consider. Ask a follow-up or ask for a different idea.
                </p>
                <p className="inclusion-ownership">
                  Available during your paid membership.
                </p>
                <p className="sales-disclosure">
                  The helper is AI, not a person. It can make mistakes. It is
                  for general education, not medical advice, therapy or
                  emergency support.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section
          className="sales-section sales-prose"
          id="chatbot-preview"
          aria-labelledby="chatbot-heading"
        >
          <h2 id="chatbot-heading">Ask the question you actually have.</h2>
          <p>
            You don’t need to know the right parenting term, finish a book
            first, or turn your question into a perfect prompt. Start with the
            situation you’re dealing with.
          </p>
          <div className="sales-examples">
            <p className="sales-example-label">
              Examples of questions to bring to the helper
            </p>
            {examples.map((example) => (
              <div className="sales-example" key={example.question}>
                <h3>{example.topic}</h3>
                <p className="sales-example-question">{example.question}</p>
                <p>{example.detail}</p>
              </div>
            ))}
          </div>
          <p>
            <strong>It’s for more than the two book topics.</strong> Everyday
            questions keep changing. Your membership gives you a place to bring
            the next one.
          </p>
          <p className="sales-disclosure">
            These are example questions, not a live chat or promises of a
            particular answer. Use your judgement, check recipe ingredients for
            your family’s needs, and seek qualified help when a concern needs
            more than general parenting ideas.
          </p>
          <PrimaryCTA placement="examples">See everything included</PrimaryCTA>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="how-heading"
        >
          <h2 id="how-heading">You don’t have to do it all today.</h2>
          <ol className="sales-how">
            <li>
              <strong>Join through Whop.</strong> One membership includes both
              ebooks and the Messenger helper.
            </li>
            <li>
              <strong>
                Open your guides and follow the Messenger instructions.
              </strong>{' '}
              You’ll find your purchased resources and access details in Whop.
            </li>
            <li>
              <strong>Choose one starting point.</strong> Pick a guide topic or
              ask about one situation that keeps coming up.
            </li>
          </ol>
          <p>
            No requirement to finish both books before getting started. No need
            to change every routine at once.
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          id="membership"
          aria-labelledby="membership-heading"
        >
          <div className="sales-offer">
            <p className="sales-kicker">The Little Steady membership</p>
            <h2 id="membership-heading">
              Both ebooks + everyday parenting help in Messenger.
            </h2>
            <p className="sales-offer-price">
              <strong>{formatPrice()}</strong> {offer.price.currency} / month
            </p>
            <p className="sales-offer-renewal">
              {renewalLabel()} No joining fee.
            </p>
            <ul className="check-list">
              <CheckItem>Calmer Tantrums ebook to keep</CheckItem>
              <CheckItem>Calmer Mealtimes ebook to keep</CheckItem>
              <CheckItem>One-to-one AI parenting chat in Messenger</CheckItem>
              <CheckItem>
                Meal ideas, recipes and words for difficult moments
              </CheckItem>
              <CheckItem>Everyday questions and follow-up ideas</CheckItem>
              <CheckItem>Cancel future renewal through Whop</CheckItem>
            </ul>
            <CheckoutCTA />
            <p className="sales-disclosure">
              One recurring payment. No separate book purchase or chatbot
              upgrade.
            </p>
            <div className="sales-cancellation">
              <strong>Keep the books, even if you cancel.</strong>
              <p>
                Both ebooks are included with your first purchase. Chatbot
                access lasts for your paid membership period. If you cancel
                future renewal, the ebooks remain yours.
              </p>
            </div>
            {offer.refund.enabled && (
              <div className="sales-guarantee">
                <h3>
                  {offer.refund.days}-day money-back guarantee on your first
                  payment
                </h3>
                <p>
                  No lessons to complete or approach to prove failed. A
                  successful refund also stops future renewals. Later renewal
                  payments are not covered by this introductory guarantee.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          className="sales-section sales-prose sales-faq"
          id="questions"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading">A few things you might be wondering.</h2>
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
            Start with the question that’s on your mind today.
          </h2>
          <p>
            Something to make for dinner. Something to say. An idea for what to
            try next.
          </p>
          <PrimaryCTA placement="closing" />
          <p className="sales-price-note">
            {priceLabel()}. Both ebooks included. {renewalLabel()}
          </p>
        </section>
      </main>
    </>
  )
}
