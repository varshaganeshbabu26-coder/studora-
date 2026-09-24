import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#000000] px-6 text-center bg-[#000000] dark:bg-[#000000] dark:bg-[#000000]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C0C0C0]">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <Link className="mt-6 inline-block text-[#C0C0C0] underline" to="/">
          Return home
        </Link>
      </div>
    </main>
  )
}
