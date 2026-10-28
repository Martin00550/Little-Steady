import {
  bundleFirstPayment,
  canPurchase,
  formatPrice,
  offer,
  priceLabel,
} from '../config'
import { track } from '../lib/analytics'
import { Book } from './Artwork'
import { Accordion, CheckItem, CheckoutCTA, Header, PrimaryCTA } from './Shared'

const examples = [
  {
    topic: 'When dinner feels like another decision',
    question: '“What can I make with eggs, rice and frozen peas?”',
    detail: 'Ask for meal ideas and recipes using what you have.',
  },
  {
    topic: 'When you can’t find the words',
    question: '“My child won’t leave the playground. What can I say?”',
    detail: 'Ask for wording for a specific parenting moment.',
  },
  {
    topic: 'When the usual idea doesn’t fit',
    question: '“That won’t work for us. Can you suggest another way?”',
    detail: 'Follow up rather than starting your search again.',
  },
  {
    topic: 'When you need a place to start',
    question: '“Bedtime keeps turning into an argument. What could I try?”',
    detail: 'Bring an everyday parenting question, beyond tantrums and meals.',
  },
]
const faqs = [
  {
    q: 'What am I paying for?',
    a: 'There are two separate offers. The ebook bundle is a one-time purchase of Calmer Tantrums and Calmer Mealtimes. The combined offer adds the optional AI parenting helper. Its first payment includes the books and your first chatbot month; only chatbot access renews monthly. Buying just the books does not start that subscription.',
  },
  {
    q: 'Do I have to subscribe to get the books?',
    a: 'No. Pay once for the two-guide bundle and keep the ebooks. You do not need a chatbot subscription to buy or keep them.',
  },
  {
    q: 'What can I ask the chatbot?',
    a: 'It is being prepared for everyday parenting questions: meal ideas, recipes, words to use in a difficult moment, transitions, bedtime and follow-up questions. It is not limited to explaining the ebooks. The examples on this page show intended uses, not tested responses or a live demonstration.',
  },
  {
    q: 'Why pay monthly when I can search for ideas?',
    a: 'The subscription is for a place to bring an everyday question and keep asking follow-ups in Messenger. It is not a payment to keep your books or a promise of new ebooks every month. The value should come from help you actually use. We will share real examples before subscriptions open so you can decide if it suits you.',
  },
  {
    q: 'Is the parenting helper a person?',
    a: 'It is AI, not a human coach or a clinician. It can misunderstand your question and give incorrect information. Use your judgement, check recipe ingredients for your family’s needs, and seek qualified help for medical, feeding, developmental or safety concerns. It is not an emergency service.',
  },
  {
    q: 'What ages are the guides for?',
    a: offer.readiness.ageRange
      ? `The guides cover ${offer.readiness.ageRange}. Every family is different.`
      : 'The focus is early-childhood tantrums and mealtimes. Exact age coverage and readable samples will be available before the books go on sale.',
  },
  {
    q: 'Do I need to read both guides before using the chatbot?',
    a: 'No. You do not need to finish either guide before asking an everyday parenting question. The combined offer includes both books, but the helper is for broader parenting questions too.',
  },
  {
    q: 'Do I need Messenger?',
    a: 'Only for the optional chatbot. The ebooks are accessed through your Whop purchase library. The helper is a one-to-one AI chat in Messenger, not a group. Access instructions and any activation steps will be provided with that subscription.',
  },
  {
    q: 'What happens when I cancel the chatbot?',
    a: 'The proposed subscription terms let you cancel future renewal through Whop and use the chatbot for the remaining paid period. Cancelling it does not remove the ebooks included in your purchase. It does not automatically refund a payment.',
  },
  {
    q: 'Can I get a refund?',
    a: `Refunds are separate from cancellation. A voluntary ${offer.refund.days}-day guarantee on the first chatbot payment is being considered; it is not yet an adopted sales policy. That proposal would not require completing lessons or proving an approach failed, and a successful refund would stop future chatbot renewals. It would not cover later payments. That proposal covers only the chatbot portion of a combined payment. Book refund terms and the final policies will be stated before checkout opens. Statutory rights are unaffected.`,
  },
  {
    q: 'What about privacy and sharing with another caregiver?',
    a: 'Privacy and account-sharing terms will be available before the chatbot opens. Messenger involves Meta and the AI may involve other providers. Data storage, processing, administrator access and deletion arrangements are not yet confirmed. Avoid sharing children’s names, birth dates or medical records. Do not assume one subscription provides a second Messenger account.',
  },
]

