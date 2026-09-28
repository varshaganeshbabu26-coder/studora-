export default function PathStop({ index, isCompleted, isCurrent, isNext, onClick, taskTitle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${className}`}
      aria-label={`Stop ${index + 1}: ${taskTitle || `Task ${index + 1}`} ${isCompleted ? '(completed)' : isNext ? '(next)' : ''}`}
    >
      {/* Stone/step */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
          isCompleted
            ? 'border-pink-300 bg-pink-100 text-pink-600 shadow-md shadow-pink-200/50'
            : isNext
              ? 'border-pink-400 bg-white text-pink-500 shadow-lg shadow-pink-300/50 animate-pulse'
              : 'border-gray-300 bg-white/50 text-gray-400'
        } group-hover:scale-110`}
      >
        {isCompleted ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span>{index + 1}</span>
        )}
      </div>
      {/* Task label */}
      {taskTitle && (
        <span
          className={`mt-2 max-w-[80px] truncate text-center text-xs font-medium ${
            isCompleted ? 'text-pink-600' : isNext ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          {taskTitle}
        </span>
      )}
      {/* Next indicator */}
      {isNext && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-pink-400 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
          NEXT
        </span>
      )}
    </button>
  )
}
