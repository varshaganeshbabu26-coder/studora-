import { forwardRef } from 'react'

const variantClasses = {
  primary: 'border border-[#C0C0C0] bg-[#000000] text-[#FFFFFF] shadow-none hover:bg-[#C0C0C0] hover:text-[#000000] focus-visible:ring-[#C0C0C0]',
  secondary: 'border border-[#C0C0C0] bg-[#000000] text-[#FFFFFF] hover:bg-[#C0C0C0] hover:text-[#000000] focus-visible:ring-[#C0C0C0]',
  outline: 'border border-[#C0C0C0] bg-[#000000] text-[#FFFFFF] hover:border-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#000000] focus-visible:ring-[#C0C0C0]',
  ghost: 'border border-[#C0C0C0] bg-[#000000] text-[#FFFFFF] hover:bg-[#C0C0C0] hover:text-[#000000] focus-visible:ring-[#C0C0C0]',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

const Button = forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', size = 'md', className = '', type = 'button', children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      {...(Component === 'button' ? { type } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-offset-black ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Button