export function SalesPage() {
  const guidesLive = canPurchase('guides')
  const chatbotLive = canPurchase('bundle')
  const guidesPrice = formatPrice('guides')
  const chatbotPrice = formatPrice('chatbot')
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
            For the “what do I do now?” moments of parenting
          </p>
          <h1 id="hero-heading">
            Dinner’s refused. Your child’s upset. What do you try next?
          </h1>
          <p className="sales-subhead">
            Start with <strong>Calmer Tantrums</strong> and{' '}
            <strong>Calmer Mealtimes</strong>—two ebooks you buy once and keep.
            Want help with the next question? Choose an optional AI parenting
            helper in Messenger.
          </p>
          <PrimaryCTA />
          <p className="sales-price-note">
            {guidesPrice ? `${priceLabel('guides')}. ` : ''}
            <strong>Buy the books once. No subscription required.</strong>
            {!guidesLive && (
              <>
                <br />
                Coming soon. Checkout is not open yet.
              </>
            )}
          </p>
          <figure className="sales-products">
            <div className="sales-books">
              <Book kind="tantrums" />
              <Book kind="mealtimes" />
            </div>
            <figcaption>
              Two ebooks. Yours to keep.
              <br />
              Cover concepts shown; guide samples will be added before launch.
            </figcaption>
          </figure>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="recognition-heading"
        >
          <h2 id="recognition-heading">
            Sometimes you just need to know what to do next.
          </h2>
          <p>
            You’ve made dinner, and now nobody wants it. You need to leave, and
            your child is still on the playground. You’re tired, and the words
            you wanted to use have disappeared.
          </p>
          <p>
            In that moment, another hour of scrolling probably isn’t what you’re
            looking for.
          </p>
          <p>
            You want a meal idea. A way to explain the boundary. Something to
            say that sounds like you. A place to start when you’re not sure.
          </p>
          <p>
            That’s the idea behind Little Steady:{' '}
            <strong>
              guides for the topics you want to focus on, and optional help for
              the questions that come up along the way.
            </strong>
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          id="included"
          aria-labelledby="included-heading"
        >
          <p className="sales-kicker">
            The two-guide bundle · one-time purchase
          </p>
          <h2 id="included-heading">
            Start with the part of your day that feels hardest.
          </h2>
          <ol className="sales-inclusions">
            <li>
              <span className="inclusion-number">1</span>
              <div>
                <h3>Calmer Tantrums</h3>
                <p>
                  For the days when big feelings take over. Choose this ebook
                  when tantrums are the topic you want to focus on first.
                </p>
              </div>
            </li>
            <li>
              <span className="inclusion-number">2</span>
              <div>
                <h3>Calmer Mealtimes</h3>
                <p>
                  For the “I’m not eating that” days. Choose this ebook when
                  your questions keep coming back to mealtimes.
                </p>
              </div>
            </li>
          </ol>
          <p>
            <strong>You get both books with one purchase.</strong> There’s no
            monthly book payment, no requirement to buy the chatbot and no
            subscription to maintain to keep them.
          </p>
          <p className="sales-disclosure">
            Readable samples, exact age coverage and creator information will be
            available before the bundle goes on sale.
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          id="chatbot-preview"
          aria-labelledby="chatbot-heading"
        >
          <p className="sales-kicker">Optional upgrade · monthly AI helper</p>
          <h2 id="chatbot-heading">
            “What could I make?”
            <br />
            “What could I say?”
            <br />
            Ask your parenting helper.
          </h2>
          <p>
            The Little Steady chatbot is an AI helper you can message in
            Messenger about everyday parenting. Meal ideas, recipes, tricky
            conversations, transitions, bedtime—and the follow-up question you
            didn’t think of until a minute later.
          </p>
          <p>
            <strong>It’s for more than the two book topics.</strong> Bring the
            situation you’re dealing with and ask for an idea, some wording, or
            another approach to consider.
          </p>
          <div className="sales-examples">
            <p className="sales-example-label">Examples of questions to ask</p>
            {examples.map((example) => (
              <div className="sales-example" key={example.question}>
                <h3>{example.topic}</h3>
                <p className="sales-example-question">{example.question}</p>
                <p>{example.detail}</p>
              </div>
            ))}
          </div>
          <p>
            You can ask a follow-up, explain what doesn’t fit your family, or
            ask for a simpler suggestion. You don’t have to read both books
            first.
          </p>
          <p className="sales-disclosure">
            Chatbot preview: these are intended uses, not tested responses.
            Access is not open yet. This is AI, not a human coach; it can be
            wrong. It isn’t medical advice, therapy or emergency support.
          </p>
        </section>

        <section
          className="sales-section sales-prose"
          aria-labelledby="how-heading"
        >
          <h2 id="how-heading">Choose what would help you today.</h2>
          <ol className="sales-how">
            <li>
              <strong>Want the guides?</strong> Buy the two-book bundle once
              through Whop. Open your ebooks in your purchase library.
            </li>
            <li>
              <strong>Want extra help too?</strong> Choose the books + AI helper
              option and follow the Messenger access instructions. Only the
              chatbot renews monthly.
            </li>
            <li>
              <strong>Start with one thing.</strong> Pick a guide topic or an
              everyday question. You don’t need to change everything at once.
            </li>
          </ol>
          <PrimaryCTA placement="mid-page">See the guide bundle</PrimaryCTA>
        </section>

        <section
          className="sales-section sales-prose"
          id="offers"
          aria-labelledby="offers-heading"
        >
          <h2 id="offers-heading">
            One purchase for the books.
            <br />
            Add the chatbot only if you want it.
          </h2>
          <div className="sales-offer" id="guide-offer">
            <p className="sales-kicker">Calmer Tantrums + Calmer Mealtimes</p>
            <h3 className="offer-title">The two-guide bundle</h3>
            {guidesPrice ? (
              <p className="sales-offer-price">
                <strong>{guidesPrice}</strong> {offer.guides.currency} once
              </p>
            ) : (
              <p className="sales-price-pending">
                One-time price announced before sales open
              </p>
            )}
            <p className="sales-offer-renewal">
              <strong>One payment. Both ebooks to keep.</strong>
            </p>
            <ul className="check-list">
              <CheckItem>Calmer Tantrums ebook</CheckItem>
              <CheckItem>Calmer Mealtimes ebook</CheckItem>
              <CheckItem>No recurring book payments</CheckItem>
              <CheckItem>No chatbot subscription needed</CheckItem>
            </ul>
            <CheckoutCTA product="guides" />
            <p className="sales-disclosure">
              {guidesLive
                ? 'Secure checkout through Whop. This purchase does not start a subscription.'
                : 'Coming soon. This purchase will not start a subscription.'}
            </p>
          </div>
          <div className="sales-offer sales-chatbot-offer" id="chatbot-offer">
            <p className="sales-kicker">
              Optional upgrade · books + monthly chatbot
            </p>
            <h3 className="offer-title">
              Both guides + your AI parenting helper
            </h3>
            {bundleFirstPayment() ? (
              <>
                <p className="sales-offer-price">
                  <strong>{bundleFirstPayment()}</strong>{' '}
                  {offer.guides.currency} today
                </p>
                <p className="sales-payment-breakdown">
                  {priceLabel('guides')} for both books + {chatbotPrice} for the
                  first chatbot month.
                </p>
              </>
            ) : (
              <p className="sales-price-pending">
                Combined price announced before sales open
              </p>
            )}
            <p className="sales-offer-renewal">
              Then {priceLabel('chatbot')} from month two, until cancelled.
              {!offer.chatbot.termsConfirmed &&
                ' Chatbot pricing is a proposal.'}
            </p>
            <ul className="check-list">
              <CheckItem>Both ebooks, yours to keep</CheckItem>
              <CheckItem>Meal ideas and recipes to consider</CheckItem>
              <CheckItem>Words for specific parenting situations</CheckItem>
              <CheckItem>Everyday questions beyond the book topics</CheckItem>
              <CheckItem>One-to-one AI chat and follow-up questions</CheckItem>
              <CheckItem>Access during your paid subscription</CheckItem>
            </ul>
            <CheckoutCTA product="bundle" />
            <p className="sales-disclosure">
              {chatbotLive
                ? 'Combined checkout through Whop.'
                : 'This offer is not open yet.'}{' '}
              Only choose this option if you want the monthly chatbot. Keep the
              books if you cancel chatbot renewal.
            </p>
            <div className="sales-guarantee">
              <h4>
                {offer.refund.adopted
                  ? `${offer.refund.days}-day first-payment money-back guarantee`
                  : `Proposed: ${offer.refund.days}-day first-payment guarantee`}
              </h4>
              <p>
                For the chatbot portion of the first payment only, not the ebook
                price. No lessons to finish or approach to prove failed. A
                successful refund would stop future chatbot renewals. Later
                payments are not covered.
                {!offer.refund.adopted &&
                  ' Final terms will be available before subscriptions open.'}
              </p>
            </div>
          </div>
          <p className="sales-disclosure offer-separation">
            Choose one checkout: books only, or books + chatbot. Do not buy both
            options—the combined offer already includes the books.
          </p>
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
            Start with the part of the day you want help with.
          </h2>
          <p>
            You don’t need to become a different parent overnight. Choose a
            starting point that feels useful today.
          </p>
          <PrimaryCTA placement="closing">See the guide bundle</PrimaryCTA>
          <p className="sales-price-note">
            Buy the books once. The chatbot is optional.
          </p>
        </section>
      </main>
    </>
  )
}
