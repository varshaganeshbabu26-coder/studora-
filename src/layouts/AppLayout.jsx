import { Outlet } from 'react-router-dom'
import SceneBackground from '../components/SceneBackground'
import { FloatingTopNav, FloatingDockNav } from '../components/FloatingNav'

export default function AppLayout() {
  return (
    <SceneBackground>
      <FloatingTopNav />
      <FloatingDockNav />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-24 md:pt-28">
        <Outlet />
      </main>
    </SceneBackground>
  )
}
