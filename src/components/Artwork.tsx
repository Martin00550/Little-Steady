export function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 64"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 57V24M22 37C8 38 6 23 9 18c12 1 16 10 13 19ZM23 29C23 15 31 9 41 9c1 12-7 21-18 20ZM22 49c4-12 12-15 19-12-1 11-9 15-19 12Z" />
        <path d="m10 20 12 16m17-24L24 27m15 12L24 47" opacity=".6" />
      </g>
    </svg>
  )
}

export function Book({
  kind,
  small = false,
}: {
  kind: 'tantrums' | 'mealtimes'
  small?: boolean
}) {
  const isTantrums = kind === 'tantrums'
  return (
    <div
      className={`book book--${kind}${small ? ' book--small' : ''}`}
      aria-label={`${isTantrums ? 'Calmer Tantrums' : 'Calmer Mealtimes'} — cover concept`}
    >
      <div className="book-spine" />
      <div className="book-content">
        <span className="book-brand">
          <Sprig /> little steady
        </span>
        <div className="book-title">
          Calmer
          <br />
          {isTantrums ? 'Tantrums' : 'Mealtimes'}
          <span className="book-title-dot">.</span>
        </div>
        <div className="book-rule" />
        {isTantrums ? (
          <svg
            className="book-art"
            viewBox="0 0 200 170"
            fill="none"
            aria-hidden="true"
          >
            <g
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M35 144c28-7 63-8 123-2M98 140c-2-27 2-53 6-79M101 113c-25-1-38-15-37-35 26 2 41 15 37 35ZM104 91c19-1 34-13 32-31-19 0-33 12-32 31ZM101 131c18 2 38-5 43-26-24-5-36 8-43 26ZM101 72c-18 1-28-12-25-28 17 2 26 13 25 28Z" />
              <path d="M49 140c0-16-4-22-10-27m10 17c12-4 16-12 14-20-9 2-13 8-14 20M154 141l7-27m-6 19c-9-5-11-13-7-19 8 5 10 11 7 19" />
              <path d="M115 34V24m-7 5h14M53 66v-7m-4 3h8M153 81v-7m-4 3h8" />
              <circle cx="144" cy="38" r="10" />
            </g>
          </svg>
        ) : (
          <svg
            className="book-art"
            viewBox="0 0 200 170"
            fill="none"
            aria-hidden="true"
          >
            <g
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="99" cy="91" rx="53" ry="48" />
              <ellipse cx="99" cy="91" rx="43" ry="38" />
              <path d="M30 52v35m-7-35v22c0 9 14 9 14 0V52M30 87v45M169 52c-11 7-15 23-10 32h10m0-32v80M88 76c-6-10-18-3-17 7 2 15 17 27 17 27s16-12 17-27c1-10-11-17-17-7Z" />
              <path d="m118 85 10-9m-4-6c-8 2-13 8-11 15 8 1 14-3 16-10m-12 28c8-7 17-4 18 3-2 10-13 17-23 17-4-9-2-15 5-20Z" />
              <path d="M65 30v-9m-5 5h10M141 141v-7m-4 3h8" />
            </g>
          </svg>
        )}
        <span className="book-footer">A LITTLE STEADY GUIDE</span>
      </div>
    </div>
  )
}
