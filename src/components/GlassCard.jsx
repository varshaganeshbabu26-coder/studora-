export default function GlassCard({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-3xl border border-white/40 bg-white/60 shadow-lg shadow-pink-100/30 backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
