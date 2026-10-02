import { useState } from 'react'
import { Bell, Check, LogOut, MoonStar, Pencil, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import Input from '../components/Input'
import Modal from '../components/Modal'
import { useTheme } from '../context/ThemeContext'

const initialProfile = {
  name: 'Alex Student',
  email: 'alex@student.ai',
  phone: '+1 (415) 555-0192',
}

export default function Profile() {
  // TODO: Replace local profile settings with authenticated user API and persisted account preferences.
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    studyReminders: true,
    weeklyDigest: false,
  })

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <GlassCard className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={profile.name} size="lg" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">Student profile</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-800">{profile.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" /> Edit profile
          </Button>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <GlassCard className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-pink-500" />
              <h2 className="text-xl font-semibold text-gray-800">Profile details</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/50 bg-white/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Full name</p>
              <p className="mt-2 text-lg text-gray-800">{profile.name}</p>
            </div>
            <div className="rounded-xl border border-white/50 bg-white/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Email</p>
              <p className="mt-2 text-lg text-gray-800">{profile.email}</p>
            </div>
            <div className="rounded-xl border border-white/50 bg-white/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Phone</p>
              <p className="mt-2 text-lg text-gray-800">{profile.phone}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <MoonStar className="h-5 w-5 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-xl border border-white/50 bg-white/45 px-4 py-3 text-left transition hover:bg-white/75"
            >
              <div>
                <p className="font-medium text-gray-800">Dark mode</p>
                <p className="text-sm text-gray-500">{theme === 'dark' ? 'Enabled' : 'Disabled'}</p>
              </div>
              <span className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${theme === 'dark' ? 'bg-pink-500' : 'bg-gray-300'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleSetting('notifications')}
              className="flex w-full items-center justify-between rounded-xl border border-white/50 bg-white/45 px-4 py-3 text-left transition hover:bg-white/75"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-pink-500" />
                <div>
                  <p className="font-medium text-gray-800">Notifications</p>
                  <p className="text-sm text-gray-500">Study reminders and alerts</p>
                </div>
              </div>
              <span className={`inline-flex h-6 w-11 items-center rounded-full transition ${settings.notifications ? 'bg-pink-500' : 'bg-gray-300'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleSetting('weeklyDigest')}
              className="flex w-full items-center justify-between rounded-xl border border-white/50 bg-white/45 px-4 py-3 text-left transition hover:bg-white/75"
            >
              <div>
                <p className="font-medium text-gray-800">Weekly digest</p>
                <p className="text-sm text-gray-500">Summaries at the end of the week</p>
              </div>
              <span className={`inline-flex h-6 w-11 items-center rounded-full transition ${settings.weeklyDigest ? 'bg-pink-500' : 'bg-gray-300'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white transition ${settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="ghost" className="hover:bg-white/50 hover:text-pink-600" onClick={() => navigate('/')}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      <Modal open={isEditing} onClose={() => setIsEditing(false)} title="Edit profile">
        <div className="space-y-4">
          <Input
            label="Full name"
            name="name"
            value={profile.name}
            onChange={handleFieldChange}
            placeholder="Your name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleFieldChange}
            placeholder="you@example.com"
          />
          <Input
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleFieldChange}
            placeholder="Phone number"
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              <Check className="h-4 w-4" /> Save changes
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
