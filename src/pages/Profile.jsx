import { useState } from 'react'
import { Bell, Check, LogOut, MoonStar, Pencil, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Card from '../components/Card'
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
      <Card className="border-[#C0C0C0] bg-[#000000] p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={profile.name} size="lg" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C0C0C0]">Student profile</p>
              <h1 className="mt-2 text-3xl font-bold bg-[#000000]">{profile.name}</h1>
              <p className="mt-1 text-sm bg-[#000000]">{profile.email}</p>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" /> Edit profile
          </Button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="border-[#C0C0C0] bg-[#000000] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-[#C0C0C0]" />
              <h2 className="text-xl font-semibold bg-[#000000]">Profile details</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border bg-[#000000] bg-[#000000] p-4">
              <p className="text-[#C0C0C0] uppercase tracking-[0.15em] bg-[#000000]">Full name</p>
              <p className="mt-2 text-lg bg-[#000000]">{profile.name}</p>
            </div>
            <div className="rounded-xl border bg-[#000000] bg-[#000000] p-4">
              <p className="text-[#C0C0C0] uppercase tracking-[0.15em] bg-[#000000]">Email</p>
              <p className="mt-2 text-lg bg-[#000000]">{profile.email}</p>
            </div>
            <div className="rounded-xl border bg-[#000000] bg-[#000000] p-4">
              <p className="text-[#C0C0C0] uppercase tracking-[0.15em] bg-[#000000]">Phone</p>
              <p className="mt-2 text-lg bg-[#000000]">{profile.phone}</p>
            </div>
          </div>
        </Card>

        <Card className="border-[#C0C0C0] bg-[#000000] p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <MoonStar className="h-5 w-5 text-[#C0C0C0]" />
            <h2 className="text-xl font-semibold bg-[#000000]">Settings</h2>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-xl border bg-[#000000] bg-[#000000] px-4 py-3 text-left transition hover:border-[#C0C0C0]"
            >
              <div>
                <p className="font-medium bg-[#000000]">Dark mode</p>
                <p className="text-sm bg-[#000000]">{theme === 'dark' ? 'Enabled' : 'Disabled'}</p>
              </div>
              <span className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${theme === 'dark' ? 'bg-[#000000]' : 'bg-[#000000]'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-[#000000] transition ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleSetting('notifications')}
              className="flex w-full items-center justify-between rounded-xl border bg-[#000000] bg-[#000000] px-4 py-3 text-left transition hover:border-[#C0C0C0]"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-[#C0C0C0]" />
                <div>
                  <p className="font-medium bg-[#000000]">Notifications</p>
                  <p className="text-sm bg-[#000000]">Study reminders and alerts</p>
                </div>
              </div>
              <span className={`inline-flex h-6 w-11 items-center rounded-full transition ${settings.notifications ? 'bg-[#000000]' : 'bg-[#000000]'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-[#000000] transition ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleSetting('weeklyDigest')}
              className="flex w-full items-center justify-between rounded-xl border bg-[#000000] bg-[#000000] px-4 py-3 text-left transition hover:border-[#C0C0C0]"
            >
              <div>
                <p className="font-medium bg-[#000000]">Weekly digest</p>
                <p className="text-sm bg-[#000000]">Summaries at the end of the week</p>
              </div>
              <span className={`inline-flex h-6 w-11 items-center rounded-full transition ${settings.weeklyDigest ? 'bg-[#000000]' : 'bg-[#000000]'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-[#000000] transition ${settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="button" variant="ghost" className="bg-[#000000] hover:bg-[#000000] hover:bg-[#000000]" onClick={() => navigate('/')}>
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
