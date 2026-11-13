import { useEffect } from 'react'
import { Footer, Header, policyContent } from './components/Shared'
import { offer, supportHref } from './config'
import { SalesPage } from './components/SalesPage'
import { ThankYouPage } from './components/ThankYouPage'
export function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const policy =
    path === '/privacy' || path === '/terms' || path === '/refund'
      ? policyContent[path.slice(1) as keyof typeof policyContent]
      : null
  useEffect(() => {
    document.title =
      path === '/'
        ? 'Little Steady — Help for everyday parenting questions'
        : path === '/tantrums'
          ? 'Calmer Tantrums — What to say when it’s time to go | Little Steady'
          : path === '/thank-you'
            ? 'Thank you — Little Steady'
            : policy
              ? `${policy.title} — Little Steady`
              : 'Page not found — Little Steady'
    if (path === '/tantrums') {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
          'content',
          'Find words to try when it’s time to leave the park. Read a free sample of Calmer Tantrums and see what Little Steady includes.',
        )
    }
  }, [path, policy])
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {path === '/' || path === '/tantrums' ? (
        <SalesPage tantrums={path === '/tantrums'} />
      ) : path === '/thank-you' ? (
        <ThankYouPage />
      ) : policy ? (
        <>
          <Header />
          <main id="main-content" className="container thankyou-main">
            <article className="thankyou-welcome">
              <h1>{policy.title}</h1>
              {policy.content}
              <p>
                {offer.seller.legalName}
                <br />
                {offer.seller.address}
                <br />
                <a href={supportHref() ?? undefined}>{offer.support.email}</a>
              </p>
            </article>
          </main>
        </>
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
