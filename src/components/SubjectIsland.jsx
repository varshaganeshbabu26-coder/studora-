import { Link } from 'react-router-dom'
import { Lock, CheckCircle2, Plus } from 'lucide-react'
import BunnyAvatar from './BunnyAvatar'

export default function SubjectIsland({ subject, country, taskCount, completedCount, isLastStudied, onClick, className = '' }) {
  const progress = subject.progress || 0
  const isCompleted = progress >= 100
  const isNotStarted = completedCount === 0
  const slug = subject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <div className={`group relative flex flex-col items-center ${className}`}>
      <Link
        to={`/app/subjects/${slug}`}
        className="relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 rounded-3xl"
        aria-label={`${subject.name} - ${country.name} - ${progress}% complete`}
      >
        {/* Island body with photo */}
        <div
          className={`relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 sm:h-44 sm:w-44 ${
            isNotStarted ? 'opacity-70' : ''
          }`}
          style={{
            border: `3px solid ${isCompleted ? '#FFD700' : country.colors.primary}90`,
            boxShadow: isCompleted
              ? '0 0 30px rgba(255, 215, 0, 0.3)'
              : isNotStarted
                ? 'none'
                : `0 0 20px ${country.colors.primary}40`,
          }}
        >
          {/* Country photo */}
          <img
            src={country.photo}
            alt={country.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Progress ring */}
          {progress > 0 && (
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="5" opacity="0.4" />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={isCompleted ? '#FFD700' : country.colors.accent}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.89} 289`}
                className="transition-all duration-700"
              />
            </svg>
          )}

          {/* Lock overlay for not started */}
          {isNotStarted && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/50">
              <Lock className="h-8 w-8 text-gray-500" />
            </div>
          )}

          {/* Stamp badge for completed */}
          {isCompleted && (
            <div className="absolute -right-1 -top-1 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-lg shadow-lg shadow-amber-300/50">
              🏅
            </div>
          )}

          {/* Last studied indicator */}
          {isLastStudied && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <BunnyAvatar size="sm" mood="happy" />
            </div>
          )}
        </div>

        {/* Subject info below island */}
        <div className="mt-3 flex flex-col items-center gap-1 text-center">
          <span className="text-2xl" role="img" aria-label={country.name}>
            {country.flag}
          </span>
          <h3 className="text-sm font-bold text-gray-700 sm:text-base">{subject.name}</h3>
          <p className="text-xs text-gray-500">{country.name}</p>
          <div className="flex items-center gap-1">
            {isCompleted ? (
              <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                <CheckCircle2 className="h-3 w-3" /> Stamped!
              </span>
            ) : (
              <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium text-gray-600">
                {completedCount} of {taskCount} tasks
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Hover tooltip */}
      <div className="pointer-events-none absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full opacity-0 transition-all duration-200 group-hover:opacity-100">
        <div className="whitespace-nowrap rounded-2xl border border-white/50 bg-white/90 px-4 py-2 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-md">
          <p>Task {completedCount} of {taskCount}</p>
          <p className="text-pink-500">Click to open journey →</p>
        </div>
      </div>
    </div>
  )
}
