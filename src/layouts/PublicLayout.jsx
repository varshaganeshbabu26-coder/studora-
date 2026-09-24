import { Link, Outlet } from 'react-router-dom'
import Button from '../components/Button'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000000] bg-[#000000] bg-[#000000] dark:bg-[#000000]">
      <header className="border-b border-[#C0C0C0] bg-[#000000] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="text-xl font-bold tracking-tight bg-[#000000] dark:bg-[#000000]">
            Studora
          </Link>
          <nav className="flex items-center gap-3">
            <Button as={Link} to="/login" variant="ghost" size="sm">Login</Button>
            <Button as={Link} to="/register" size="sm">Register</Button>
          </nav>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-[#C0C0C0] bg-[#000000] px-6 py-6 text-center text-sm bg-[#000000]">
        <p>Studora Â· Learn with more clarity.</p>
      </footer>
    </div>
  )
}
