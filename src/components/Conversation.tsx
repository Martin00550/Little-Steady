import { MessageCircle } from 'lucide-react'
import type { ChatMessage } from '../content/conversations'

export function Conversation({
  messages,
  id,
  compact = false,
}: {
  messages: ChatMessage[]
  id: string
  compact?: boolean
}) {
  return (
    <figure
      className={`chat-panel${compact ? ' chat-panel--compact' : ''}`}
      aria-labelledby={`${id}-caption`}
    >
      <div className="chat-header">
        <span className="chat-mark" aria-hidden="true">
          <MessageCircle size={22} />
        </span>
        <div>
          <strong>Little Steady</strong>
          <span>AI parenting companion · Messenger</span>
        </div>
      </div>
      <figcaption id={`${id}-caption`} className="chat-caption">
        Illustrative conversation <span>· Static preview</span>
      </figcaption>
      <ol className="chat-messages">
        {messages.map((message, index) => (
          <li
            key={index}
            className={
              message.speaker === 'Parent'
                ? 'chat-message chat-message--parent'
                : 'chat-message chat-message--ai'
            }
          >
            <span className="chat-speaker">
              {message.speaker === 'Parent' ? 'Parent' : 'Little Steady · AI'}
            </span>
            <p>{message.text}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}
