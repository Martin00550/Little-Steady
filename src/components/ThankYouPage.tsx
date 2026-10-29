import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Copy } from 'lucide-react'
import {
  offer,
  priceLabel,
  renewalLabel,
  safeUrl,
  supportHref,
} from '../config'
import { Brand, Eyebrow } from './Shared'

function StarterQuestion({ question }: { question: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  async function copy() {
    try {
      await navigator.clipboard.writeText(question)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), 4000)
  }
  return (
    <div className="starter-question">
      <p>“{question}”</p>
      <button
        className="copy-button"
        aria-label={`Copy: ${question}`}
        onClick={copy}
      >
        {status === 'copied' ? <Check size={16} /> : <Copy size={16} />}
        {status === 'copied' ? 'Copied' : 'Copy question'}
      </button>
      <span className="sr-only" role="status">
        {status === 'copied' ? 'Question copied to clipboard.' : ''}
      </span>
      {status === 'failed' && (
        <p className="copy-fallback" role="status">
          Select the question text to copy it manually.
        </p>
      )}
    </div>
  )
}

/** Static post-purchase redirect. No payment verification, paid files or purchase events. */
export function ThankYouPage() {
  const library = safeUrl(offer.links.library),
    messenger = safeUrl(offer.links.messenger)
  const manage = safeUrl(offer.links.manage),
    support = supportHref()
  return (
    <>
      <header className="header container thankyou-header">
        <Brand />
        <a href="/" className="text-link">
          <ArrowLeft size={15} /> Back to Little Steady
        </a>
      </header>
      <main id="main-content" className="thankyou-main container">
        <section className="thankyou-welcome" aria-labelledby="welcome-heading">
          <Eyebrow>Welcome to Little Steady</Eyebrow>
          <h1 id="welcome-heading">Let’s make your first step simple.</h1>
          <p>
            Think of one moment you’d like to feel more prepared for: dinner,
            leaving the playground, or finding the words when feelings run high.
            You can start there, with one guide or one question.
          </p>
        </section>
        <div className="thankyou-steps">
          <section className="thankyou-step" aria-labelledby="guides-title">
            <span className="thankyou-number">01</span>
            <div>
              <h2 id="guides-title">Open your two guides</h2>
              <p>
                Sign in with the email you used at checkout, then open your
                Little Steady purchase.
              </p>
              <div className="thankyou-titles">
                <span>Calmer Tantrums</span>
                <span>Calmer Mealtimes</span>
              </div>
              <p>
                If mealtimes are on your mind, start with Calmer Mealtimes. If
                big feelings are the part you want to focus on, start with
                Calmer Tantrums. Both ebooks are yours to keep after
                cancellation.
              </p>
              <a
                className="button button--primary"
                href={library || 'https://whop.com/'}
              >
                {library ? 'Open your guides' : 'Find your guides'}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </section>
          <section className="thankyou-step" aria-labelledby="messenger-title">
            <span className="thankyou-number">02</span>
            <div>
              <h2 id="messenger-title">Get started in Messenger</h2>
              <p>
                Open your purchase and follow the steps for starting your
                Messenger chat.
              </p>
              <p>
                You’ll be messaging Little Steady’s AI parenting companion in a
                one-to-one conversation—not joining a group or talking with a
                human coach.
              </p>
              <a
                className="button button--primary"
                href={messenger || library || 'https://whop.com/'}
              >
                {messenger
                  ? 'Open the companion in Messenger'
                  : 'Find your chat instructions'}
                <ArrowUpRight size={17} />
              </a>
              <p className="thankyou-small">
                If your chat is not ready, check the instructions in your
                purchase or use the help link below.
              </p>
            </div>
          </section>
          <section className="thankyou-step" aria-labelledby="start-title">
            <span className="thankyou-number">03</span>
            <div>
              <h2 id="start-title">Start with today’s question</h2>
              <p>
                What’s happening, and what are you unsure about? Ask for words
                to try, an idea for dinner, or another suggestion if something
                doesn’t fit. You can copy a question below to begin.
              </p>
              <div className="starter-questions">
                <StarterQuestion question="What can I say when my child refuses to leave the playground?" />
                <StarterQuestion question="Can you suggest a simple meal using ingredients I already have?" />
              </div>
              <p className="thankyou-small">
                No names, birth dates or medical history needed. AI can make
                mistakes; use your judgement and seek qualified help for health
                or safety concerns.
              </p>
            </div>
          </section>
        </div>
        <aside
          className="thankyou-membership"
          aria-labelledby="membership-summary"
        >
          <h2 id="membership-summary">Your membership at a glance</h2>
          <ul className="check-list">
            <li>
              <Check size={18} />
              <span>{priceLabel()} for both ebooks and the AI companion</span>
            </li>
            <li>
              <Check size={18} />
              <span>{renewalLabel()} No joining fee.</span>
            </li>
            <li>
              <Check size={18} />
              <span>Keep both ebooks after cancellation</span>
            </li>
          </ul>
          <p>
            Your receipt and account show what you paid and when your next
            payment is due.
          </p>
          <p>
            Cancel future renewals through your account before your next billing
            date. Companion access continues through the period you’ve paid for.
            Refund requests are handled separately under the published refund
            policy.
          </p>
          <a className="text-link" href={manage || 'https://whop.com/'}>
            {manage ? 'Manage your membership' : 'Open your account'}
            <ArrowUpRight size={16} />
          </a>
        </aside>
        <aside className="thankyou-help" aria-labelledby="help-title">
          <h2 id="help-title">Need help getting in?</h2>
          <p>
            <strong>Missing your guides?</strong> Check that you’re signed in
            with the same account used at checkout.
          </p>
          <p>
            <strong>Can’t start your Messenger chat?</strong> Return to the
            instructions and help options in your purchase.
          </p>
          <p>
            <strong>Billing, cancellation or refund question?</strong> Use your
            purchase or receipt. Cancelling future payments and requesting a
            refund are separate actions.
          </p>
          <a
            className="text-link"
            href={support || library || 'https://whop.com/'}
          >
            {support ? 'Get help' : 'Get help with your purchase'}
            <ArrowUpRight size={16} />
          </a>
        </aside>
        <div className="thankyou-signoff">
          <p>
            Start with today’s question.
            <br />
            Come back for the next one.
          </p>
        </div>
      </main>
    </>
  )
}
