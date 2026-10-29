import { ShieldCheck } from 'lucide-react'
import { formatPrice, offer, renewalLabel } from '../config'
import { track } from '../lib/analytics'
import { Book } from './Artwork'
import { Accordion, CheckItem, CheckoutCTA, Header, PrimaryCTA } from './Shared'

const examples = [
  {
    topic: 'Something to make for dinner',
    question: '“I have eggs, rice and frozen peas. What could I make?”',
    detail:
      'Find a starting point for dinner using the ingredients already in your kitchen.',
  },
  {
    topic: 'Words for a difficult moment',
    question:
      '“We need to leave the playground. My child is saying no. What can I say?”',
    detail:
      'Consider a few words to try before you’re searching for them in the middle of it.',
  },
  {
    topic: 'A different idea when you need one',
    question: '“That won’t work for our family. What else could I try?”',
    detail: 'Explain what doesn’t fit and ask for another idea you could try.',
  },
  {
    topic: 'Help with the next everyday question',
    question: '“Bedtime keeps turning into an argument. Where could I start?”',
    detail:
      'Choose one part of the routine to think through instead of tackling everything at once.',
  },
]
const faqs = [
  {
    q: 'What is included in my membership?',
    a: 'Both Little Steady ebooks—Calmer Tantrums and Calmer Mealtimes—plus access to the AI parenting helper in a one-to-one Messenger conversation. One membership, one monthly payment. No separate joining fee or extra fee is required for these items.',
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
    q: 'Why pay when I can find parenting advice for free?',
    a: 'Free advice can be useful. Little Steady combines two guides to keep with a place to ask an everyday question and follow up in Messenger. You can describe what is happening, ask for an idea and follow up if it doesn’t fit. The monthly payment is for ongoing helper access; you keep the ebooks even if you cancel.',
  },
  {
    q: 'Is it a real person?',
    a: 'It is an AI chatbot, not a human coach, healthcare professional or emergency service. It can misunderstand a question or give incorrect information. Use your judgement and seek qualified help for medical, feeding, developmental or safety concerns. Check recipe ingredients for your family’s dietary needs and allergies.',
  },
  {
    q: 'Do I have to read the books before I can ask a question?',
    a: 'No. Start with something that is already on your mind—a refused dinner, leaving the playground or words you want to try. You can use a guide as reference or ask the helper a question. There is no requirement to finish a book or complete a new routine first.',
  },
  {
    q: 'Do I need Messenger? Is this a group?',
    a: 'You need Messenger to use the AI helper. It is a one-to-one conversation with the business’s chatbot, not a group. Open your ebooks from your purchase page. The same page explains how to start your Messenger chat.',
  },
  {
    q: 'Why does it renew each month?',
    a: 'The ongoing part is access to the parenting helper for the new questions that come up. It is not a monthly charge to keep your ebooks, and it is not a promise of new guides every month. If you no longer want the chatbot, cancel your subscription from your account.',
  },
  ...(offer.refund.enabled
    ? [
        {
          q: 'What if Little Steady isn’t right for me?',
          a: `Ask for a full refund of your first membership payment within ${offer.refund.days} days of your first purchase. You don’t need to finish the guides or prove that an idea didn’t work. Open your purchase and use its help option to request a refund. A successful refund also stops future payments. The guarantee covers your first payment only; later monthly payments are not included. Your rights under consumer law still apply.`,
        },
      ]
    : []),
  {
    q: 'What happens if I cancel?',
    a: 'Cancel your subscription from your account. You keep both ebooks. You can use the chat until the end of the time you’ve paid for. Cancelling stops future payments; asking for a refund is a separate step.',
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
            For parents of toddlers and preschoolers
          </p>
          <h1 id="hero-heading">Feel less stuck when parenting gets hard.</h1>
          <p className="sales-subhead">
            Have words to try when feelings run high, meal ideas when dinner is
            refused, and a clearer starting point when you’re too tired to keep
            searching.
          </p>
          <p className="sales-mechanism">
            Little Steady brings together two parenting ebooks to keep and an AI
            parenting helper in Messenger, in one membership.
          </p>
          <PrimaryCTA />
          <p className="sales-price-note">
            Both ebooks are yours to keep. No joining fee.
          </p>
          {offer.refund.enabled && (
            <a className="sales-guarantee-link" href="#money-back-guarantee">
              <ShieldCheck size={18} aria-hidden="true" />
              {offer.refund.days}-day money-back guarantee on your first payment
            </a>
          )}
          <figure className="sales-products">
            <div className="sales-books">
              <Book kind="tantrums" />
              <Book kind="mealtimes" />
            </div>
            <figcaption>
              Two ebooks to keep. One AI helper to return to.
            </figcaption>
          </figure>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="recognition-heading"
        >
          <h2 id="recognition-heading">
            It’s hard to find the words when you’re already in the middle of it.
          </h2>
          <p>
            The food is on the table. Your child says no. Or you’re trying to
            leave the playground, and everyone else seems ready to go except
            your child.
          </p>
          <p>
            Maybe you’ve read advice that made sense at the time. But now you’re
            tired, the situation feels different, and you’re not sure what to
            try.
          </p>
          <p>
            You want a few words you can actually say. An idea for what to
            serve. A starting point you can think through before the next
            difficult moment.
          </p>
          <p>
            <strong>You don’t need to work everything out at once.</strong>{' '}
            Start with the question in front of you, then consider one small
            thing to try.
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
            A guide to come back to.
            <br />A place to ask the next question.
          </h2>
          <p className="sales-included-intro">
            Use the guides when you want to focus on a topic. Use the helper
            when you want to talk through an everyday situation.
          </p>
          <ol className="sales-inclusions">
            <li>
              <span className="inclusion-number">1</span>
              <div>
                <h3>Calmer Tantrums</h3>
                <p>
                  Make tantrums your starting topic when big feelings are the
                  part of your day you most want to think through. An ebook to
                  read at your own pace and return to when you want to revisit
                  the subject.
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
                  Make mealtimes your starting topic when “I’m not eating that”
                  keeps coming up. Keep the ebook as your reference when you
                  want to focus on this part of family life.
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
                  When a situation leaves you wondering what to say or try,
                  describe it in your own words. Ask for meal ideas, a recipe,
                  wording for a difficult moment or a different suggestion if
                  the first one doesn’t fit. It’s for everyday questions beyond
                  the books, too.
                </p>
                <p className="inclusion-ownership">
                  Use it while your subscription is active.
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
          <h2 id="chatbot-heading">Start with “here’s what’s happening…”</h2>
          <p>
            You don’t have to know the parenting term for it. Describe the
            moment, say what you’re unsure about, and ask for an idea to
            consider. Here’s what that starting point could look like.
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
            <strong>The next question might be different.</strong> Tonight it
            could be dinner. Tomorrow it could be bedtime or leaving the house.
            Ongoing helper access is what your monthly membership is for;
            keeping the books doesn’t depend on staying subscribed.
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
          <h2 id="how-heading">One question is enough to get started.</h2>
          <ol className="sales-how">
            <li>
              <strong>Join Little Steady.</strong> One membership includes both
              ebooks and the Messenger helper.
            </li>
            <li>
              <strong>
                Open your guides and follow the Messenger instructions.
              </strong>{' '}
              Your purchase page has your ebooks and the steps for opening your
              chat.
            </li>
            <li>
              <strong>
                Choose the moment you want to feel more prepared for.
              </strong>{' '}
              Pick a guide topic or describe one situation to the helper. Start
              with that, rather than trying to change every routine.
            </li>
          </ol>
          <p>
            You can start with a question before finishing either book. Take
            time to consider a suggestion, and ask a follow-up if it doesn’t
            fit.
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
              A place to turn when you’re not sure what to try next.
            </h2>
            <p className="sales-offer-summary">
              Both ebooks to keep + AI parenting help in Messenger.
            </p>
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
              <CheckItem>Cancel from your account</CheckItem>
            </ul>
            <CheckoutCTA />
            <p className="sales-disclosure">
              One monthly payment. No separate book purchase or chatbot upgrade.
            </p>
            <div className="sales-cancellation">
              <strong>Keep the books, even if you cancel.</strong>
              <p>
                Both ebooks are included with your first purchase. Chatbot stays
                available until the end of the time you’ve paid for. If you
                cancel future payments, the ebooks remain yours.
              </p>
            </div>
            {offer.refund.enabled && (
              <div className="sales-guarantee" id="money-back-guarantee">
                <ShieldCheck
                  className="guarantee-icon"
                  size={29}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3>
                  Try it for {offer.refund.days} days. Decide for yourself.
                </h3>
                <p>
                  If Little Steady isn’t right for you, ask for a{' '}
                  <strong>full refund of your first payment</strong> within{' '}
                  {offer.refund.days} days of your first purchase.
                </p>
                <p>
                  No lessons to finish. No need to prove that an approach
                  failed. Open your purchase and use the help option to ask for
                  your refund.
                </p>
                <p className="guarantee-terms">
                  A successful refund also stops future payments. This guarantee
                  covers your first payment only, not later monthly payments.
                  Your rights under consumer law still apply.
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
            Choose one moment you want to feel more prepared for.
          </h2>
          <p>
            Words for the next difficult transition. An idea for dinner. A place
            to ask, “What else could I try?” Start there.
          </p>
          <PrimaryCTA placement="closing" />
          <p className="sales-price-note">
            Both ebooks to keep. AI parenting help while you’re subscribed.
          </p>
        </section>
      </main>
    </>
  )
}
