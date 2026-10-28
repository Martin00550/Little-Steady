import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import {
  canPurchase,
  formatPrice,
  guaranteeLabel,
  offer,
  priceLabel,
  renewalLabel,
} from '../config'
import { track } from '../lib/analytics'
import { Book, BookArrangement, Sprig, Sun } from './Artwork'
import {
  Accordion,
  CheckItem,
  CheckoutCTA,
  Eyebrow,
  Header,
  PrimaryCTA,
} from './Shared'

const faqs = [
  {
    q: 'What ages is Little Steady for?',
    a: offer.readiness.ageRange
      ? `The guides cover ${offer.readiness.ageRange}. Every child and family is different; no particular result is guaranteed.`
      : 'The working focus is everyday early-childhood tantrums, transitions and mealtimes. The exact age range will be confirmed after the guides have been reviewed, before purchases open.',
  },
  {
    q: 'What exactly would I receive?',
    a: 'The planned membership includes the Calmer Tantrums and Calmer Mealtimes ebooks, plus access to an AI companion in a one-to-one Messenger conversation while subscribed. No workshops, human coaching, audio lessons or community are included.',
  },
  {
    q: 'Why a membership if I already have the books?',
    a: 'The books are your reference material. The planned recurring service is companion access for follow-up questions as everyday situations change. It is not a subscription to a static library or a promise of new content every month. The proposed terms let you keep the ebooks after cancellation.',
  },
  {
    q: 'Is the companion a person? Can it be wrong?',
    a: 'It is AI, not a human coach, clinician or emergency service. AI can misunderstand a situation and give incomplete or incorrect information. Use your own judgement and seek qualified professional advice when needed. Its capabilities and member-only access must be verified before it becomes available.',
  },
  {
    q: 'How is this different from free advice or general-purpose AI?',
    a: 'The intended difference is one place to return to: the two guides as reference material, with a companion designed to help you apply them. That connection is not yet verified. We are not claiming better accuracy or specialist expertise than other AI tools.',
  },
  {
    q: 'Do I need Messenger? Is it a group?',
    a: 'Messenger is the planned channel for the companion. It will be a one-to-one conversation with the business’s AI companion, not a group or human coach. Ebook delivery is planned through Whop. Final activation steps will be published before sales open.',
  },
  {
    q: 'Do I need to read both guides before I start?',
    a: 'You don’t need to make this another all-or-nothing project. The intended starting point is one current situation. Specific reading paths and readable samples will be added after the actual guides are reviewed; no reading time or included exercise is promised here.',
  },
  {
    q: 'What if I’ve tried the usual tips—or our situation is different?',
    a: 'Families have different needs. Little Steady will not promise that a particular approach works for every child, removes tantrums or changes eating. It should be an educational starting point, not a rigid parenting ideology. We cannot confirm its advice on boundaries, separate meals or caregiver routines until the guides are reviewed.',
  },
  {
    q: 'What if we need specialist help?',
    a: 'This is general parenting education, not assessment or treatment. If you are worried about feeding, growth, development, safety or persistent distress, speak with a qualified professional. For urgent danger or a medical emergency, contact your local emergency service rather than an AI companion.',
  },
  {
    q: 'What happens if I cancel or want a refund?',
    a: `Under the proposed terms, you would cancel future renewal through Whop, keep both ebooks, and have companion access for the remaining paid period. Cancelling is separate from requesting a refund. The proposed ${offer.refund.days}-day guarantee covers the first membership payment only, without completing lessons or proving failure. A successful refund would stop future renewals. Later payments are not included in that guarantee. Final refund instructions will be available before checkout opens.`,
  },
  {
    q: 'What happens to what I tell the companion?',
    a: 'The final privacy policy is not available yet. Messenger involves Meta, and an AI companion may involve additional service providers. Data storage, administrator access, processing and deletion procedures must be disclosed before launch. Please don’t share children’s names, birth dates, medical records or identifying details. We do not promise zero storage or end-to-end encryption.',
  },
  {
    q: 'Can another caregiver use it too?',
    a: 'The sharing policy and companion entitlement rules have not been confirmed. Do not assume one purchase provides a second Messenger account or permission to redistribute the ebooks. These details will be made clear before membership opens.',
  },
]

