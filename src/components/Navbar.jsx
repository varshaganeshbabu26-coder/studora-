import { Bell, ChevronDown, LogOut, Moon, Search, Settings, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ mobileMenuButton, profileOpen = false, onProfileToggle, onCloseProfile }) {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 flex h-24 items-center justify-between border-b border-[#C0C0C0] bg-[#000000] px-4 backdrop-blur sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        {mobileMenuButton}
        <div className="md:hidden"><span className="gold-shimmer text-lg font-black tracking-tight">Study</span><span className="gold-shimmer text-lg font-black tracking-tight">AI</span></div>
        <div className="hidden md:block"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C0C0C0]">Thursday, September 24</p><h1 className="mt-1 text-xl font-black tracking-tight text-[#C0C0C0]">Good morning, Alex</h1></div>
      </div>

      <div className="flex items-center gap-2">
          <button type="button" aria-label="Search" className="rounded-xl p-2.5 text-[#C0C0C0] transition hover:bg-[#000000] hover:text-[#C0C0C0]">
          <Search className="h-4 w-4" />
        </button>
          <button type="button" aria-label="Notifications" className="rounded-xl p-2.5 text-[#C0C0C0] transition hover:bg-[#000000] hover:text-[#C0C0C0]">
          <Bell className="h-4 w-4" />
        </button>
        <Button variant="ghost" size="sm" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={toggleTheme} className="p-2.5">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <div className="relative">
          <button type="button" aria-expanded={profileOpen} onClick={onProfileToggle} className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#000000]">
            <Avatar name="Alex Student" size="sm" />
            <ChevronDown className={`hidden h-4 w-4 text-[#C0C0C0] transition sm:block ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 rounded-xl border border-[#C0C0C0] bg-[#000000] p-1.5 shadow-lg">
              <button type="button" onClick={() => { onCloseProfile?.(); navigate('/app/profile') }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#C0C0C0] transition hover:bg-[#000000] hover:text-[#C0C0C0]"><Settings className="h-4 w-4" /> Account settings</button>
              <button type="button" onClick={() => { onCloseProfile?.(); navigate('/') }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#C0C0C0] transition hover:bg-[#000000] hover:text-[#C0C0C0]"><LogOut className="h-4 w-4" /> Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
