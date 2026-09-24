import { Link, useLocation } from 'react-router-dom'

export default function AuthPage() {
  const { pathname } = useLocation()
  const isRegister = pathname === '/register'

  return (
    <main className="mx-auto flex min-h-[calc(100vh-145px)] w-full max-w-md items-center px-6 py-16">
      <section className="w-full rounded-2xl border bg-[#000000] bg-[#000000] p-8 shadow-sm dark:bg-[#000000] dark:bg-[#000000]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C0C0C0]">Studora</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p className="mt-2 bg-[#000000] dark:bg-[#000000]">{isRegister ? 'Start building a better study rhythm.' : 'Continue where you left off.'}</p>
        <div className="mt-8 space-y-4">
          <input aria-label="Email address" placeholder="Email address" className="w-full rounded-xl border border-[#C0C0C0] bg-[#000000] px-4 py-3 bg-[#000000] outline-none transition focus:ring-2 focus:ring-[#C0C0C0]" />
          <input aria-label="Password" type="password" placeholder="Password" className="w-full rounded-xl border border-[#C0C0C0] bg-[#000000] px-4 py-3 bg-[#000000] outline-none transition focus:ring-2 focus:ring-[#C0C0C0]" />
          <button type="button" className="w-full rounded-xl bg-[#000000] px-4 py-3 font-semibold text-[#C0C0C0] shadow-sm transition hover:bg-[#000000]">{isRegister ? 'Create account' : 'Login'}</button>
        </div>
        <p className="mt-6 text-center text-sm bg-[#000000] dark:bg-[#000000]">
          {isRegister ? 'Already have an account?' : 'New to Studora?'}{' '}
          <Link className="font-semibold text-[#C0C0C0]" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Login' : 'Register'}</Link>
        </p>
      </section>
    </main>
  )
}
