import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <section role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} className={`relative w-full max-w-lg rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl ${className}`}>
        <div className="flex items-start justify-between gap-4">
          {title && <h2 id="modal-title" className="text-lg font-bold text-gray-800">{title}</h2>}
          <button type="button" aria-label="Close dialog" onClick={onClose} className="ml-auto rounded-lg p-1.5 text-gray-400 transition hover:bg-white/60 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className={title ? 'mt-5' : ''}>{children}</div>
      </section>
    </div>
  )
}
