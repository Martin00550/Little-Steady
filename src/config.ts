/** Public information only. Whop handles checkout, billing and paid access. */
export interface OfferConfig {
  brand: string
  guides: {
    amount: number | null
    currency: string
    checkoutUrl: string | null
    termsConfirmed: boolean
  }
  chatbot: {
    amount: number | null
    currency: string
    interval: 'month'
    bundleCheckoutUrl: string | null
    termsConfirmed: boolean
    available: boolean
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
  readiness: { ageRange: string | null }
  analytics: { enabled: boolean; consentRequired: boolean }
}
export type Product = 'guides' | 'bundle'
export type PriceKind = 'guides' | 'chatbot'

export const offer: OfferConfig = {
  brand: 'Little Steady',
  guides: {
    amount: 47,
    currency: 'EUR',
    checkoutUrl: null,
    termsConfirmed: false,
  },
  // €47 is supplied by the owner; €12.99/month remains a working proposal.
  // The combined checkout charges for both guides and the first chatbot month.
  chatbot: {
    amount: 12.99,
    currency: 'EUR',
    interval: 'month',
    bundleCheckoutUrl: null,
    termsConfirmed: false,
    available: false,
  },
  // The previous first-payment refund proposal applies only to the chatbot.
  // No book refund promise is added without an approved policy.
  refund: {
    adopted: false,
    days: 14,
    firstPaymentOnly: true,
    noProofRequired: true,
    stopsRenewal: true,
  },
  links: { library: null, messenger: null, manage: null, refund: null },
  support: { email: null, url: null },
  seller: { legalName: null, address: null, creator: null },
  policies: { privacy: null, terms: null },
  readiness: { ageRange: null },
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
export function checkoutUrl(
  product: Product,
  config: OfferConfig = offer,
): string | null {
  return product === 'guides'
    ? config.guides.checkoutUrl
    : config.chatbot.bundleCheckoutUrl
}
export function canPurchase(
  product: Product = 'guides',
  config: OfferConfig = offer,
): boolean {
  const validAmount = (n: number | null) =>
    n !== null && Number.isFinite(n) && n > 0
  const guidesReady =
    validAmount(config.guides.amount) && config.guides.termsConfirmed
  if (product === 'guides')
    return guidesReady && isWhopUrl(config.guides.checkoutUrl)
  return (
    guidesReady &&
    validAmount(config.chatbot.amount) &&
    config.chatbot.termsConfirmed &&
    config.chatbot.available &&
    config.chatbot.currency === config.guides.currency &&
    isWhopUrl(config.chatbot.bundleCheckoutUrl)
  )
}
export function formatPrice(
  product: PriceKind,
  config: OfferConfig = offer,
): string | null {
  const item = config[product]
  return item.amount === null
    ? null
    : new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: item.currency,
      }).format(item.amount)
}
export function priceLabel(
  product: PriceKind,
  config: OfferConfig = offer,
): string | null {
  const price = formatPrice(product, config)
  return price
    ? `${price} ${config[product].currency}${product === 'chatbot' ? '/month' : ' once'}`
    : null
}
export function bundleFirstPayment(config: OfferConfig = offer): string | null {
  if (
    config.guides.amount === null ||
    config.chatbot.amount === null ||
    config.guides.currency !== config.chatbot.currency
  )
    return null
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: config.guides.currency,
  }).format(config.guides.amount + config.chatbot.amount)
}
export const renewalLabel = () => 'Renews monthly until cancelled.'
export const supportHref = () =>
  safeUrl(offer.support.url) ||
  (offer.support.email ? `mailto:${offer.support.email}` : null)
