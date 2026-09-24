import { ArrowRight, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'

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
    <main className="relative flex min-h-[calc(100vh-145px)] items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-[#000000]" />
      <Card as="section" className="relative w-full max-w-md p-7 sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#000000] text-[#C0C0C0]"><LockKeyhole className="h-6 w-6" /></div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] bg-[#000000] dark:bg-[#000000]">Welcome back</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight bg-[#000000] dark:bg-[#000000]">Pick up where you left off.</h1>
        <p className="mt-3 bg-[#000000] dark:bg-[#000000]">Your next focused study session is waiting.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <Input label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          {error && <p className="rounded-xl bg-[#000000] px-4 py-3 text-sm font-medium text-[#C0C0C0]" role="alert">{error}</p>}
          <Button type="submit" size="lg" className="w-full">Log in <ArrowRight className="h-4 w-4" /></Button>
        </form>
        <p className="mt-7 text-center text-sm bg-[#000000] dark:bg-[#000000]">New to Studora? <Link className="font-bold bg-[#000000] hover:bg-[#000000] dark:bg-[#000000]" to="/register">Create an account</Link></p>
      </Card>
    </main>
  )
}
