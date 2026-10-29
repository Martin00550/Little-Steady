import { useEffect } from 'react'
import { Footer, Header } from './components/Shared'
import { SalesPage } from './components/SalesPage'
import { ThankYouPage } from './components/ThankYouPage'

export function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  useEffect(() => {
    document.title =
      path === '/'
        ? 'Little Steady — Help for everyday parenting questions'
        : path === '/thank-you'
          ? 'Thank you — Little Steady'
          : 'Page not found — Little Steady'
  }, [path])
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {path === '/' ? (
        <SalesPage />
      ) : path === '/thank-you' ? (
        <ThankYouPage />
      ) : (
        <>
          <Header />
          <main className="not-found container" id="main-content">
            <p className="eyebrow">A little detour</p>
            <h1>
              Let’s find your
              <br />
              <em>way back.</em>
            </h1>
            <p>We couldn’t find that page.</p>
            <a className="button button--primary" href="/">
              Back to Little Steady
            </a>
          </main>
        </>
      )}
      <Footer />
    </>
  )
}