function Conversation() {
  return (
    <div className="conversation">
      <div className="conversation-header">
        <span className="conversation-avatar">
          <Sprig />
        </span>
        <div>
          <strong>Little Steady</strong>
          <span>AI parenting companion</span>
        </div>
        <MessageCircle size={19} />
      </div>
      <div className="conversation-body">
        <p className="chat-date">AN EVERYDAY MOMENT</p>
        <div className="chat-bubble chat-bubble--parent">
          My toddler gets upset when we leave the playground. Where do I start?
        </div>
        <div className="chat-bubble chat-bubble--ai">
          Let’s take one moment at a time. Would you like to focus on leaving,
          or on what happens before it’s time to go?
        </div>
        <span className="chat-note">
          <Sparkles size={13} /> A question, not another thing to get perfect.
        </span>
      </div>
      <div className="conversation-caption">
        Illustrative conversation · not a live demo
      </div>
    </div>
  )
}

export function SalesPage() {
  const live = canPurchase()
  return (
    <>
      <div className="announcement">
        A little steadiness is on its way.<span> Membership preview</span>
        <Sprig />
      </div>
      <Header />
      <main id="main-content">
        <section
          className="hero container"
          id="hero"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <Eyebrow>Parenting, one moment at a time</Eyebrow>
            <h1 id="hero-heading">
              A little calmer.
              <br />A little more
              <br />
              <em>steady.</em>
              <svg
                viewBox="0 0 250 22"
                className="headline-underline"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 14c62-12 149-12 237-3M36 20c66-8 134-9 189-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <p className="hero-description">
              For the big feelings, the refused dinners, and the “what do I do
              now?” moments.
            </p>
            <p className="hero-offer">
              Two parenting ebooks. A planned AI companion in Messenger. A
              clearer place to start.
            </p>
            <PrimaryCTA />
            {live ? (
              <p className="cta-note">
                {priceLabel()} · {renewalLabel()}
              </p>
            ) : (
              <p className="cta-note">
                Planned at {priceLabel()} · Not yet on sale
              </p>
            )}
            <a className="hero-secondary" href="#included">
              Take a little look inside
              <ArrowDown size={15} />
            </a>
          </div>
          <BookArrangement />
          <div className="hero-footnote">
            <Sprig />
            <span>
              Practical support. Room for real life. No perfect parenting
              required.
            </span>
          </div>
        </section>

        <section className="recognition" aria-labelledby="recognition-heading">
          <div className="container recognition-inner">
            <div className="recognition-heading">
              <span className="section-index">01 / THE EVERYDAY</span>
              <h2 id="recognition-heading">
                Small moments.
                <br />
                <em>Big feelings.</em>
              </h2>
            </div>
            <div className="recognition-moment">
              <span>01.</span>
              <p>
                You made dinner.
                <br />
                They won’t touch it.
              </p>
            </div>
            <div className="recognition-moment">
              <span>02.</span>
              <p>
                It’s time to leave.
                <br />
                The feelings arrive.
              </p>
            </div>
            <div className="recognition-moment">
              <span>03.</span>
              <p>
                The advice made sense.
                <br />
                Until you needed it.
              </p>
            </div>
            <p className="recognition-close">
              You’re not the only one. And you don’t need to figure everything
              out at once.
            </p>
          </div>
        </section>

        <section
          className="included-section container section-space"
          id="included"
          aria-labelledby="included-heading"
        >
          <div className="section-heading">
            <div>
              <Eyebrow>A small toolkit, thoughtfully put together</Eyebrow>
              <h2 id="included-heading">
                Something to read.
                <br />
                Someone to <em>ask.</em>
              </h2>
            </div>
            <p>
              Two guides to return to.
              <br />A planned companion for the in-between.
              <br />
              One place to find your next small step.
            </p>
          </div>
          <div className="guides-layout">
            <div className="guides-visual">
              <div className="mini-books">
                <Book kind="tantrums" small />
                <Book kind="mealtimes" small />
              </div>
              <span className="visual-caption">
                Cover concepts · ebook samples coming before launch
              </span>
            </div>
            <div className="guides-copy">
              <span className="pill">
                <BookOpen size={14} /> THE GUIDES · PLANNED: YOURS TO KEEP
              </span>
              <article>
                <span className="item-number">01</span>
                <div>
                  <h3>Calmer Tantrums</h3>
                  <p>
                    A parenting ebook about tantrums. For the moments when
                    feelings are big and you’re looking for a place to begin.
                  </p>
                </div>
              </article>
              <article>
                <span className="item-number">02</span>
                <div>
                  <h3>Calmer Mealtimes</h3>
                  <p>
                    A parenting ebook about mealtimes. For the everyday
                    questions that show up at the table.
                  </p>
                </div>
              </article>
              <div className="sample-note">
                <BookOpen size={17} />
                <p>
                  Real pages matter. Readable excerpts and exact age coverage
                  will be shared here before purchases open.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="companion-section container"
          aria-labelledby="companion-heading"
        >
          <div className="companion-panel">
            <div className="companion-copy">
              <span className="pill pill--light">
                <MessageCircle size={14} /> THE COMPANION · PLANNED
              </span>
              <h2 id="companion-heading">
                For the moment
                <br />
                after <em>“I’ve tried that.”</em>
              </h2>
              <p>Because everyday parenting doesn’t stop at the last page.</p>
              <p>
                The planned AI companion gives you a place to ask follow-up
                questions and explore how the guides relate to your situation,
                in a familiar Messenger conversation.
              </p>
              <ul className="check-list">
                <CheckItem>One-to-one conversation, not a group</CheckItem>
                <CheckItem>Companion access while subscribed</CheckItem>
                <CheckItem>
                  The books are the reference. The chat is the follow-up.
                </CheckItem>
              </ul>
              <div className="ai-disclosure">
                <ShieldCheck size={19} />
                <p>
                  AI, not a human coach. It can be wrong. General education, not
                  medical advice or emergency support. Companion access is not
                  available yet.
                </p>
              </div>
            </div>
            <div className="companion-demo">
              <Conversation />
              <span className="demo-under-note">
                A little less searching. A place to begin.
              </span>
            </div>
          </div>
        </section>

        <section
          className="how-section container section-space"
          aria-labelledby="how-heading"
        >
          <div className="section-heading">
            <div>
              <Eyebrow>No new routine to master</Eyebrow>
              <h2 id="how-heading">
                One small step.
                <br />
                <em>Then the next.</em>
              </h2>
            </div>
            <p>
              Here’s the planned path.
              <br />
              We’ll confirm access and activation
              <br />
              before the membership opens.
            </p>
          </div>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <h3>Make it yours</h3>
              <p>
                When available, purchase the membership through Whop. One clear
                monthly price, no joining fee.
              </p>
              <span className="step-caption">
                YOUR PURCHASE, IN ONE PLACE <ArrowUpRight size={13} />
              </span>
            </li>
            <li>
              <span className="step-number">2</span>
              <h3>Open your guides</h3>
              <p>
                Find both ebooks in your Whop purchase library. Choose the topic
                that feels most useful today.
              </p>
              <span className="step-caption">
                START WHERE YOU ARE <BookOpen size={13} />
              </span>
            </li>
            <li>
              <span className="step-number">3</span>
              <h3>Keep the conversation going</h3>
              <p>
                Follow the member activation steps for the AI companion. The
                final process and timing are still to be confirmed.
              </p>
              <span className="step-caption">
                ONE-TO-ONE, IN MESSENGER <MessageCircle size={13} />
              </span>
            </li>
          </ol>
        </section>

        <section
          className="approach-section"
          aria-labelledby="approach-heading"
        >
          <div className="container approach-inner">
            <div className="approach-art">
              <Sun />
              <span>
                imperfect days.
                <br />
                <em>small beginnings.</em>
              </span>
            </div>
            <div>
              <Eyebrow>Our starting point</Eyebrow>
              <h2 id="approach-heading">
                Support should feel
                <br />
                like support.<em> Not pressure.</em>
              </h2>
              <p>
                No promises of perfect behaviour. No “one trick” that works for
                every child. Just the intention to make everyday parenting feel
                a little more manageable.
              </p>
              <p>
                We want you to see what you’re choosing. Guide excerpts, creator
                information and sources will be available before sales open. We
                won’t borrow someone else’s results as our proof.
              </p>
              <a href="#questions" className="text-link">
                A few honest answers
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="membership-section container section-space"
          id="membership"
          aria-labelledby="membership-heading"
        >
          <div className="membership-intro">
            <Eyebrow>Less searching. A little more steady.</Eyebrow>
            <h2 id="membership-heading">
              A small place
              <br />
              to come <em>back to.</em>
            </h2>
            <p>
              The guides are your reference.
              <br />
              The companion is the ongoing part.
            </p>
            <p>
              Come back with follow-up questions as everyday moments change.
              Keep the books under the proposed terms, even if membership stops
              being right for you.
            </p>
            <div className="membership-flower">
              <Sprig />
              <span>
                A little help.
                <br />
                On your terms.
              </span>
            </div>
          </div>
          <div className="offer-card">
            <div className="offer-topline">
              <span>THE LITTLE STEADY MEMBERSHIP</span>
              <span className="offer-badge">
                {live ? 'Monthly membership' : 'Coming soon'}
              </span>
            </div>
            <p className="price">
              <span>{formatPrice()}</span>
              <span>
                {offer.price.currency} / {offer.price.interval}
              </span>
            </p>
            <p className="offer-renewal">
              {!live && 'Planned price. '}
              {renewalLabel()}
            </p>
            <div className="offer-divider" />
            <p className="offer-list-label">
              {live
                ? 'A little support, all together:'
                : 'The planned membership includes:'}
            </p>
            <ul className="check-list offer-list">
              <CheckItem>Calmer Tantrums ebook</CheckItem>
              <CheckItem>Calmer Mealtimes ebook</CheckItem>
              <CheckItem>AI companion in Messenger while subscribed</CheckItem>
              <CheckItem>Both ebooks to keep after cancellation</CheckItem>
              <CheckItem>No joining fee or separate upsell</CheckItem>
            </ul>
            <CheckoutCTA />
            <p className="offer-availability">
              {live
                ? 'Complete your purchase securely through Whop.'
                : 'We’re getting everything ready. Purchases aren’t open yet.'}
            </p>
            <div className="guarantee">
              <ShieldCheck size={23} />
              <div>
                <strong>
                  {offer.refund.adopted
                    ? guaranteeLabel()
                    : `A proposed ${offer.refund.days}-day first-payment guarantee`}
                </strong>
                <p>
                  {offer.refund.adopted
                    ? 'No lessons to complete or approach to prove failed.'
                    : 'No lessons to complete. No need to prove an approach failed. Final terms will be confirmed before sales open.'}{' '}
                  Successful refunds would stop future renewals. Later payments
                  aren’t covered by this introductory guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="faq-section container"
          id="questions"
          aria-labelledby="faq-heading"
        >
          <div className="faq-intro">
            <Eyebrow>It’s okay to have questions</Eyebrow>
            <h2 id="faq-heading">
              A little clarity
              <br />
              before you <em>begin.</em>
            </h2>
            <p>
              No big promises.
              <br />
              Just straight answers.
            </p>
            <Sprig />
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <Accordion
                key={f.q}
                question={f.q}
                onOpen={() => track('preview_interaction', { target: 'faq' })}
              >
                <p>{f.a}</p>
              </Accordion>
            ))}
          </div>
        </section>

        <section
          className="closing-section container"
          aria-labelledby="closing-heading"
        >
          <Sprig />
          <p className="eyebrow">YOU DON’T HAVE TO DO IT ALL TODAY</p>
          <h2 id="closing-heading">
            Start with a little.
            <br />
            <em>Find your steady.</em>
          </h2>
          <p>A clearer place to begin, for the moments that matter.</p>
          <PrimaryCTA placement="closing">Explore the membership</PrimaryCTA>
          <p className="closing-note">
            {live
              ? `${priceLabel()} · ${renewalLabel()}`
              : `Planned at ${priceLabel()} · Membership opening soon`}
          </p>
        </section>
      </main>
    </>
  )
}
