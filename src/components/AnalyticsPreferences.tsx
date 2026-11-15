import { useEffect, useState } from 'react'
import { setAnalyticsConsent } from '../lib/analytics'

type Choice = 'allow' | 'decline'
type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] }

const preferenceKey = 'little-steady:analytics-consent'

function savedChoice(): Choice | null {
  try {
    const value = localStorage.getItem(preferenceKey)
    return value === 'allow' || value === 'decline' ? value : null
  } catch {
    return null
  }
}

function clarityWindow() {
  return window as Window & { clarity?: Clarity }
}

function signalConsent(allowed: boolean) {
  clarityWindow().clarity?.('consentv2', {
    analytics_Storage: allowed ? 'granted' : 'denied',
    ad_Storage: 'denied',
  })
}

function loadClarity() {
  const host = clarityWindow()
  if (!host.clarity) {
    const queue: Clarity = (...args) => {
      ;(queue.q ??= []).push(args)
    }
    host.clarity = queue
  }
  signalConsent(true)
  if (document.getElementById('little-steady-clarity')) return
  const tag = document.createElement('script')
  tag.id = 'little-steady-clarity'
  tag.async = true
  tag.src = 'https://www.clarity.ms/tag/ze1lv4pwb6'
  document.head.append(tag)
}

export function AnalyticsPreferences({
  marketingPage,
}: {
  marketingPage: boolean
}) {
  const [choice, setChoice] = useState(savedChoice)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const allowed = marketingPage && choice === 'allow'
    setAnalyticsConsent(allowed)
    if (allowed) loadClarity()
  }, [choice, marketingPage])

  function choose(next: Choice) {
    let saved = false
    try {
      localStorage.setItem(preferenceKey, next)
      saved = true
    } catch {
      // The choice still applies to this page when storage is unavailable.
    }
    if (next === 'decline') {
      setAnalyticsConsent(false)
      signalConsent(false)
      if (saved && document.getElementById('little-steady-clarity')) {
        window.location.reload()
        return
      }
    }
    setChoice(next)
    setEditing(false)
  }

  const showOptions = editing || (marketingPage && choice === null)
  return (
    <aside className="analytics-preferences" aria-label="Analytics preferences">
      {showOptions ? (
        <>
          <p>
            Allow optional Microsoft Clarity analytics to help us improve our
            marketing pages. <a href="/privacy">Privacy notice</a>
          </p>
          <div className="analytics-actions">
            <button className="button" onClick={() => choose('decline')}>
              Decline
            </button>
            <button className="button" onClick={() => choose('allow')}>
              Allow analytics
            </button>
          </div>
        </>
      ) : (
        <button className="text-link" onClick={() => setEditing(true)}>
          Analytics settings
        </button>
      )}
    </aside>
  )
}
