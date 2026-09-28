export default function BunnyAvatar({ size = 'md', mood = 'idle', className = '' }) {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  }

  const moodEmoji = {
    idle: '',
    happy: '✨',
    hop: '🎉',
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-lg" aria-label="Bunny companion">
        {/* Body */}
        <ellipse cx="50" cy="65" rx="22" ry="28" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="50" cy="38" r="18" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" />
        {/* Ears */}
        <ellipse cx="38" cy="18" rx="6" ry="16" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" className="bunny-ear-left" />
        <ellipse cx="62" cy="18" rx="6" ry="16" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5" className="bunny-ear-right" />
        {/* Inner ears */}
        <ellipse cx="38" cy="18" rx="3" ry="10" fill="#FFB6C1" />
        <ellipse cx="62" cy="18" rx="3" ry="10" fill="#FFB6C1" />
        {/* Eyes */}
        <circle cx="43" cy="36" r="3" fill="#333" className="bunny-eye" />
        <circle cx="57" cy="36" r="3" fill="#333" className="bunny-eye" />
        {/* Nose */}
        <ellipse cx="50" cy="44" rx="2.5" ry="2" fill="#FFB6C1" />
        {/* Mouth */}
        <path d="M 47 47 Q 50 50 53 47" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="38" cy="44" r="3" fill="#FFB6C1" opacity="0.5" />
        <circle cx="62" cy="44" r="3" fill="#FFB6C1" opacity="0.5" />
        {/* Feet */}
        <ellipse cx="40" cy="90" rx="8" ry="5" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        <ellipse cx="60" cy="90" rx="8" ry="5" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        {/* Tail */}
        <circle cx="50" cy="88" r="5" fill="white" stroke="#E0E0E0" strokeWidth="1" />
      </svg>
      {moodEmoji[mood] && (
        <span className="absolute -right-1 -top-1 text-lg" aria-hidden="true">
          {moodEmoji[mood]}
        </span>
      )}
    </div>
  )
}
