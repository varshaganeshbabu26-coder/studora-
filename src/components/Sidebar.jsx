import { NavLink } from 'react-router-dom'
import { BookOpen, BrainCircuit, CalendarDays, FileText, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Plus, Save, UserRound } from 'lucide-react'
import Avatar from './Avatar'

export const navigation = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'AI Tutor', to: '/app/tutor', icon: BrainCircuit },
  { label: 'Smart Notes', to: '/app/notes', icon: FileText },
  { label: 'AI Quiz', to: '/app/quiz', icon: BookOpen },
  { label: 'Study Planner', to: '/app/planner', icon: CalendarDays },
  { label: 'Subjects', to: '/app/subjects', icon: Plus },
  { label: 'Profile', to: '/app/profile', icon: UserRound },
]

export default function Sidebar({ collapsed = false, onToggle, mobile = false, onNavigate }) {
  return (
    <aside className={`${mobile ? 'flex h-full w-72 flex-col shadow-xl' : `hidden shrink-0 transition-[width] duration-200 md:flex md:flex-col ${collapsed ? 'w-20' : 'w-64'}`} bg-[#000000] text-[#C0C0C0]`}>
      <div className={`flex h-24 items-center border-b bg-[#000000] px-5 ${collapsed && !mobile ? 'justify-center' : 'justify-between'}`}>
        {(!collapsed || mobile) && <div><span className="gold-shimmer text-2xl font-black tracking-[-0.08em]">Study</span><span className="gold-shimmer text-2xl font-black tracking-[-0.08em]">AI</span><p className="mt-1 text-[#C0C0C0] font-bold uppercase tracking-[0.24em]">Your learning studio</p></div>}
        {!mobile && <button type="button" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="rounded-lg p-2 text-[#C0C0C0] transition hover:bg-[#000000] hover:text-[#C0C0C0]">{collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}</button>}
      </div>
      <nav className={`workspace-nav flex-1 space-y-1 px-3 py-7 ${collapsed && !mobile ? 'px-2' : ''}`}>
        {!collapsed && <p className="mb-3 border-b border-[#C0C0C0] px-3 pb-3 text-[#C0C0C0] font-bold uppercase tracking-[0.2em]">Workspace</p>}
        {navigation.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} onClick={onNavigate} title={collapsed && !mobile ? label : undefined} className={({ isActive }) => `group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-bold transition ${isActive ? 'border-2 border-[#C0C0C0] bg-[#000000] text-[#FFFFFF] shadow-none' : 'border-transparent text-[#FFFFFF] hover:border-[#C0C0C0] hover:bg-[#000000] hover:text-[#FFFFFF]'} ${collapsed && !mobile ? 'justify-center' : ''}`}><Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />{(!collapsed || mobile) && <span>{label}</span>}</NavLink>)}
      </nav>
      {(!collapsed || mobile) && <div className="border-t border-[#C0C0C0] p-3"><div className="flex items-center gap-3 rounded-xl bg-[#000000] p-3"><Avatar name="Alex Student" size="sm" /><div className="min-w-0"><p className="truncate text-sm font-bold text-[#C0C0C0]">Alex Student</p><p className="truncate text-xs text-[#C0C0C0]">Free plan</p></div></div></div>}
    </aside>
  )
}
