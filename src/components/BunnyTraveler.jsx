export default function BunnyTraveler({ position, mood = 'idle', isWalking = false, className = '' }) {
  return (
    <div
      className={`absolute transition-all duration-700 ease-in-out ${className}`}
      style={{ left: `${position}%`, bottom: '8%' }}
      role="img"
      aria-label="Bunny traveler"
    >
      <div className={`relative ${isWalking ? 'bunny-walk' : ''}`}>
        {/* Backpack */}
        <div className="absolute -left-3 top-4 h-8 w-6 rounded-lg bg-amber-600 shadow-md" />
        <div className="absolute -left-2 top-5 h-6 w-4 rounded bg-amber-700" />

        {/* Bunny SVG with backpack */}
        <svg viewBox="0 0 100 100" className="h-16 w-16 drop-shadow-lg" aria-hidden="true">
          {/* Body */}
          <ellipse cx="50" cy="65" rx="22" ry="28" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="50" cy="38" r="18" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5" />
          {/* Ears */}
          <ellipse cx="38" cy="18" rx="6" ry="16" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5" className="bunny-ear-wiggle" />
          <ellipse cx="62" cy="18" rx="6" ry="16" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5" className="bunny-ear-wiggle" />
          {/* Inner ears */}
          <ellipse cx="38" cy="18" rx="3" ry="10" fill="#FFB6C1" />
          <ellipse cx="62" cy="18" rx="3" ry="10" fill="#FFB6C1" />
          {/* Eyes */}
          <circle cx="43" cy="36" r="3" fill="#333" className="bunny-blink" />
          <circle cx="57" cy="36" r="3" fill="#333" className="bunny-blink" />
          {/* Nose */}
          <ellipse cx="50" cy="44" rx="2.5" ry="2" fill="#FFB6C1" />
          {/* Mouth */}
          <path d="M 47 47 Q 50 50 53 47" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="38" cy="44" r="3" fill="#FFB6C1" opacity="0.5" />
          <circle cx="62" cy="44" r="3" fill="#FFB6C1" opacity="0.5" />
          {/* Feet */}
          <ellipse cx="40" cy="90" rx="8" ry="5" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1" />
          <ellipse cx="60" cy="90" rx="8" ry="5" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1" />
          {/* Tail */}
          <circle cx="50" cy="88" r="5" fill="white" stroke="#E0D5C5" strokeWidth="1" />
          {/* Passport in pocket */}
          <rect x="55" y="60" width="8" height="10" rx="1" fill="#1E3A5F" stroke="#0F2744" strokeWidth="0.5" />
          <text x="59" y="67" textAnchor="middle" fontSize="4" fill="white">📖</text>
        </svg>

        {/* Mood indicator */}
        {mood === 'happy' && (
          <span className="absolute -right-2 -top-2 text-lg" aria-hidden="true">✨</span>
        )}
      </div>
    </div>
  )
}
