import { hasOfferPreviews, offerPreviews } from '../content/previews'
import { track } from '../lib/analytics'

export function OfferPreviews() {
  const { ebooks, conversation } = offerPreviews
  if (!hasOfferPreviews() || !conversation) return null

  return (
    <section
      className="sales-section sales-prose"
      id="previews"
      aria-labelledby="preview-heading"
    >
      <h2 id="preview-heading">See what you’re getting before you join.</h2>
      <div className="ebook-previews">
        {ebooks.map((preview) => (
          <figure key={preview.src}>
            <figcaption>{preview.title} — a look inside</figcaption>
            <a
              href={preview.src}
              aria-label={`Open full-size excerpt from ${preview.title}`}
              onClick={() =>
                track('preview_interaction', { target: 'ebook_excerpt' })
              }
            >
              <img
                src={preview.src}
                alt={preview.alt}
                width={preview.width}
                height={preview.height}
                loading="lazy"
                decoding="async"
              />
            </a>
          </figure>
        ))}
      </div>
      <div className="conversation-preview">
        <h3>Example Messenger conversation</h3>
        <p className="sales-disclosure">{conversation.label}</p>
        <ol className="conversation-messages">
          {conversation.messages.map((message, index) => (
            <li
              key={index}
              className={message.speaker === 'Parent' ? 'from-parent' : ''}
            >
              <strong>{message.speaker}</strong>
              <p>{message.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <p>
        Explore how the guides explain a situation and how the companion can
        help you ask the next question.
      </p>
    </section>
  )
}
