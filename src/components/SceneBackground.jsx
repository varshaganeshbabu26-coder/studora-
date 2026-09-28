export default function SceneBackground({ children, className = '' }) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Sky gradient */}
      <div className="scene-sky absolute inset-0" />

      {/* Drifting clouds */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="cloud cloud-4" />

      {/* Floating islands in background */}
      <div className="floating-island fi-1" />
      <div className="floating-island fi-2" />
      <div className="floating-island fi-3" />

      {/* Hot air balloon */}
      <div className="hot-air-balloon" aria-hidden="true">
        <svg viewBox="0 0 60 80" className="h-full w-full">
          <ellipse cx="30" cy="25" rx="20" ry="25" fill="#FF9A9E" />
          <ellipse cx="30" cy="25" rx="12" ry="25" fill="#FECFEF" opacity="0.5" />
          <rect x="22" y="50" width="16" height="12" rx="2" fill="#8B7355" />
          <line x1="25" y1="50" x2="28" y2="40" stroke="#8B7355" strokeWidth="1" />
          <line x1="35" y1="50" x2="32" y2="40" stroke="#8B7355" strokeWidth="1" />
        </svg>
      </div>

      {/* Tiny birds */}
      <div className="bird bird-1" aria-hidden="true">
        <svg viewBox="0 0 20 10" className="h-full w-full">
          <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" fill="none" stroke="#666" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="bird bird-2" aria-hidden="true">
        <svg viewBox="0 0 20 10" className="h-full w-full">
          <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" fill="none" stroke="#666" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Twinkles */}
      <div className="twinkle twinkle-1" />
      <div className="twinkle twinkle-2" />
      <div className="twinkle twinkle-3" />
      <div className="twinkle twinkle-4" />
      <div className="twinkle twinkle-5" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
