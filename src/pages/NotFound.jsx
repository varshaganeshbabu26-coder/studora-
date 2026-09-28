import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4">
      <GlassCard className="p-8 text-center sm:p-12">
        <BunnyAvatar size="lg" className="mx-auto" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-pink-500">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-gray-600">This island hasn't been discovered yet.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">
          Return home
        </Link>
      </GlassCard>
    </div>
  )
}
