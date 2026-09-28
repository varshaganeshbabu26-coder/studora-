import { ArrowRight, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.email.trim() || !form.password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }
    setError('')
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <GlassCard className="p-7 sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-lavender-100 text-pink-500">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-wider text-pink-500">Welcome back</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Pick up where you left off.</h1>
        <p className="mt-3 text-gray-600">Your next focused study session is waiting.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
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
            Log in <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-gray-600">
          New to Study World?{' '}
          <Link className="font-bold text-pink-500 hover:text-pink-600" to="/register">
            Create an account
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
