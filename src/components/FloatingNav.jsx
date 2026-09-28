import { NavLink } from 'react-router-dom'
import { Home, BookOpen, CheckSquare, Sparkles, User } from 'lucide-react'

const navItems = [
  { to: '/app/dashboard', icon: Home, label: 'Home' },
  { to: '/app/subjects', icon: BookOpen, label: 'Subjects' },
  { to: '/app/planner', icon: CheckSquare, label: 'Tasks' },
  { to: '/app/tutor', icon: Sparkles, label: 'AI Tutor' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

export function FloatingTopNav() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2" aria-label="Main navigation">
      <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/60 px-2 py-2 shadow-lg shadow-pink-100/30 backdrop-blur-xl">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md'
                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function FloatingDockNav() {
  return (
    <nav
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/70 px-2 py-2 shadow-lg shadow-pink-100/30 backdrop-blur-xl">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md'
                  : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
              }`
            }
            aria-label={label}
          >
            <Icon className="h-5 w-5" />
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default function FloatingNav() {
  return (
    <>
      <FloatingTopNav />
      <FloatingDockNav />
    </>
  )
}
