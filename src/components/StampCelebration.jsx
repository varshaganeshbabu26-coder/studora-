import { useEffect, useState } from 'react'
import Button from './Button'

export default function StampCelebration({ country, onClose }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Stamp earned celebration">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-sm rounded-3xl border border-white/50 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
        {/* Confetti */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#FF9A9E', '#FECFEF', '#A18CD1', '#43E97B', '#F6D365', '#FF6B6B'][i % 6],
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="text-6xl">{country.flag}</div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Stamp Earned!</h2>
        <p className="mt-2 text-gray-600">
          You completed all tasks in <strong>{country.name}</strong>!
        </p>
        <p className="mt-1 text-sm text-gray-500">{country.landmark} · {country.funLabel}</p>

        {/* Passport stamp visual */}
        <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-dashed border-amber-400 bg-amber-50">
          <span className="text-4xl">{country.milestoneSouvenir || '🏅'}</span>
        </div>

        <Button onClick={onClose} className="mt-6 w-full">
          Continue journey
        </Button>
      </div>
    </div>
  )
}
