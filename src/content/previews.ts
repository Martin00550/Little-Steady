/** Add actual ebook excerpts and an approved companion conversation here.
 * Covers, invented ebook pages and untested replies are not product previews.
 * The complete preview section stays hidden until both guides and a reply exist.
 */
interface EbookPreview {
  title: 'Calmer Tantrums' | 'Calmer Mealtimes'
  src: string
  alt: string
  width: number
  height: number
}

interface ConversationPreview {
  label: string
  messages: {
    speaker: 'Parent' | 'Little Steady AI'
    text: string
  }[]
}

export const offerPreviews: {
  ebooks: EbookPreview[]
  conversation: ConversationPreview | null
} = {
  ebooks: [],
  conversation: null,
}

export function hasOfferPreviews(): boolean {
  return (
    ['Calmer Tantrums', 'Calmer Mealtimes'].every((title) =>
      offerPreviews.ebooks.some((preview) => preview.title === title),
    ) &&
    !!offerPreviews.conversation?.messages.some(
      (message) =>
        message.speaker === 'Little Steady AI' && message.text.trim(),
    )
  )
}
