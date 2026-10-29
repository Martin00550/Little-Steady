import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Check, Plus, X } from 'lucide-react'
import { canPurchase, offer, priceLabel, safeUrl, supportHref } from '../config'
import { track } from '../lib/analytics'

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Little Steady home">
      {offer.logo ? (
        <img
          src={offer.logo}
          alt="Little Steady"
          width={1000}
          height={705}
          decoding="async"
        />
      ) : (
        <span>Little Steady</span>
      )}
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
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <Check size={18} strokeWidth={2} aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}
export function PrimaryCTA({
  children,
  placement = 'hero',
}: {
  children?: ReactNode
  placement?: string
}) {
  return (
    <a
      className="button button--primary"
      href="#membership"
      onClick={() => track('primary_cta_click', { placement })}
    >
      {children || `Join Little Steady — ${priceLabel()}`}
      <ArrowRight size={19} />
    </a>
  )
}
export function CheckoutCTA() {
  return canPurchase() ? (
    <a
      className="button button--primary"
      href={safeUrl(offer.links.checkout)!}
      onClick={() => {
        track('primary_cta_click', { placement: 'checkout' })
        track('checkout_handoff')
      }}
    >
      Join Little Steady — {priceLabel()}
      <ArrowUpRight size={19} />
    </a>
  ) : (
    <>
      <button className="button button--unavailable" disabled>
        Checkout opens soon
      </button>
      <p className="checkout-status">Membership checkout is not open yet.</p>
    </>
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
    title: 'AI and your privacy',
    content: (
      <>
        <p>
          The companion is an AI chatbot in Messenger. Meta provides Messenger,
          and AI services are involved in processing questions and generating
          replies. It is not a private clinical consultation.
        </p>
        <p>
          Describe situations without children’s names, dates of birth, medical
          records or other identifying details. No promise of end-to-end
          encryption or zero storage is made here.
        </p>
        <p>
          Review the applicable data-processing and privacy terms supplied with
          the service before using the companion. Storage, administrator access
          and deletion rights depend on those terms.
        </p>
        <p>
          This website does not collect chat messages or children’s details.
          Optional analytics is disabled.
        </p>
      </>
    ),
  },
  terms: {
    title: 'Your Little Steady membership',
    content: (
      <>
        <p>
          {priceLabel()} in {offer.price.currency}, renewing monthly until
          cancelled. No joining fee or separate book payment. The membership
          includes Calmer Tantrums, Calmer Mealtimes and access to the AI
          parenting companion in Messenger.
        </p>
        <p>
          The ebooks are included with your first purchase and remain yours
          after cancellation. You can use the AI companion until the end of the
          time you’ve paid for. Cancelling your subscription does not
          automatically request a refund.
        </p>
        <p>
          Your receipt and account show your payments, your next payment date
          and the steps for finding your books and chat.
        </p>
        <p>
          The service provides general parenting education. AI can make
          mistakes. No behavioural or health outcome is guaranteed, and the
          companion is not a healthcare professional or emergency service.
        </p>
      </>
    ),
  },
  refund: {
    title: 'Refunds and cancellation',
    content: (
      <>
        <p>
          To stop future payments, cancel from your account. You can use the
          chat until the end of the time you’ve paid for, and you keep both
          ebooks after cancellation.
        </p>
        <p>
          Cancelling stops future payments. To ask for a refund or help with a
          payment, use the help link in your purchase or the seller contact
          shown on your receipt.
        </p>
        <p>
          Refund requests are handled separately under the published refund
          policy. Eligibility is governed by the policy provided at checkout and
          your rights under consumer law. Check the refund policy at checkout
          for details.
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
      <h2 id="policy-title">{content.title}</h2>
      <div>{content.content}</div>
      <button className="text-link" onClick={onClose}>
        Back to the page
        <ArrowRight size={16} />
      </button>
    </dialog>
  )
}
export function PolicyLink({
  policy,
  children,
}: {
  policy: Policy
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const url = safeUrl(offer.links[policy])
  return url ? (
    <a className="text-link" href={url}>
      {children}
    </a>
  ) : (
    <>
      <button className="text-link" onClick={() => setOpen(true)}>
        {children}
      </button>
      <PolicyDialog
        policy={open ? policy : null}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export function Footer() {
  const support = supportHref()
  const manage = safeUrl(offer.links.manage)
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Brand />
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Little Steady</span>
            <nav aria-label="Footer navigation">
              <PolicyLink policy="privacy">AI & privacy</PolicyLink>
              <PolicyLink policy="terms">Membership terms</PolicyLink>
              <PolicyLink policy="refund">Refunds & cancellation</PolicyLink>
              {support && <a href={support}>Support</a>}
              {manage && <a href={manage}>Manage membership</a>}
            </nav>
          </div>
          {offer.seller.legalName && (
            <p className="seller-details">
              {offer.seller.legalName}
              {offer.seller.address && ` · ${offer.seller.address}`}
            </p>
          )}
        </div>
      </footer>
    </>
  )
}
export function MobileCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('hero'),
      membership = document.getElementById('membership'),
      footer = document.querySelector('footer')
    if (!hero || !membership || !footer) return
    let heroPassed = false,
      offerVisible = false,
      footerVisible = false
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero)
          heroPassed =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0
        if (entry.target === membership) offerVisible = entry.isIntersecting
        if (entry.target === footer) footerVisible = entry.isIntersecting
      }
      setVisible(heroPassed && !offerVisible && !footerVisible)
    })
    observer.observe(hero)
    observer.observe(membership)
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])
  return visible ? (
    <aside className="mobile-cta" aria-label="Little Steady membership">
      <div>
        <strong>Little Steady</strong>
        <span>Books + AI companion</span>
      </div>
      <PrimaryCTA placement="mobile">View offer</PrimaryCTA>
    </aside>
  ) : null
}
