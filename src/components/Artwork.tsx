export function Book({ kind }: { kind: 'tantrums' | 'mealtimes' }) {
  const title = kind === 'tantrums' ? 'Calmer Tantrums' : 'Calmer Mealtimes'
  const path = `/covers/calmer-${kind}`
  return (
    <picture className="book">
      <source
        type="image/webp"
        srcSet={`${path}-320.webp 320w, ${path}-640.webp 640w`}
        sizes="(max-width: 600px) 43vw, 230px"
      />
      <img
        src={`${path}.png`}
        width={1024}
        height={1536}
        alt={`${title} — Little Steady ebook cover`}
        decoding="async"
      />
    </picture>
  )
}
