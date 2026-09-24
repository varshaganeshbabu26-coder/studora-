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
        <label htmlFor={inputId} className="block text-sm font-semibold text-[#FFFFFF]">
          {label} {required && <span className="text-[#FFFFFF]">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? messageId : undefined}
        className={`w-full rounded-xl border border-[#C0C0C0] bg-[#000000] px-4 py-3 text-sm text-[#FFFFFF] outline-none transition placeholder:text-[#FFFFFF] focus:border-[#C0C0C0] focus:ring-1 focus:ring-[#C0C0C0] disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-[#C0C0C0]' : ''} ${className}`}
        {...props}
      />
      {(error || hint) && <p id={messageId} className="text-xs text-[#FFFFFF]">{error || hint}</p>}
    </div>
  )
})

export default Input
