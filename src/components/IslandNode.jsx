export default function IslandNode({ country, progress = 0, isActive = false, onClick, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-20 w-20',
    md: 'h-32 w-32',
    lg: 'h-44 w-44',
  }

  const landmarkSvg = {
    mountain: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <polygon points="30,5 55,35 5,35" fill="#FF9A9E" stroke="#E07A7E" strokeWidth="1" />
        <polygon points="30,5 38,18 22,18" fill="white" opacity="0.8" />
      </svg>
    ),
    pyramid: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <polygon points="30,5 55,35 5,35" fill="#F6D365" stroke="#D4A574" strokeWidth="1" />
        <line x1="30" y1="5" x2="30" y2="35" stroke="#D4A574" strokeWidth="0.5" />
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <ellipse cx="30" cy="15" rx="8" ry="12" fill="#A18CD1" stroke="#7B6BB5" strokeWidth="1" />
        <polygon points="22,27 28,38 20,35" fill="#FF6B6B" />
        <polygon points="38,27 32,38 40,35" fill="#FF6B6B" />
        <circle cx="30" cy="12" r="3" fill="white" />
      </svg>
    ),
    tower: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <polygon points="30,5 35,35 25,35" fill="#C0C0C0" stroke="#999" strokeWidth="1" />
        <line x1="27" y1="15" x2="33" y2="15" stroke="#999" strokeWidth="1" />
        <line x1="26" y1="25" x2="34" y2="25" stroke="#999" strokeWidth="1" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <rect x="25" y="5" width="10" height="30" fill="#8B7355" stroke="#6B5335" strokeWidth="1" />
        <circle cx="30" cy="15" r="4" fill="white" stroke="#333" strokeWidth="1" />
        <line x1="30" y1="15" x2="30" y2="12" stroke="#333" strokeWidth="1" />
        <line x1="30" y1="15" x2="32" y2="15" stroke="#333" strokeWidth="1" />
      </svg>
    ),
    statue: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <rect x="28" y="10" width="4" height="20" fill="#43E97B" stroke="#2ECC71" strokeWidth="1" />
        <line x1="20" y1="15" x2="40" y2="15" stroke="#2ECC71" strokeWidth="2" />
        <circle cx="30" cy="8" r="3" fill="#43E97B" stroke="#2ECC71" strokeWidth="1" />
      </svg>
    ),
    opera: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <path d="M 10 35 Q 20 15 30 35" fill="#FA709A" stroke="#E0507A" strokeWidth="1" />
        <path d="M 25 35 Q 35 10 45 35" fill="#FEE140" stroke="#D4B030" strokeWidth="1" />
        <path d="M 40 35 Q 50 20 55 35" fill="#A18CD1" stroke="#7B6BB5" strokeWidth="1" />
      </svg>
    ),
    dome: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <rect x="15" y="20" width="30" height="15" fill="#FF9A9E" stroke="#E07A7E" strokeWidth="1" />
        <path d="M 20 20 Q 30 5 40 20" fill="#FF9A9E" stroke="#E07A7E" strokeWidth="1" />
        <circle cx="30" cy="12" r="2" fill="#FFD700" />
      </svg>
    ),
    temple: (
      <svg viewBox="0 0 60 40" className="h-10 w-10">
        <rect x="10" y="25" width="40" height="10" fill="#89F7FE" stroke="#5BC0DE" strokeWidth="1" />
        <rect x="15" y="15" width="5" height="10" fill="#89F7FE" stroke="#5BC0DE" strokeWidth="1" />
        <rect x="27" y="15" width="5" height="10" fill="#89F7FE" stroke="#5BC0DE" strokeWidth="1" />
        <rect x="40" y="15" width="5" height="10" fill="#89F7FE" stroke="#5BC0DE" strokeWidth="1" />
        <polygon points="30,5 50,15 10,15" fill="#66A6FF" stroke="#4A8AD4" strokeWidth="1" />
      </svg>
    ),
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 ${sizeClasses[size]} ${className}`}
      aria-label={`${country.name} - ${country.landmark}`}
    >
      {/* Island base */}
      <div
        className="absolute inset-0 rounded-full opacity-80 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${country.colors.primary}40, ${country.colors.secondary}60)`,
          border: `2px solid ${country.colors.primary}80`,
        }}
      />
      {/* Floating animation wrapper */}
      <div className="island-float relative z-10 flex flex-col items-center">
        {/* Landmark */}
        <div className="mb-1 drop-shadow-md">
          {landmarkSvg[country.landmarkType] || landmarkSvg.mountain}
        </div>
        {/* Country flag */}
        <span className="text-lg" role="img" aria-label={`${country.name} flag`}>
          {country.flag}
        </span>
      </div>
      {/* Progress ring */}
      {progress > 0 && (
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="4" opacity="0.3" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={country.colors.accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.89} 289`}
            className="transition-all duration-700"
          />
        </svg>
      )}
      {/* Active indicator */}
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-pink-400 shadow-lg shadow-pink-300/50" />
      )}
    </button>
  )
}
