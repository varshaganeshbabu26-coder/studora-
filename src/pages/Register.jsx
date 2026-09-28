import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Complete all fields to create your account.')
      return
    }
    setError('')
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <GlassCard className="p-7 sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-lavender-100 text-pink-500">
          <UserRoundPlus className="h-6 w-6" />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-wider text-pink-500">Start your rhythm</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Build a better study habit.</h1>
        <p className="mt-3 text-gray-600">Set up your free workspace and make your next session count.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="register-name" className="block text-sm font-semibold text-gray-700">
              Full name
            </label>
            <input
              id="register-name"
              type="text"
              placeholder="Alex Student"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="register-email" className="block text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">
            Create account <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link className="font-bold text-pink-500 hover:text-pink-600" to="/login">
            Log in
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
