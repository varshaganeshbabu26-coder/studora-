const variantClasses = {
  default: 'bg-gray-100 text-gray-600',
  primary: 'bg-pink-100 text-pink-600',
  success: 'bg-green-100 text-green-600',
  warning: 'bg-amber-100 text-amber-600',
  danger: 'bg-red-100 text-red-600',
}

export default function Badge({ variant = 'default', className = '', children }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${variantClasses[variant]} ${className}`}>{children}</span>
}
