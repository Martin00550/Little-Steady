import { CornerDownRight, MessageSquareText, RefreshCw } from 'lucide-react'
import { formatPrice, priceLabel, renewalLabel } from '../config'
import { mealtimeExample, tantrumExample } from '../content/conversations'
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
    a: 'The main Playbook is for ages 2–6. Calmer Tantrums and Calmer Mealtimes focus on ages 18 months–5 years. Families differ: the guides and companion offer practical education, not guaranteed changes in behavior or eating. Explain what does and doesn’t fit when you ask a follow-up.',
  },
  {
    q: 'Is someone personally answering my messages?',
    a: 'No. Mila, the parenting companion, is AI. It can misunderstand a situation or make mistakes. Human customer support, where offered, is separate from the companion.',
  },
  {
    q: 'Why wouldn’t I just use a general AI chatbot?',
    a: 'Little Steady brings a practical parenting playbook, two specialist bonus guides and Mila in Messenger together. The guides give you a reference; the companion is a place for everyday questions and follow-ups. Decide whether that combination is useful for your family.',
  },
  {
    q: 'Do I need a new app or have to finish the books first?',
    a: 'You need Facebook Messenger for the companion. You can start with a question before finishing the guides. Your ebooks and Messenger access instructions are in your purchase library.',
  },
  {
    q: 'What if we need more specialized help?',
    a: 'Significant feeding difficulties, developmental concerns, safety concerns or ongoing distress may need assessment from a qualified professional. Little Steady is general parenting education, not diagnosis, therapy or emergency support.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'Cancel future renewals in your account before your next billing date. You keep all three guides. Companion access continues through your paid period, then ends. Refund requests are handled separately under the published refund policy and consumer law.',
  },
  {
    q: 'What should I share in the chat?',
    a: 'Describe the situation without children’s names, birth dates, medical records or other identifying details. Messenger and AI services process messages; this is not a private clinical consultation. Read the service’s privacy terms before use.',
  },
]
export const tantrumHeadline =
  'It’s time to leave the park. What do you say when your child starts to melt down?'

