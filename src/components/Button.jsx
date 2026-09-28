import { forwardRef } from 'react'

const variantClasses = {
  primary: 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md shadow-pink-200/50 hover:from-pink-500 hover:to-rose-500 focus-visible:ring-pink-300',
  secondary: 'bg-white/70 text-gray-700 border border-white/50 hover:bg-white/90 focus-visible:ring-pink-300',
  outline: 'border-2 border-pink-300 bg-white/50 text-pink-600 hover:bg-pink-50 focus-visible:ring-pink-300',
  ghost: 'bg-transparent text-gray-600 hover:bg-white/50 focus-visible:ring-pink-300',
  danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus-visible:ring-red-300',
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
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
})

export default Button
