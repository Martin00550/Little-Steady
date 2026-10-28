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
import {
  canPurchase,
  checkoutUrl,
  offer,
  priceLabel,
  safeUrl,
  supportHref,
} from '../config'
import type { Product } from '../config'
import { track } from '../lib/analytics'

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Little Steady home">
      <span>Little Steady</span>
    </a>
  )
}
export function Header() {
  return (
    <header className="header container">
      <Brand />
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
  children = 'See the guide bundle',
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
      href="#offers"
      onClick={() => track('primary_cta_click', { placement })}
    >
      {children}
      <ArrowRight size={19} />
    </a>
  )
}
export function CheckoutCTA({ product }: { product: Product }) {
  const ready = canPurchase(product)
  return ready ? (
    <a
      className="button button--cream"
      href={safeUrl(checkoutUrl(product))!}
      onClick={() => {
        track('primary_cta_click', { placement: product })
        track('checkout_handoff', { target: product })
      }}
    >
      {product === 'guides'
        ? 'Get both ebooks — one-time purchase'
        : 'Get the guides + parenting helper'}
      <ArrowUpRight size={18} />
    </a>
  ) : (
    <button className="button button--cream button--unavailable" disabled>
      {product === 'guides'
        ? 'Guide bundle coming soon'
        : 'Guides + helper coming soon'}
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
    title: 'Books and optional chatbot access',
    content: (
      <>
        <p>
          The two-ebook bundle is a one-time purchase: {priceLabel('guides')}.
          It does not start a subscription.
        </p>
        <p>
          An optional combined offer adds the AI parenting helper in Messenger
          at a suggested {priceLabel('chatbot')}. The initial payment includes
          the books and the first chatbot month. Only chatbot access renews
          monthly until cancelled. Cancelling it does not remove books included
          in your purchase.
        </p>
        <p>
          Checkout is not open yet. Final terms, seller details and access
          instructions will be available before sales open. No payment is taken
          on this site.
        </p>
        <p>
          General parenting education is not medical advice or therapy. AI can
          be wrong; no behavioural results are guaranteed.
        </p>
      </>
    ),
  },
  refund: {
    title: 'Refunds and subscription cancellation',
    content: (
      <>
        <p>
          Book refund terms have not been finalised. Any final policy will be
          available before checkout opens. Statutory rights are unaffected.
        </p>
        <p>
          A voluntary {offer.refund.days}-day first-payment guarantee for the
          chatbot is proposed. It is not an adopted sales policy and does not
          cover the ebook portion of a combined payment.
        </p>
        <p>
          Under that proposal, there would be no lessons to finish or proof that
          an approach failed. A successful chatbot refund would also stop future
          renewals. Later chatbot payments would not be covered by the
          introductory guarantee.
        </p>
        <p>
          Cancelling future renewal and asking for a refund are separate
          actions, handled through Whop. Cancelling chatbot renewal does not
          remove the books.
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
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Little Steady</span>
            <nav aria-label="Footer navigation">
              {policyLink('privacy', 'Privacy & AI')}
              {policyLink('terms', 'Purchase terms')}
              {policyLink('refund', 'Refunds')}
              {support && <a href={support}>Support</a>}
              {safeUrl(offer.links.manage) && (
                <a href={safeUrl(offer.links.manage)!}>
                  Manage chatbot subscription
                </a>
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
    const offerElement = document.getElementById('offers')
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
    <aside className="mobile-cta" aria-label="Guide bundle">
      <div>
        <strong>{priceLabel('guides')}</strong>
        <span>One-time purchase</span>
      </div>
      <PrimaryCTA placement="mobile">
        View bundle
        <ArrowDown className="sr-only" />
      </PrimaryCTA>
    </aside>
  ) : null
}
