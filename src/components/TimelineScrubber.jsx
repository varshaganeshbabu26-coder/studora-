import { useState } from 'react'

export default function TimelineScrubber({ stops, currentStop, onSelect, className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={`relative ${className}`} role="tablist" aria-label="Journey timeline">
      {/* Progress bar track */}
      <div className="relative h-1.5 rounded-full bg-white/20 backdrop-blur-sm">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-500"
          style={{ width: `${((currentStop + 1) / stops.length) * 100}%` }}
        />
      </div>

      {/* Stop dots */}
      <div className="relative mt-3 flex justify-between">
        {stops.map((stop, index) => {
          const isCompleted = index <= currentStop
          const isCurrent = index === currentStop
          const isFuture = index > currentStop

          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Stop ${index + 1}: ${stop.title}`}
              className={`group relative flex flex-col items-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 rounded-full ${
                isCurrent ? 'scale-125' : 'hover:scale-110'
              }`}
              onClick={() => onSelect(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Dot */}
              <div
                className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'border-pink-400 bg-pink-400 shadow-md shadow-pink-300/50'
                    : isFuture
                      ? 'border-white/40 bg-white/20'
                      : 'border-white/60 bg-white/40'
                } ${isCurrent ? 'animate-pulse' : ''}`}
              />

              {/* Label */}
              <span className={`mt-2 text-xs font-medium transition-all duration-200 ${
                isCurrent ? 'text-pink-600' : isCompleted ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {stop.title}
              </span>

              {/* Hover preview thumbnail */}
              {hoveredIndex === index && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-32 h-20 rounded-xl overflow-hidden border-2 border-white/50 shadow-xl">
                  <img src={stop.bg} alt={stop.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-1 left-1 right-1 text-white text-[10px] font-medium truncate">{stop.title}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
