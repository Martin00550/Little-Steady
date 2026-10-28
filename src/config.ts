/** Public information only. Never put payment, Meta or model secrets here. */
export interface OfferConfig {
  brand: string
  price: { amount: number; currency: string; interval: 'month' }
  terms: {
    confirmed: boolean
    ebooksToKeep: boolean
    monthlyRenewal: boolean
    joiningFee: number
  }
  refund: {
    adopted: boolean
    days: number
    firstPaymentOnly: boolean
    noProofRequired: boolean
    stopsRenewal: boolean
  }
  links: {
    library: string | null
    messenger: string | null
    checkout: string | null
    manage: string | null
    refund: string | null
  }
  support: { email: string | null; url: string | null }
  seller: {
    legalName: string | null
    address: string | null
    creator: string | null
  }
  policies: { privacy: string | null; terms: string | null }
  readiness: { ageRange: string | null; companionVerified: boolean }
  analytics: { enabled: boolean; consentRequired: boolean }
}

export const offer: OfferConfig = {
  brand: 'Little Steady',
  price: { amount: 12.99, currency: 'USD', interval: 'month' },
  terms: {
    confirmed: false,
    ebooksToKeep: true,
    monthlyRenewal: true,
    joiningFee: 0,
  },
  refund: {
    adopted: false,
    days: 14,
    firstPaymentOnly: true,
    noProofRequired: true,
    stopsRenewal: true,
  },
  links: {
    library: null,
    messenger: null,
    checkout: null,
    manage: null,
    refund: null,
  },
  support: { email: null, url: null },
  seller: { legalName: null, address: null, creator: null },
  policies: { privacy: null, terms: null },
  readiness: { ageRange: null, companionVerified: false },
  analytics: { enabled: false, consentRequired: true },
}

export function safeUrl(value: string | null): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

export function isWhopUrl(value: string | null): boolean {
  const safe = safeUrl(value)
  if (!safe) return false
  const host = new URL(safe).hostname
  return host === 'whop.com' || host.endsWith('.whop.com')
}

/** The site only hands off to Whop; it never processes or verifies payments. */
export function canPurchase(config: OfferConfig = offer): boolean {
  return (
    config.terms.confirmed &&
    config.readiness.companionVerified &&
    isWhopUrl(config.links.checkout)
  )
}

export const formatPrice = (config: OfferConfig = offer) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.price.currency,
  }).format(config.price.amount)
export const priceLabel = (config: OfferConfig = offer) =>
  `${formatPrice(config)} ${config.price.currency}/${config.price.interval}`
export const renewalLabel = (config: OfferConfig = offer) =>
  `Renews ${config.price.interval === 'month' ? 'monthly' : config.price.interval} until cancelled.`
export const guaranteeLabel = (config: OfferConfig = offer) =>
  `${config.refund.days}-day money-back guarantee on your first payment.`
export const supportHref = () =>
  safeUrl(offer.support.url) ||
  (offer.support.email ? `mailto:${offer.support.email}` : null)
