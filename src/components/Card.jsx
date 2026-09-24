export default function Card({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-[1.25rem] border border-[#C0C0C0] bg-[#000000] p-6 shadow-none ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
