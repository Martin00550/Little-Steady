/** Public samples only. Never point these at a complete paid ebook. */
export type GuideKind = 'tantrums' | 'mealtimes'
export interface EbookPreview {
  src: string
  alt: string
  width: number
  height: number
  transcript: string
}

// Actual interior pages have not been supplied. Keep the honest unavailable state.
export const guidePreviews: Record<GuideKind, EbookPreview | null> = {
  tantrums: null,
  mealtimes: null,
}
