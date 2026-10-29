import { useEffect, useRef, useState } from 'react'
import { Maximize2, Minus, Plus, X } from 'lucide-react'
import { guidePreviews } from '../content/previews'
import type { GuideKind } from '../content/previews'
import { track } from '../lib/analytics'

export function GuidePreview({
  kind,
  title,
}: {
  kind: GuideKind
  title: string
}) {
  const preview = guidePreviews[kind]
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open || !preview) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [open, preview])

  return (
    <>
      <button
        ref={triggerRef}
        className="text-link preview-action"
        disabled={!preview}
        aria-describedby={!preview ? `${kind}-preview-status` : undefined}
        onClick={() => {
          setZoom(1)
          setOpen(true)
          track('preview_interaction', { target: `${kind}_excerpt` })
        }}
      >
        Preview a page <Maximize2 size={16} aria-hidden="true" />
      </button>
      {!preview && (
        <p className="preview-status" id={`${kind}-preview-status`}>
          Interior preview not available yet.
        </p>
      )}
      {open && preview && (
        <dialog
          ref={dialogRef}
          className="preview-dialog"
          aria-labelledby={`${kind}-preview-title`}
          onCancel={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="preview-shell">
            <div className="preview-toolbar">
              <h2 id={`${kind}-preview-title`}>
                {title} <span>Page preview</span>
              </h2>
              <div className="preview-controls">
                <button
                  className="icon-button"
                  aria-label="Zoom out"
                  disabled={zoom <= 1}
                  onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
                >
                  <Minus size={18} />
                </button>
                <span className="zoom-label" role="status">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  className="icon-button"
                  aria-label="Zoom in"
                  disabled={zoom >= 2.5}
                  onClick={() =>
                    setZoom((value) => Math.min(2.5, value + 0.25))
                  }
                >
                  <Plus size={18} />
                </button>
                <button
                  className="icon-button"
                  aria-label="Close preview"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
            </div>
            <div
              className="preview-viewport"
              tabIndex={0}
              aria-label={`${title} excerpt, scroll to read`}
            >
              <div
                className="preview-sheet"
                style={{ width: `${zoom * 100}%` }}
              >
                <img
                  src={preview.src}
                  alt={preview.alt}
                  width={preview.width}
                  height={preview.height}
                />
              </div>
              <details className="preview-transcript">
                <summary>Read preview as text</summary>
                <p>{preview.transcript}</p>
              </details>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
