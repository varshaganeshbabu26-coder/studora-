import { useEffect, useState, useRef } from 'react'

export default function CountryBackground({ country, children, className = '', static: isStatic = false }) {
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!country) return <div className={`relative min-h-screen ${className}`}>{children}</div>

  return (
    <div ref={containerRef} className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{ background: country.skyGradient }}
      />

      {/* Parallax layers - static or scroll-based */}
      {country.layers?.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${layer.url})`,
            zIndex: i + 1,
          }}
        />
      ))}

      {/* Ambient effects */}
      <AmbientEffect type={country.ambient} isVisible={isVisible} />

      {/* Wildlife */}
      <Wildlife animals={country.wildlife} isVisible={isVisible} />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" style={{ zIndex: 10 }} />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}

function AmbientEffect({ type, isVisible }) {
  if (!isVisible) return null

  const effects = {
    petals: Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="ambient-petal"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${6 + Math.random() * 4}s`,
        }}
      >
        🌸
      </div>
    )),
    butterflies: Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="ambient-butterfly"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${30 + Math.random() * 40}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${8 + Math.random() * 4}s`,
        }}
      >
        🦋
      </div>
    )),
    birds: Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="ambient-bird"
        style={{
          top: `${10 + Math.random() * 30}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${12 + Math.random() * 6}s`,
        }}
      >
        🐦
      </div>
    )),
    snow: Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="ambient-snow"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 6}s`,
        }}
      >
        ❄️
      </div>
    )),
    leaves: Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="ambient-leaf"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${7 + Math.random() * 4}s`,
        }}
      >
        🍃
      </div>
    )),
    clouds: Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="ambient-cloud"
        style={{
          top: `${5 + Math.random() * 20}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${20 + Math.random() * 10}s`,
        }}
      >
        ☁️
      </div>
    )),
    heat: Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="ambient-heat"
        style={{
          bottom: `${10 + Math.random() * 20}%`,
          left: `${20 + Math.random() * 60}%`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      >
        🌡️
      </div>
    )),
    balloon: (
      <div className="ambient-balloon" style={{ top: '15%' }}>
        🎈
      </div>
    ),
    waves: Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="ambient-wave"
        style={{
          bottom: `${5 + Math.random() * 15}%`,
          left: `${Math.random() * 80}%`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      >
        🌊
      </div>
    )),
  }

  return <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>{effects[type] || null}</div>
}

function Wildlife({ animals, isVisible }) {
  if (!isVisible || !animals) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 6 }}>
      {animals.map((animal, i) => (
        <div
          key={i}
          className="ambient-wildlife"
          style={{
            bottom: `${5 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${10 + Math.random() * 8}s`,
            fontSize: `${1.5 + Math.random() * 1.5}rem`,
          }}
        >
          {animal}
        </div>
      ))}
    </div>
  )
}
