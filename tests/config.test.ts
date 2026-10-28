import { expect, it } from 'vitest'
import { canPurchase, isWhopUrl, offer } from '../src/config'
it('leaves checkout closed until its link and offer are confirmed', () => {
  expect(canPurchase()).toBe(false)
  const configured = structuredClone(offer)
  configured.links.checkout = 'https://whop.com/test-only'
  configured.terms.confirmed = true
  configured.readiness.companionVerified = true
  expect(canPurchase(configured)).toBe(true)
})
it('rejects unsafe or misleading checkout destinations', () => {
  for (const url of [
    'javascript:alert(1)',
    'https://whop.com.evil.example',
    'http://whop.com/',
    null,
  ])
    expect(isWhopUrl(url)).toBe(false)
})
