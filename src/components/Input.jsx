import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  { label, error, hint, id, className = '', required = false, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id || generatedId
  const messageId = `${inputId}-message`

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? messageId : undefined}
        className={`w-full rounded-xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-200 disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-red-300' : ''} ${className}`}
        {...props}
      />
      {(error || hint) && <p id={messageId} className="text-xs text-gray-500">{error || hint}</p>}
    </div>
  )
})

export default Input
