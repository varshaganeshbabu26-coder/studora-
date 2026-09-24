import { useLocation } from 'react-router-dom'

const pageNames = {
  dashboard: 'Dashboard',
  tutor: 'AI Tutor',
  notes: 'Smart Notes',
  quiz: 'AI Quiz',
  planner: 'Study Planner',
  subjects: 'Subjects',
  saved: 'Saved Content',
  profile: 'Profile',
}

export default function AppPlaceholder() {
  const { pathname } = useLocation()
  const pageKey = pathname.split('/').filter(Boolean).pop()
  const pageName = pageNames[pageKey] || 'Dashboard'

  return (
    <section className="mx-auto max-w-6xl">
      <div className="rounded-2xl border border-dashed border-[#C0C0C0] bg-[#000000] p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C0C0C0]">Authenticated workspace</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">{pageName}</h2>
        <p className="mt-3 max-w-xl bg-[#000000] dark:bg-[#000000]">This route is ready for the {pageName.toLowerCase()} experience.</p>
      </div>
    </section>
  )
}
