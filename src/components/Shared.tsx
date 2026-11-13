import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Check, Menu, Plus, X } from 'lucide-react'
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
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<'menu' | Policy | 'support'>('menu')
  const ref = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!open) return
    ref.current?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      ref.current?.close()
      document.body.style.overflow = previous
      trigger.current?.focus()
    }
  }, [open])
  useEffect(() => {
    if (open) heading.current?.focus()
  }, [view, open])
  const support = supportHref()
  return (
    <header className="header container">
      <Brand />
      <button
        ref={trigger}
        className="icon-button navigation-trigger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => {
          setView('menu')
          setOpen(true)
        }}
      >
        <Menu size={24} aria-hidden="true" />
      </button>
      {open && (
        <dialog
          ref={ref}
          id="site-menu"
          className="navigation-dialog"
          aria-labelledby="menu-heading"
          onCancel={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <button
            className="icon-button dialog-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <p className="eyebrow">Little Steady</p>
          <h2 id="menu-heading" ref={heading} tabIndex={-1}>
            {view === 'menu'
              ? 'Information & support'
              : view === 'support'
                ? 'Contact & support'
                : policyContent[view].title}
          </h2>
          {view === 'menu' ? (
            <nav className="menu-items" aria-label="Information and support">
              {(
                [
                  ['privacy', 'Privacy information'],
                  ['terms', 'Membership terms'],
                  ['refund', 'Refunds & cancellation'],
                ] as const
              ).map(([key, label]) =>
                safeUrl(offer.links[key]) ? (
                  <a key={key} href={safeUrl(offer.links[key])!}>
                    {label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <button key={key} onClick={() => setView(key)}>
                    {label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ),
              )}
              <button onClick={() => setView('support')}>
                Contact & support
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              {safeUrl(offer.links.manage) && (
                <a href={safeUrl(offer.links.manage)!}>
                  Manage membership
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </nav>
          ) : (
            <div className="menu-content">
              {view === 'support' ? (
                <>
                  <p>
                    For help with your guides, Messenger access, billing, or
                    cancellation, use the support details in your purchase
                    confirmation or receipt.
                  </p>
                  {support ? (
                    <a className="button button--primary" href={support}>
                      Contact support
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  ) : (
                    <p>
                      Membership checkout is not open yet. A direct support
                      contact will be available here before it opens.
                    </p>
                  )}
                </>
              ) : (
                policyContent[view].content
              )}
              <button
                className="text-link menu-back"
                onClick={() => setView('menu')}
              >
                Back to menu
              </button>
            </div>
          )}
        </dialog>
      )}
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
  href = '#membership',
}: {
  children?: ReactNode
  placement?: string
  href?: string
}) {
  return (
    <a
      className="button button--primary"
      href={href}
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
export const policyContent: Record<
  Policy,
  { title: string; content: ReactNode }
> = {
  privacy: {
    title: 'Privacy and Mila',
    content: (
      <>
        <p>
          Martin Vasko operates Little Steady and is responsible for the
          personal information Little Steady uses to provide the service. Whop
          handles checkout and billing. When you use Mila, Meta provides
          Messenger. SendPulse runs the chatbot and sends relevant messages and
          conversation history to OpenAI to generate replies. Mila can consult
          the Little Steady guides and use web search to answer questions.
        </p>
        <p>
          Describe situations without children’s names, dates of birth, medical
          records or other identifying details. No promise of end-to-end
          encryption or zero storage is made here.
        </p>
        <p>
          We use order information, support correspondence, and messages you
          send to Mila to provide and support your membership. We process this
          information to perform our contract with you and keep records where
          required by law. You can contact support to request access,
          correction, deletion, restriction, or portability, or to object where
          applicable. You can also complain to your data protection authority.
        </p>
        <p>
          SendPulse stores Mila chat history separately. Deleting a conversation
          in Messenger may leave that history in SendPulse. If you cancel your
          membership, we delete your Mila conversation from SendPulse when your
          current paid period ends. To request earlier deletion, email{' '}
          <a href="mailto:support@littlesteady.online">
            support@littlesteady.online
          </a>
          .
        </p>
        <p>
          Our providers may process data outside the European Economic Area.
          SendPulse and OpenAI publish data processing terms that include the
          European Commission’s Standard Contractual Clauses for transfers
          covered by those terms. Contact support for information about the
          safeguards that apply to your data and how to obtain a copy.
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
          canceled. No joining fee or separate book payment. The membership
          includes The Calmer Parenting Playbook, Calmer Tantrums, Calmer
          Mealtimes and access to the AI parenting companion in Messenger.
        </p>
        <p>
          The ebooks are included with your first purchase and remain yours
          after cancellation. You can use the AI companion until the end of the
          time you’ve paid for. Canceling your subscription does not
          automatically request a refund.
        </p>
        <p>
          Your receipt and account show your payments, your next payment date
          and the steps for finding your books and chat.
        </p>
        <p>
          The service provides general parenting education. AI can make
          mistakes. No behavioral or health outcome is guaranteed, and the
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
          To stop future renewals, cancel in your Whop account before your next
          billing date. You can use the chat until the end of the time you’ve
          paid for, and you keep all three guides after cancellation.
        </p>
        <p>
          For a refund request about your Little Steady membership, email{' '}
          <a href="mailto:support@littlesteady.online">
            support@littlesteady.online
          </a>{' '}
          with your order reference.
        </p>
        <p>
          For an unrecognized charge, duplicate charge, or payment processing
          error, contact <a href="mailto:support@whop.com">Whop support</a>.
          Whop processes approved refunds to the original payment method.
        </p>
        <p>
          Refund requests are handled separately from cancellation. If you have
          a statutory right to withdraw or a remedy for digital content or
          services that were unavailable or defective, contact support to
          exercise that right. Mandatory consumer rights apply.
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
              <a href="/privacy">AI & privacy</a>
              <a href="/terms">Membership terms</a>
              <a href="/refund">Refunds & cancellation</a>
              {support && <a href={support}>Support</a>}
              {manage && <a href={manage}>Manage membership</a>}
            </nav>
          </div>
          <p className="footer-ai-disclosure">
            Mila is AI, not a human coach. It can make mistakes and offers
            general parenting education—not diagnosis, therapy, or emergency
            support.
          </p>
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
