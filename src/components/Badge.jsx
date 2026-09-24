const variantClasses = {
  default: 'bg-[#C0C0C0] text-[#C0C0C0]',
  primary: 'bg-[#C0C0C0] text-[#C0C0C0]',
  success: 'bg-[#C0C0C0] text-[#C0C0C0]',
  warning: 'bg-[#C0C0C0] text-[#C0C0C0]',
  danger: 'bg-[#C0C0C0] text-[#C0C0C0]',
}

export default function Badge({ variant = 'default', className = '', children }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${variantClasses[variant]} ${className}`}>{children}</span>
}
