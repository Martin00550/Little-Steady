import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  MessageCircle,
  Sprout,
} from 'lucide-react'
import { offer, safeUrl, supportHref } from '../config'
import { Brand, Eyebrow } from './Shared'

/** A simple post-checkout destination. Whop handles payment and paid access. */
export function ThankYouPage() {
  const library = safeUrl(offer.links.library)
  const messenger = safeUrl(offer.links.messenger)
  const support = supportHref()

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
          <Eyebrow>Your next small step</Eyebrow>
          <h1 id="welcome-heading">
            Thank you for choosing
            <br />
            <em>a little more steady.</em>
          </h1>
          <p>
            Welcome to Little Steady. You don’t have to read everything or
            figure everything out today. Let’s start with one small thing.
          </p>
        </section>
        <div className="thankyou-steps">
          <section className="thankyou-step" aria-labelledby="guides-title">
            <span className="thankyou-number">01</span>
            <div>
              <BookOpen
                className="thankyou-step-icon"
                size={25}
                strokeWidth={1.5}
              />
              <h2 id="guides-title">Find your guides</h2>
              <p>
                Open your Whop account using the details you used at checkout.
                You’ll find your purchased ebooks there.
              </p>
              <div className="thankyou-titles">
                <span>Calmer Tantrums</span>
                <span>Calmer Mealtimes</span>
              </div>
              <a
                className="button button--primary"
                href={library || 'https://whop.com/'}
              >
                {library ? 'Open your guide library' : 'Open Whop'}
                <ArrowUpRight size={17} />
              </a>
              <p className="thankyou-small">
                Your receipt and purchase access are managed through Whop.
              </p>
            </div>
          </section>
          <section className="thankyou-step" aria-labelledby="messenger-title">
            <span className="thankyou-number">02</span>
            <div>
              <MessageCircle
                className="thankyou-step-icon"
                size={25}
                strokeWidth={1.5}
              />
              <h2 id="messenger-title">If you added the AI helper</h2>
              <p>
                If you chose the books + chatbot option, check your Whop
                purchase for the Messenger access instructions. If you bought
                just the books, no chatbot subscription is started.
              </p>
              <p>
                This is a one-to-one conversation with Little Steady’s AI
                parenting helper, not a group or a human coach.
              </p>
              {messenger && (
                <a className="text-link" href={messenger}>
                  Open Messenger
                  <ArrowUpRight size={16} />
                </a>
              )}
              <p className="thankyou-small">
                AI can make mistakes. It isn’t medical advice or emergency
                support. Avoid sharing your child’s identifying or sensitive
                information.
              </p>
            </div>
          </section>
          <section className="thankyou-step" aria-labelledby="start-title">
            <span className="thankyou-number">03</span>
            <div>
              <Sprout
                className="thankyou-step-icon"
                size={25}
                strokeWidth={1.5}
              />
              <h2 id="start-title">Choose just one moment</h2>
              <p>
                A difficult transition? Another refused dinner? Start with
                whichever topic feels most useful right now.
              </p>
              <blockquote>
                You don’t need to do it all.
                <br />
                <em>One small beginning is enough.</em>
              </blockquote>
            </div>
          </section>
        </div>
        <aside className="thankyou-help" aria-labelledby="help-title">
          <div>
            <h2 id="help-title">Need a little help getting in?</h2>
            <p>
              Can’t find your purchase? Check your Whop receipt and make sure
              you’re signed in with the same account you used at checkout. For
              access, billing or refund questions, use the help options in your
              Whop purchase.
            </p>
          </div>
          <a className="text-link" href={support || 'https://whop.com/'}>
            {support ? 'Contact support' : 'Go to Whop'}
            <ArrowUpRight size={16} />
          </a>
        </aside>
        <div className="thankyou-signoff">
          <p>
            Small steps.
            <br />
            <em>Steadier days.</em>
          </p>
        </div>
      </main>
    </>
  )
}
