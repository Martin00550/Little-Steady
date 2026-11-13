import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Copy } from 'lucide-react'
import {
  guidePdfs,
  offer,
  priceLabel,
  renewalLabel,
  safeUrl,
  supportHref,
} from '../config'
import { Brand, Eyebrow } from './Shared'
function OptionalLink({
  href,
  className,
  children,
}: {
  href?: string
  className?: string
  children: ReactNode
}) {
  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : null
}

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
/** Static post-purchase redirect. No payment verification or purchase events. */
export function ThankYouPage() {
  const library = safeUrl(offer.links.library),
    messenger = safeUrl(offer.links.messenger)
  const manage = safeUrl(offer.links.manage),
    support = supportHref()
  return (
    <>
      <header className="header container thankyou-header">
        <Brand />
        <OptionalLink href="/" className="text-link">
          <ArrowLeft size={15} /> Back to Little Steady
        </OptionalLink>
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
        <div className="thankyou-layout">
          <div className="thankyou-steps">
            <section className="thankyou-step" aria-labelledby="guides-title">
              <span className="thankyou-number">01</span>
              <div>
                <h2 id="guides-title">Open your three guides</h2>
                <p>Open any guide in a new tab or download a copy to keep.</p>
                <p>
                  Download EPUB to read in Apple Books on iPhone or Google Play
                  Books on Android.
                </p>
                <div className="thankyou-titles">
                  {guidePdfs.map(({ title, href }) => {
                    const openUrl = href
                    const downloadUrl = href
                    return (
                      <div key={title}>
                        <strong>{title}</strong>
                        {(openUrl || downloadUrl) && (
                          <div className="thankyou-pdf-actions">
                            {openUrl && (
                              <a
                                className="text-link"
                                href={openUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${title} PDF in a new tab`}
                              >
                                Open PDF ↗
                              </a>
                            )}
                            {downloadUrl && (
                              <a
                                className="text-link"
                                href={downloadUrl}
                                download
                                aria-label={`Download ${title} PDF`}
                              >
                                Download PDF
                              </a>
                            )}
                            <a
                              className="text-link"
                              href={href.replace(/\.pdf$/, '.epub')}
                              download
                              aria-label={`Download EPUB for ebook apps — ${title}`}
                            >
                              Download EPUB for ebook apps
                            </a>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p>
                  Start with the Playbook’s “Your first day” page for an
                  everyday plan. If mealtimes are on your mind, try Calmer
                  Mealtimes. If big feelings are the part you want to focus on,
                  start with Calmer Tantrums. All three guides are yours to keep
                  after cancellation.
                </p>
                <OptionalLink
                  className="button button--primary"
                  href={library || undefined}
                >
                  {library ? 'Open your guides' : 'Find your guides'}
                  <ArrowUpRight size={17} />
                </OptionalLink>
              </div>
            </section>
            <section
              className="thankyou-step"
              aria-labelledby="messenger-title"
            >
              <span className="thankyou-number">02</span>
              <div>
                <h2 id="messenger-title">Get started in Messenger</h2>
                <p>
                  Check your purchase confirmation and follow the steps for
                  starting your Messenger chat.
                </p>
                <p>
                  You’ll be messaging Mila, Little Steady’s AI parenting
                  companion in a one-to-one conversation—not joining a group or
                  talking with a human coach.
                </p>
                {messenger ? (
                  <details>
                    <summary className="button button--primary">
                      Open Mila in Messenger
                    </summary>
                    <p>
                      Mila is an AI parenting companion for adults. Please leave
                      out children’s names, dates of birth, medical details, and
                      other identifying information. Read our{' '}
                      <a href="/privacy">privacy notice</a>.
                    </p>
                    <OptionalLink
                      className="button button--primary"
                      href={messenger}
                    >
                      Continue to Messenger <ArrowUpRight size={17} />
                    </OptionalLink>
                  </details>
                ) : (
                  <OptionalLink
                    className="button button--primary"
                    href={library || undefined}
                  >
                    Find your chat instructions <ArrowUpRight size={17} />
                  </OptionalLink>
                )}
                <p className="thankyou-small">
                  If your chat is not ready, check the instructions in your
                  purchase or use the help details in your receipt.
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
                  mistakes; use your judgment and seek qualified help for health
                  or safety concerns.
                </p>
              </div>
            </section>
          </div>
          <div className="thankyou-sidebar">
            <aside
              className="thankyou-membership"
              aria-labelledby="membership-summary"
            >
              <h2 id="membership-summary">Your membership at a glance</h2>
              <ul className="check-list">
                <li>
                  <Check size={18} />
                  <span>
                    {priceLabel()} for all three guides and the AI companion
                  </span>
                </li>
                <li>
                  <Check size={18} />
                  <span>{renewalLabel()} No joining fee.</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Keep all three guides after cancellation</span>
                </li>
              </ul>
              <p>
                Your receipt and account show what you paid and when your next
                payment is due.
              </p>
              <p>
                Cancel future renewals through your account before your next
                billing date. Companion access continues through the period
                you’ve paid for. Refund requests are handled separately under
                the published refund policy.
              </p>
              <OptionalLink className="text-link" href={manage || undefined}>
                {manage ? 'Manage your membership' : 'Open your account'}
                <ArrowUpRight size={16} />
              </OptionalLink>
            </aside>
            <aside className="thankyou-help" aria-labelledby="help-title">
              <h2 id="help-title">Need help?</h2>
              <p>
                If you’re having trouble opening or downloading a guide, contact
                support and tell us which guide you’re trying to open.
              </p>
              <p>
                <strong>Can’t start your Messenger chat?</strong> Return to the
                instructions and help options in your purchase.
              </p>
              <p>
                <strong>Billing, cancellation or refund question?</strong> Use
                your purchase or receipt. Canceling future payments and
                requesting a refund are separate actions.
              </p>
              <OptionalLink
                className="text-link"
                href={support || library || undefined}
              >
                {support ? 'Email support' : 'Get help with your purchase'}
                <ArrowUpRight size={16} />
              </OptionalLink>
            </aside>
          </div>
        </div>
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
