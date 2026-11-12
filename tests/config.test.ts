import { expect, it } from 'vitest'
import { canPurchase, isWhopUrl, offer, priceLabel } from '../src/config'

it('uses one recurring price for the complete offer', () => {
  expect(priceLabel()).toBe('$29/month')
  expect(offer.price.currency).toBe('USD')
  expect(offer.price.interval).toBe('month')
})
it('only hands off when an actual Whop checkout is configured', () => {
  const configured = structuredClone(offer)
  configured.links.checkout = null
  expect(canPurchase(configured)).toBe(false)
  configured.links.checkout = 'https://whop.com/test-only'
  expect(canPurchase(configured)).toBe(true)
})
it('rejects unsafe destinations and invalid amounts', () => {
  for (const url of [
    'javascript:alert(1)',
    'https://whop.com.evil.example',
    'http://whop.com/',
    null,
  ])
    expect(isWhopUrl(url)).toBe(false)
  const configured = structuredClone(offer)
  configured.links.checkout = 'https://whop.com/test-only'
  for (const amount of [NaN, -1, Infinity]) {
    configured.price.amount = amount
    expect(canPurchase(configured)).toBe(false)
  }
})
