export default function ProgressBar({ value = 0, label, showValue = true, size = 'md', className = '' }) {
  const safeValue = Math.min(100, Math.max(0, value))
  const barSizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-4 text-sm">
          {label ? <span className="font-medium bg-[#000000]">{label}</span> : <span />}
          {showValue && <span className="font-semibold text-[#C0C0C0]">{safeValue}%</span>}
        </div>
      )}
      <div className={`overflow-hidden rounded-full bg-[#000000] ${barSizes[size]}`} role="progressbar" aria-valuenow={safeValue} aria-valuemin="0" aria-valuemax="100" aria-label={label}>
        <div className="h-full rounded-full bg-[#C0C0C0] transition-[width] duration-500" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}