export function SalesPage({ tantrums = false }: { tantrums?: boolean }) {
  const practiceExample = (
    <aside className="practice-example" aria-labelledby="practice-title">
      <p className="eyebrow">Put it together</p>
      <h3 id="practice-title">Words you can borrow today.</h3>
      <blockquote>
        “You want to keep playing. It’s time to go home. I’ll help you say
        goodbye to the slide.”
      </blockquote>
      <p>
        <strong>Before the next visit:</strong> explain an ending you can keep,
        such as “After one more slide, shoes and home.”
      </p>
      <p>
        <strong>If they still cry:</strong> that doesn’t mean the words failed.
        Keep everyone safe, say less, and offer comfort or space while staying
        nearby. The aim is a clearer, supported transition—not making
        disappointment disappear.
      </p>
      <p className="sample-note">
        Adapted from The Calmer Parenting Playbook, pages 12 and 17. Adjust the
        words to your child’s communication and support needs.
      </p>
    </aside>
  )
  const tantrumGuide = (
    <article
      className={tantrums ? 'playbook-feature' : 'guide-feature'}
      aria-labelledby="tantrums-title"
    >
      <div className={tantrums ? 'playbook-art' : 'guide-art'}>
        <Book kind="tantrums" />
      </div>
      <div className={tantrums ? 'playbook-copy' : 'guide-copy'}>
        <span className="ownership-tag">
          {tantrums ? 'Featured guide' : 'Bonus guide'} · 36 pages · Ages 18
          months–5 years
        </span>
        <h3 id="tantrums-title">Calmer Tantrums</h3>
        <p>
          Understand big feelings and find practical words for clear, caring
          limits.
        </p>
        <ul className="guide-contents">
          <li>
            {tantrums
              ? 'A quick-start page you can reach for when you’re unsure what to say.'
              : 'A quick-start page for the next tantrum.'}
          </li>
          <li>
            {tantrums
              ? 'Short scripts for leaving, saying no, and keeping a limit when your child is upset.'
              : 'Language for limits and difficult transitions.'}
          </li>
          <li>
            {tantrums
              ? 'A flexible two-week plan and printable tools to practice one recurring situation at a time.'
              : 'A flexible two-week practice sequence and printable tools.'}
          </li>
        </ul>
        <GuidePreview kind="tantrums" title="Calmer Tantrums" />
      </div>
    </article>
  )
  const companion = (
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
            {tantrums
              ? 'You’ve said it’s time to go. Your child is still upset and wants to stay. What could you try next?'
              : 'You understand the idea. But at dinner, your child wants something different—and you’re worried they haven’t eaten enough. What does that advice look like now?'}
          </p>
          <p>
            Bring the situation to Mila. Start with one question, then ask about
            the part that doesn’t fit.
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
        </div>
        <Conversation
          id={tantrums ? 'tantrum-chat' : 'mealtime-chat'}
          messages={tantrums ? tantrumExample : mealtimeExample}
        />
      </div>
    </section>
  )
  return (
    <>
      <Header />
      <main id="main-content" className="sales-page">
        {tantrums ? (
          <section
            className="tantrums-hero section container"
            id="hero"
            aria-labelledby="hero-heading"
          >
            <p className="eyebrow">For parents of toddlers and preschoolers</p>
            <h1 id="hero-heading">{tantrumHeadline}</h1>
            <p className="hero-intro">
              Your child wants another turn on the slide. You need to get home.
              You’ve said it’s time to go, and now there are tears. It’s hard to
              find the words when you’re trying to help them and keep the day
              moving.
            </p>
          </section>
        ) : (
          <>
            <section
              className="hero section container"
              id="hero"
              aria-labelledby="hero-heading"
            >
              <div className="hero-copy">
                <p className="eyebrow">For the parent who’s trying so hard</p>
                <h1 id="hero-heading">
                  You want to stay calm.
                  <br />
                  <em>But the same battles keep wearing you down.</em>
                </h1>
                <p className="hero-intro">
                  Getting dressed takes reminder after reminder. Food they
                  usually eat is suddenly refused. Bedtime keeps stretching on.
                  And you’re trying to stay patient through all of it.
                </p>
                <p className="hero-reassurance">
                  You love your child. You’re exhausted.
                  <br />
                  Both can be true.
                </p>
              </div>
              <div
                className="hero-product pain-scenes"
                aria-label="The ordinary moments that can feel so hard"
              >
                <p className="eyebrow">
                  It’s rarely just one difficult moment.
                </p>
                <div className="pain-scene">
                  <span>01 / Getting out the door</span>
                  <h2>“Please. We need to go.”</h2>
                  <p>
                    Getting dressed, putting on shoes, leaving the
                    house—something simple turns into another back-and-forth.
                    You’re repeating yourself, and you can feel your patience
                    running out.
                  </p>
                </div>
                <div className="pain-scene">
                  <span>02 / Another meal</span>
                  <h2>“But you liked this before.”</h2>
                  <p>
                    You’ve put food in front of them, but they don’t want it.
                    Now you’re wondering whether they’ve eaten enough—and
                    whether to offer something else.
                  </p>
                </div>
                <div className="pain-scene">
                  <span>03 / When you need a moment yourself</span>
                  <h2>“Can you stay a little longer?”</h2>
                  <p>
                    Another request. Another call for you. You want them to feel
                    settled, and you’re wondering when you’ll get a moment to
                    rest too.
                  </p>
                </div>
              </div>
            </section>
            <section
              className="recognition-section section"
              id="familiar"
              aria-labelledby="recognition-heading"
            >
              <div className="container story-layout">
                <div>
                  <p className="eyebrow">The part people don’t always see</p>
                  <h2 id="recognition-heading">
                    It’s the wondering what to do.
                    <br />
                    All day. Every day.
                  </h2>
                </div>
                <div className="story-copy">
                  <p>
                    Hold the limit, or let this one go? Comfort them, or give
                    them space? Try another suggestion, or stay consistent with
                    the last one?
                  </p>
                  <p>
                    There’s no shortage of parenting advice. But in the middle
                    of a hard moment, remembering it—and deciding what fits your
                    child—can feel like another job.
                  </p>
                  <p>
                    Sometimes it’s turning off a show. Sometimes it’s leaving
                    the playground. You want to hold a limit without turning the
                    next part of the day into another struggle.
                  </p>
                  <p className="story-emphasis">
                    Then, when the house is finally quiet, you might find
                    yourself replaying a moment that didn’t go how you hoped.
                    You wanted to respond differently. You still need something
                    practical to try next time.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
        <section
          className="better-way section container"
          id="better-way"
          aria-labelledby="better-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A different place to start</p>
              <h2 id="better-heading">
                {tantrums ? (
                  'What to say when it’s time to go'
                ) : (
                  <>
                    A plan for the hard moment.
                    <br />
                    Not another promise to “try harder.”
                  </>
                )}
              </h2>
            </div>
            <p>
              You don’t have to change your whole family at once. Start with one
              recurring situation, one clear response, and a small step you can
              practice.
            </p>
          </div>
          {tantrums && practiceExample}
          <div className="try-intro">
            <p className="eyebrow">Try this at the next difficult transition</p>
            <h3>Three parts to a clearer boundary.</h3>
            <p>
              When it’s time to leave the playground, try a short response that
              names the feeling, keeps the limit clear, and offers help.
            </p>
          </div>
          <div className="approach-grid">
            <article>
              <span className="eyebrow">01 / Acknowledge</span>
              <h3>Name what they want.</h3>
              <p>
                “You want to keep playing.” You’re showing that you understand,
                without promising more time.
              </p>
            </article>
            <article>
              <span className="eyebrow">02 / Keep it clear</span>
              <h3>State the limit simply.</h3>
              <p>
                “It’s time to go home.” Save the long explanation for a calmer
                moment. You don’t need to make the limit sound enjoyable.
              </p>
            </article>
            <article>
              <span className="eyebrow">03 / Stay alongside them</span>
              <h3>Offer the next small step.</h3>
              <p>
                “I’ll help you say goodbye to the slide.” Point or show them
                what comes next, and offer support that fits their abilities.
              </p>
            </article>
          </div>
          {!tantrums && practiceExample}
          {!tantrums && (
            <div className="solution-intro">
              <p className="eyebrow">This is where Little Steady comes in</p>
              <h3>
                Something to turn to when you’re thinking,
                <br />
                “What do I do now?”
              </h3>
              <p>
                The Calmer Parenting Playbook gives you a practical starting
                point. Two focused bonus guides go deeper into tantrums and
                mealtimes. Mila, your AI companion in Messenger, is a place for
                the everyday questions that follow.
              </p>
              <p className="sample-note">
                Practical education for the little years. No perfect-parent
                promise.
              </p>
            </div>
          )}
        </section>
        {!tantrums && companion}
        <section
          className="guides-section section container"
          id="included"
          aria-labelledby="guides-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Read at your own pace</p>
              <h2 id="guides-heading">
                {tantrums ? (
                  'Start with Calmer Tantrums.'
                ) : (
                  <>
                    One everyday playbook.
                    <br />
                    Two focused bonuses.
                  </>
                )}
              </h2>
            </div>
            <p>
              {tantrums
                ? 'Open the quick-start page and find something to try in the moment that keeps happening.'
                : 'Start with everyday parenting, then use the bonus guide for the situation that keeps happening. Choose one manageable change.'}
            </p>
          </div>
          {tantrums && tantrumGuide}
          <article
            className="playbook-feature"
            aria-labelledby="playbook-title"
          >
            <div className="playbook-art">
              <Book kind="parenting" />
            </div>
            <div className="playbook-copy">
              <span className="ownership-tag">
                Your main guide · 41 pages · Ages 2–6
              </span>
              <h3 id="playbook-title">The Calmer Parenting Playbook</h3>
              <p>
                A practical place to start with clear limits, everyday routines,
                and the moments when you’re unsure what to say.
              </p>
              <ul className="guide-contents">
                <li>
                  Words to borrow for boundaries, big feelings, and repair after
                  shouting.
                </li>
                <li>
                  Practical guidance for mornings, transitions, screens,
                  bedtime, and sibling disagreements.
                </li>
                <li>
                  A flexible 30-day practice plan, worked examples, and
                  printable worksheets.
                </li>
              </ul>
              <GuidePreview
                kind="parenting"
                title="The Calmer Parenting Playbook"
              />
              <p className="sample-note">Read a real page: “Your first day.”</p>
            </div>
          </article>
          <div className="bonus-heading">
            <p className="eyebrow">Also included with your membership</p>
            <h3>Go deeper where you need it.</h3>
          </div>
          <div className="guide-grid">
            {!tantrums && tantrumGuide}
            <article
              className="guide-feature"
              aria-labelledby="mealtimes-title"
            >
              <div className="guide-art">
                <Book kind="mealtimes" />
              </div>
              <div className="guide-copy">
                <span className="ownership-tag">
                  Bonus guide · 35 pages · Ages 18 months–5 years
                </span>
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
        {tantrums && companion}
        <section
          className="how-section section"
          id="how-it-works"
          aria-labelledby="how-heading"
        >
          <div className="container">
            <p className="eyebrow">A simple starting point</p>
            <h2 id="how-heading">Download your guides. Open Mila.</h2>
            <p>After joining, both are on your thank-you page.</p>
            <ol className="onboarding-sequence onboarding-sequence--two">
              <li>
                <span className="step-number" aria-hidden="true">
                  01
                </span>
                <div>
                  <h3>Download all three guides</h3>
                  <p>
                    Choose PDF or EPUB and open them in your Books app or
                    preferred reader.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-number" aria-hidden="true">
                  02
                </span>
                <div>
                  <h3>Open Mila in Messenger</h3>
                  <p>
                    Tap the link on your thank-you page and ask your first
                    question.
                  </p>
                </div>
              </li>
            </ol>
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
              Use the guides as your reference. Return to Mila with an everyday
              question, ask a follow-up, and think through what could fit your
              family. Your monthly membership keeps that conversation available.
            </p>
            <ul className="check-list">
              <CheckItem>One-to-one AI conversations in Messenger</CheckItem>
              <CheckItem>Everyday parenting questions and follow-ups</CheckItem>
              <CheckItem>
                The Calmer Parenting Playbook + both bonus guides, yours to keep
              </CheckItem>
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
              Three guides to keep + Mila in Messenger
            </p>
            <CheckoutCTA />
            <p className="billing-note">
              Your first payment is {formatPrice()} today. Your membership
              renews monthly until canceled.
            </p>
            <p className="cancellation-note">
              Cancel future renewals through your account before your next
              billing date. Companion access continues through the period you’ve
              paid for. All three guides remain yours.
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
            {(tantrums
              ? [
                  {
                    q: 'What if my child still gets upset?',
                    a: 'A clear limit can still be disappointing. These guides help you choose what to say and how to support your child through the transition. The goal is to make the next step clearer and safer.',
                  },
                  ...faqs,
                ]
              : faqs
            ).map((faq) => (
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
              <p>
                Your playbook. Two bonus guides. Mila for the next question.
              </p>
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
