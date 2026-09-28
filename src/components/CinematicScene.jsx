import { useState, useEffect, useRef } from 'react'

export default function CinematicScene({ country, stopIndex, isTransitioning, className = '' }) {
  const [currentBg, setCurrentBg] = useState(0)
  const [prevBg, setPrevBg] = useState(0)
  const [showCaption, setShowCaption] = useState(false)
  const containerRef = useRef(null)

  const stops = country?.stops || []
  const currentStop = stops[stopIndex] || stops[0]

  useEffect(() => {
    if (stopIndex !== currentBg) {
      setPrevBg(currentBg)
      setCurrentBg(stopIndex)
      setShowCaption(true)
      const timer = setTimeout(() => setShowCaption(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [stopIndex, currentBg])

  if (!country || !currentStop) return null

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Previous background (for crossfade) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${stops[prevBg]?.bg || currentStop.bg})` }}
      />

      {/* Current background with Ken Burns */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${isTransitioning ? 'opacity-100' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${currentStop.bg})`,
          animation: 'ken-burns 20s ease-in-out infinite alternate',
        }}
      />

      {/* Film grain overlay */}
      <div className="film-grain absolute inset-0 pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* Light leak effect during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,200,150,0.3) 50%, transparent 100%)',
          animation: 'light-leak 1.5s ease-out forwards',
        }} />
      )}

      {/* Caption */}
      {showCaption && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center transition-all duration-500" style={{ zIndex: 30 }}>
          <p className="text-white/80 text-sm font-medium tracking-widest uppercase">{country.flag} {currentStop.place}</p>
          <h2 className="text-white text-3xl font-bold mt-1 drop-shadow-lg">{currentStop.title}</h2>
          <p className="text-white/70 text-sm mt-1 italic">{currentStop.caption}</p>
        </div>
      )}

      {/* Wildlife */}
      {currentStop.wildlife && (
        <div className="absolute bottom-20 left-0 text-3xl animate-wildlife-walk pointer-events-none" style={{ zIndex: 15 }}>
          {currentStop.wildlife}
        </div>
      )}
    </div>
  )
}
