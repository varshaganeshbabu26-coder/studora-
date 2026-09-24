import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#000000] text-[#C0C0C0]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((current) => !current)} />
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-[#000000]" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative h-full">
            <Sidebar mobile onNavigate={() => setMobileMenuOpen(false)} />
            <button type="button" title="Close menu" onClick={() => setMobileMenuOpen(false)} className="absolute right-3 top-5 rounded-lg p-2 text-[#C0C0C0] hover:bg-[#000000]"><X className="h-5 w-5" /></button>
          </div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          profileOpen={profileOpen}
          onProfileToggle={() => setProfileOpen((current) => !current)}
          onCloseProfile={() => setProfileOpen(false)}
          mobileMenuButton={<button type="button" title="Open menu" onClick={() => setMobileMenuOpen(true)} className="rounded-lg p-2 text-[#C0C0C0] hover:bg-[#000000] md:hidden"><Menu className="h-5 w-5" /></button>}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-10"><Outlet /></main>
      </div>
    </div>
  )
}
