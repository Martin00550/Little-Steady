import { expect, it } from 'vitest'
import {
  bundleFirstPayment,
  canPurchase,
  isWhopUrl,
  offer,
  priceLabel,
} from '../src/config'

it('keeps both unconfigured checkouts closed', () => {
  expect(canPurchase('guides')).toBe(false)
  expect(canPurchase('bundle')).toBe(false)
})
it('does not require a chatbot subscription to purchase the books', () => {
  const config = structuredClone(offer)
  config.guides.checkoutUrl = 'https://whop.com/test-books'
  config.guides.termsConfirmed = true
  expect(canPurchase('guides', config)).toBe(true)
  expect(canPurchase('bundle', config)).toBe(false)
})
it('requires a confirmed, available chatbot and a distinct combined checkout', () => {
  const config = structuredClone(offer)
  config.guides.termsConfirmed = true
  config.chatbot.bundleCheckoutUrl = 'https://whop.com/test-combined'
  config.chatbot.termsConfirmed = true
  expect(canPurchase('bundle', config)).toBe(false)
  config.chatbot.available = true
  expect(canPurchase('bundle', config)).toBe(true)
  config.chatbot.currency = 'USD'
  expect(canPurchase('bundle', config)).toBe(false)
})
it('separates the one-time payment, combined initial charge and renewal', () => {
  expect(priceLabel('guides')).toBe('€47.00 EUR once')
  expect(priceLabel('chatbot')).toBe('€12.99 EUR/month')
  expect(bundleFirstPayment()).toBe('€59.99')
})
it('rejects unsafe checkout destinations and invalid amounts', () => {
  for (const url of [
    'javascript:alert(1)',
    'https://whop.com.evil.example',
    'http://whop.com/',
    null,
  ])
    expect(isWhopUrl(url)).toBe(false)
  const config = structuredClone(offer)
  config.guides.termsConfirmed = true
  config.guides.checkoutUrl = 'https://whop.com/test-books'
  for (const amount of [NaN, -1, Infinity, null]) {
    config.guides.amount = amount
    expect(canPurchase('guides', config)).toBe(false)
  }
})
