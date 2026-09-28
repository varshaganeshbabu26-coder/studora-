import { Link, Outlet } from 'react-router-dom'
import SceneBackground from '../components/SceneBackground'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'

export default function PublicLayout() {
  return (
    <SceneBackground>
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 px-4 py-4">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <BunnyAvatar size="sm" />
              <span className="text-xl font-bold tracking-tight text-gradient">Study World</span>
            </Link>
            <nav className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full border border-white/40 bg-white/50 px-4 py-2 text-sm font-semibold text-gray-600 backdrop-blur-md transition hover:bg-white/80"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                Register
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="px-6 py-6 text-center text-sm text-gray-500">
          <p>Study World — Learn with more clarity.</p>
        </footer>
      </div>
    </SceneBackground>
  )
}
