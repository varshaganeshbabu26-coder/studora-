export default function Avatar({ src, alt = '', name = '', size = 'md', className = '' }) {
  const sizeClasses = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg', xl: 'h-20 w-20 text-2xl' }
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || '?'

  return src ? (
    <img src={src} alt={alt || name} className={`rounded-full object-cover ${sizeClasses[size]} ${className}`} />
  ) : (
    <span role="img" aria-label={alt || name || 'Avatar'} className={`inline-grid place-items-center rounded-full bg-[#000000] font-semibold bg-[#000000] dark:bg-[#000000] dark:bg-[#000000] ${sizeClasses[size]} ${className}`}>
      {initials}
    </span>
  )
}
