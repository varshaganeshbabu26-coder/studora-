import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw, Settings2, Timer } from 'lucide-react'
import GlassCard from './GlassCard'
import Button from './Button'
import { slugifySubject } from '../data/subjectStorage'

const DEFAULT_SETTINGS = { focusMinutes: 25, breakMinutes: 5 }
const MIN_MINUTES = 1
const MAX_MINUTES = 180

function getSettings(subjectName) {
  try {
    const savedSettings = window.localStorage.getItem(`studora-pomodoro-${slugifySubject(subjectName)}`)
    if (!savedSettings) return DEFAULT_SETTINGS

    const parsedSettings = JSON.parse(savedSettings)
    return {
      focusMinutes: isValidMinutes(parsedSettings.focusMinutes) ? parsedSettings.focusMinutes : DEFAULT_SETTINGS.focusMinutes,
      breakMinutes: isValidMinutes(parsedSettings.breakMinutes) ? parsedSettings.breakMinutes : DEFAULT_SETTINGS.breakMinutes,
    }
  } catch (error) {
    console.error('Could not load Pomodoro settings:', error)
    return DEFAULT_SETTINGS
  }
}

function isValidMinutes(value) {
  return Number.isInteger(value) && value >= MIN_MINUTES && value <= MAX_MINUTES
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

export default function SubjectPomodoro({ subjectName }) {
  const [settings, setSettings] = useState(() => getSettings(subjectName))
  const [draftSettings, setDraftSettings] = useState(() => getSettings(subjectName))
  const [mode, setMode] = useState('focus')
  const [secondsLeft, setSecondsLeft] = useState(() => getSettings(subjectName).focusMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [notice, setNotice] = useState('')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    if (secondsLeft !== 0 || !isRunning) return

    const nextMode = mode === 'focus' ? 'break' : 'focus'
    setMode(nextMode)
    setIsRunning(false)
    setSecondsLeft(settings[`${nextMode}Minutes`] * 60)
    setNotice(mode === 'focus' ? 'Focus session complete. Time for a break!' : 'Break complete. Ready for another focus session?')
  }, [isRunning, mode, secondsLeft, settings])

  const totalSeconds = settings[`${mode}Minutes`] * 60
  const progress = 1 - secondsLeft / totalSeconds
  const circumference = 2 * Math.PI * 48

  function resetTimer() {
    setIsRunning(false)
    setSecondsLeft(settings[`${mode}Minutes`] * 60)
    setNotice('')
  }

  function handleSettingsSubmit(event) {
    event.preventDefault()
    const focusMinutes = Number(draftSettings.focusMinutes)
    const breakMinutes = Number(draftSettings.breakMinutes)

    if (!isValidMinutes(focusMinutes) || !isValidMinutes(breakMinutes)) {
      setSaveError(`Choose a duration from ${MIN_MINUTES} to ${MAX_MINUTES} minutes.`)
      return
    }

    const nextSettings = { focusMinutes, breakMinutes }
    try {
      window.localStorage.setItem(`studora-pomodoro-${slugifySubject(subjectName)}`, JSON.stringify(nextSettings))
    } catch (error) {
      console.error('Could not save Pomodoro settings:', error)
      setSaveError('Timer settings could not be saved on this device.')
      return
    }

    setSettings(nextSettings)
    setDraftSettings(nextSettings)
    setMode('focus')
    setIsRunning(false)
    setSecondsLeft(focusMinutes * 60)
    setNotice('')
    setSaveError('')
    setShowSettings(false)
  }

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-pink-500">Focus timer</h2>
          <p className="mt-1 text-xs text-gray-500">Pomodoro · {subjectName}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setDraftSettings(settings)
            setSaveError('')
            setShowSettings((visible) => !visible)
          }}
          className="rounded-full bg-white/60 p-2 text-gray-600 transition hover:bg-white/90"
          aria-label={showSettings ? 'Close timer settings' : 'Customize timer'}
          aria-expanded={showSettings}
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="3" />
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#f472b6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-[stroke-dashoffset] duration-500"
            />
          </svg>
          <div className="text-center">
            <Timer className="mx-auto h-5 w-5 text-pink-500" aria-hidden="true" />
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {mode === 'focus' ? 'Focus' : 'Break'}
            </p>
            <p className="text-4xl font-bold tabular-nums text-gray-800" role="timer" aria-live="off">
              {formatTime(secondsLeft)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button type="button" onClick={() => { setNotice(''); setIsRunning((running) => !running) }}>
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? 'Pause' : mode === 'focus' ? 'Start focus' : 'Start break'}
          </Button>
          <Button type="button" variant="outline" onClick={resetTimer} aria-label="Reset timer">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Focus {settings.focusMinutes} min · Break {settings.breakMinutes} min
        </p>
      </div>

      {notice && <p className="mt-4 text-center text-sm font-medium text-pink-600" role="status">{notice}</p>}

      {showSettings && (
        <form onSubmit={handleSettingsSubmit} className="mt-5 space-y-3 border-t border-white/50 pt-4">
          <label className="block text-sm font-medium text-gray-700">
            Focus minutes
            <input
              type="number"
              min={MIN_MINUTES}
              max={MAX_MINUTES}
              step="1"
              required
              value={draftSettings.focusMinutes}
              onChange={(event) => setDraftSettings((current) => ({ ...current, focusMinutes: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/50 bg-white/60 px-3 py-2 text-gray-700 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Break minutes
            <input
              type="number"
              min={MIN_MINUTES}
              max={MAX_MINUTES}
              step="1"
              required
              value={draftSettings.breakMinutes}
              onChange={(event) => setDraftSettings((current) => ({ ...current, breakMinutes: event.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/50 bg-white/60 px-3 py-2 text-gray-700 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            />
          </label>
          {saveError && <p className="text-sm font-medium text-red-600" role="alert">{saveError}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setShowSettings(false)}>Cancel</Button>
            <Button type="submit">Save timer</Button>
          </div>
        </form>
      )}

    </GlassCard>
  )
}
