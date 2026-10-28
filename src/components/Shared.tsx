import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  X,
} from 'lucide-react'
import { canPurchase, offer, priceLabel, safeUrl, supportHref } from '../config'
import { track } from '../lib/analytics'
import { Sprig } from './Artwork'

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Little Steady home">
      <Sprig />
      <span>
        little steady<span className="brand-stop">.</span>
      </span>
    </a>
  )
}
export function Header() {
  return (
    <header className="header container">
      <Brand />
      <nav aria-label="Main navigation">
        <a href="#included">
          What’s included
          <ArrowUpRight size={15} />
        </a>
        <a className="header-cta" href="#membership">
          Meet your little steady
          <ArrowRight size={16} />
        </a>
      </nav>
    </header>
  )
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return (
    <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
      <span />
      {children}
    </p>
  )
}
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <Check size={17} strokeWidth={1.8} aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}
export function PrimaryCTA({
  children = 'Explore the membership',
  placement = 'hero',
  className = '',
}: {
  children?: ReactNode
  placement?: string
  className?: string
}) {
  return (
    <a
      className={`button button--primary ${className}`}
      href="#membership"
      onClick={() => track('primary_cta_click', { placement })}
    >
      {children}
      <ArrowRight size={19} />
    </a>
  )
}
export function CheckoutCTA() {
  const ready = canPurchase()
  return ready ? (
    <a
      className="button button--cream"
      href={safeUrl(offer.links.checkout)!}
      onClick={() => {
        track('primary_cta_click', { placement: 'offer' })
        track('checkout_handoff')
      }}
    >
      Get the guides + Messenger support
      <ArrowUpRight size={18} />
    </a>
  ) : (
    <button className="button button--cream button--unavailable" disabled>
      Membership opening soon
      <Sprig />
    </button>
  )
}
export function Accordion({
  question,
  children,
  onOpen,
}: {
  question: string
  children: ReactNode
  onOpen?: () => void
}) {
  return (
    <details
      className="accordion"
      onToggle={(event) => {
        if (event.currentTarget.open) onOpen?.()
      }}
    >
      <summary>
        {question}
        <Plus size={19} aria-hidden="true" />
      </summary>
      <div className="accordion-answer">{children}</div>
    </details>
  )
}

type Policy = 'privacy' | 'terms' | 'refund'
const policyContent: Record<Policy, { title: string; content: ReactNode }> = {
  privacy: {
    title: 'Privacy & the AI companion',
    content: (
      <>
        <p>
          The Messenger companion is not available in this preview. This site
          does not collect chat messages or child information, and analytics is
          disabled.
        </p>
        <p>
          A final privacy policy covering Little Steady, Meta and any AI
          providers must be available before sales and companion access open.
          Storage periods, administrator access and deletion procedures have not
          yet been confirmed.
        </p>
        <p>
          Please don’t share a child’s name, date of birth, medical records or
          other identifying details in a chat. No end-to-end encryption or
          zero-storage promise is made.
        </p>
      </>
    ),
  },
  terms: {
    title: 'The planned membership',
    content: (
      <>
        <p>
          Membership is not available to purchase yet. The proposed offer is{' '}
          {priceLabel()}, renewing monthly until cancelled, with no joining fee
          or separate upsell.
        </p>
        <p>
          The plan includes Calmer Tantrums and Calmer Mealtimes to keep, plus
          access to an AI companion in a one-to-one Messenger conversation
          during the paid membership period.
        </p>
        <p>
          Final seller details, product coverage, activation instructions and
          legal terms will be confirmed before checkout opens. No payment is
          taken on this site.
        </p>
        <p>
          Parenting education is not medical advice, therapy or emergency
          support. Behavioural results are not guaranteed.
        </p>
      </>
    ),
  },
  refund: {
    title: 'Cancellation & proposed refunds',
    content: (
      <>
        <p>
          The proposed policy is a voluntary {offer.refund.days}-day money-back
          guarantee on the first membership payment only. It has not yet been
          adopted as a live sales policy.
        </p>
        <p>
          Under this proposal, a first-payment refund would not require
          completing lessons or proving an approach failed. A successful refund
          would also stop future renewals. Later renewal payments are not
          covered by this introductory guarantee.
        </p>
        <p>
          Cancelling future renewal and requesting a refund are separate
          actions. The planned cancellation route is Whop’s membership
          management. The final refund contact and policy will be provided
          before purchases open. Statutory rights are unaffected.
        </p>
      </>
    ),
  },
}
export function PolicyDialog({
  policy,
  onClose,
}: {
  policy: Policy | null
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!policy) return
    const dialog = ref.current
    const previousFocus = document.activeElement as HTMLElement | null
    dialog?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      dialog?.close()
      previousFocus?.focus()
    }
  }, [policy])
  if (!policy) return null
  const content = policyContent[policy]
  return (
    <dialog
      ref={ref}
      className="policy-dialog"
      aria-labelledby="policy-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        className="icon-button dialog-close"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      <Eyebrow>Before we open</Eyebrow>
      <h2 id="policy-title">{content.title}</h2>
      <div>{content.content}</div>
      <button className="text-link" onClick={onClose}>
        Back to the page
        <ArrowRight size={16} />
      </button>
    </dialog>
  )
}
export function Footer() {
  const [policy, setPolicy] = useState<Policy | null>(null)
  const support = supportHref()
  function policyLink(key: Policy, label: string) {
    const url = safeUrl(
      key === 'refund' ? offer.links.refund : offer.policies[key],
    )
    return url ? (
      <a href={url}>{label}</a>
    ) : (
      <button onClick={() => setPolicy(key)}>{label}</button>
    )
  }
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand />
              <p>Small steps. Steadier days.</p>
            </div>
            <div className="footer-note">
              <Sprig />
              <p>
                A little support for the everyday.
                <br />A little space to find your way.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Little Steady</span>
            <nav aria-label="Footer navigation">
              {policyLink('privacy', 'Privacy & AI')}
              {policyLink('terms', 'Membership terms')}
              {policyLink('refund', 'Refunds')}
              {support && <a href={support}>Support</a>}
              {safeUrl(offer.links.manage) && (
                <a href={safeUrl(offer.links.manage)!}>Manage membership</a>
              )}
            </nav>
          </div>
          {offer.seller.legalName && (
            <p className="seller-details">
              {offer.seller.legalName} · {offer.seller.address}
            </p>
          )}
        </div>
      </footer>
      <PolicyDialog policy={policy} onClose={() => setPolicy(null)} />
    </>
  )
}
export function MobileCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('hero')
    const offerElement = document.getElementById('membership')
    const footer = document.querySelector('footer')
    if (!hero || !offerElement || !footer) return
    let heroPassed = false,
      offerVisible = false,
      footerVisible = false
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero)
          heroPassed =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0
        if (entry.target === offerElement) offerVisible = entry.isIntersecting
        if (entry.target === footer) footerVisible = entry.isIntersecting
      }
      setVisible(heroPassed && !offerVisible && !footerVisible)
    })
    observer.observe(hero)
    observer.observe(offerElement)
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])
  return visible ? (
    <aside className="mobile-cta" aria-label="Planned membership">
      <div>
        <strong>{priceLabel()}</strong>
        <span>Planned membership</span>
      </div>
      <PrimaryCTA placement="mobile">
        Explore
        <ArrowDown className="sr-only" />
      </PrimaryCTA>
    </aside>
  ) : null
}
