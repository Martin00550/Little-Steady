import { offer } from '../config'
export type EventName =
  'primary_cta_click' | 'preview_interaction' | 'checkout_handoff'
let consentGranted = false
export function setAnalyticsConsent(allowed: boolean) {
  consentGranted = allowed
}
/** Emit local interaction events after analytics consent. */
export function track(
  event: EventName,
  detail: { placement?: string; target?: string } = {},
) {
  if (
    !offer.analytics.enabled ||
    (offer.analytics.consentRequired && !consentGranted)
  )
    return
  window.dispatchEvent(
    new CustomEvent('little-steady:analytics', {
      detail: { event, ...detail },
    }),
  )
}
