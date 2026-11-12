/** Public presentation settings. Whop handles checkout, billing and paid access. */
export interface OfferConfig {
  brand: string
  logo: string | null
  price: { amount: number; currency: string; interval: 'month' }
  links: {
    checkout: string | null
    library: string | null
    messenger: string | null
    manage: string | null
    refund: string | null
    privacy: string | null
    terms: string | null
  }
  support: { email: string | null; url: string | null }
  seller: { legalName: string | null; address: string | null }
  analytics: { enabled: boolean; consentRequired: boolean }
}
export const siteUrl = 'https://littlesteady.online'
export const offer: OfferConfig = {
  brand: 'Little Steady',
  // The owner's original artwork, presented without redrawing the logo.
  logo: '/brand/little-steady-logo.webp',
  price: { amount: 29, currency: 'USD', interval: 'month' },
  links: {
    checkout: 'https://whop.com/checkout/plan_ZcLVp2Qt04d0s',
    library: null,
    messenger: 'https://m.me/61596180792119',
    manage: null,
    refund: null,
    privacy: null,
    terms: null,
  },
  support: { email: 'support@littlesteady.online', url: null },
  seller: { legalName: 'Martin Vasko (IČO 56440553)', address: null },
  analytics: { enabled: false, consentRequired: true },
}
export const guidePdfs = [
  {
    title: 'The Calmer Parenting Playbook',
    href: '/guides/Little-Steady-Calmer-Parenting-Playbook.pdf',
  },
  { title: 'Calmer Tantrums', href: '/guides/calmer-tantrums-ebook.pdf' },
  { title: 'Calmer Mealtimes', href: '/guides/calmer-mealtimes-ebook.pdf' },
]

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
export function canPurchase(config: OfferConfig = offer): boolean {
  return (
    Number.isFinite(config.price.amount) &&
    config.price.amount > 0 &&
    isWhopUrl(config.links.checkout)
  )
}
export function formatPrice(config: OfferConfig = offer): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.price.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(config.price.amount)
}
export const priceLabel = (config: OfferConfig = offer) =>
  `${formatPrice(config)}/month`
export const renewalLabel = () => 'Renews monthly until canceled.'
export const supportHref = () =>
  safeUrl(offer.support.url) ||
  (offer.support.email ? `mailto:${offer.support.email}` : null)
