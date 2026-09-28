import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, CheckCircle2, Circle, MapPin, Trophy, Flame, Clock3 } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'
import IslandNode from '../components/IslandNode'
import WorldMap from '../components/WorldMap'
import SceneBackground from '../components/SceneBackground'
import { FloatingTopNav, FloatingDockNav } from '../components/FloatingNav'
import mockSubjects from '../data/mockSubjects'
import mockTasks from '../data/mockTasks'
import { getCountryById } from '../data/countries'

const stats = [
  { label: 'Progress', value: '68%', icon: Trophy },
  { label: 'Streak', value: '7 days', icon: Flame },
  { label: 'Study', value: '12.5 hrs', icon: Clock3 },
]

function generateMotivation(tasks, todayTasks, currentSubject, streakDays) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const todayTotal = todayTasks.length
  const todayCompleted = todayTasks.filter((t) => t.completed).length
  const todayRemaining = todayTotal - todayCompleted
  const progress = currentSubject.progress

  // Daily goal completed
  if (todayTotal > 0 && todayCompleted === todayTotal) {
    return "You did it! Today's study goal is complete 🎉"
  }

  // Strong streak
  if (streakDays >= 7) {
    return `${streakDays} days strong! Your consistency is building a great habit 🔥`
  }

  // Tasks almost done
  if (todayRemaining > 0 && todayRemaining <= 2 && todayCompleted > 0) {
    return `You're close to finishing today's goals. One more push! 💪`
  }

  // Low progress — encouraging start
  if (progress < 30 && completedTasks < 3) {
    return 'No pressure—start with one small task and build from there 🌱'
  }

  // Good progress
  if (progress >= 70) {
    return `Amazing! You're ${progress}% through ${currentSubject.name}. Keep soaring! ✨`
  }

  // Default motivational
  const defaults = [
    'Every task you complete is a step forward! 🚀',
    'Your future self will thank you for studying today! 🌟',
    'Small progress is still progress. Keep going! 🌈',
    'You are building something great, one task at a time! 🏗️',
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export default function Dashboard() {
  const [tasks, setTasks] = useState(mockTasks)
  const currentSubject = mockSubjects[0]
  const currentCountry = getCountryById(currentSubject.country)
  const todayTasks = tasks.filter((t) => t.dueDate === '2026-09-28')
  const visitedCountries = mockSubjects.map((s) => s.country)
  const stamps = mockSubjects.flatMap((s) => s.stamps)
  const streakDays = 7

  const motivationMessage = useMemo(
    () => generateMotivation(tasks, todayTasks, currentSubject, streakDays),
    [tasks, todayTasks, currentSubject, streakDays]
  )

  function toggleTask(taskId) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    )
  }

  return (
    <SceneBackground>
      <FloatingTopNav />
      <FloatingDockNav />

      {/* Floating Bunny + Motivation — between nav and Journey card */}
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 pt-24 md:pt-28">
        <div className="bunny-float-wrapper flex items-center gap-4">
          <BunnyAvatar size="xl" mood="happy" />
          <p className="max-w-[200px] rounded-2xl border border-white/40 bg-white/70 px-4 py-2 text-sm font-semibold text-pink-600 shadow-md backdrop-blur-md">
            {motivationMessage}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-4">
        {/* Hero Section */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left: Greeting + Current Quest */}
          <div className="space-y-6">
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">Your journey</p>
                  <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                    Hey, <span className="text-gradient">Alex</span>
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Your bunny is exploring <strong>{currentCountry.name}</strong> — {currentCountry.landmark} awaits!
                  </p>
                </div>
              </div>

              {/* Current Quest */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-pink-50 to-lavender-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-pink-500">Current quest</p>
                    <h2 className="mt-1 text-lg font-bold">{currentSubject.name}</h2>
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-pink-600">
                    {currentSubject.progress}%
                  </span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-700"
                    style={{ width: `${currentSubject.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {currentSubject.completedTasks} of {tasks.filter((t) => t.subject === currentSubject.name).length} tasks completed
                </p>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-2xl bg-white/50 p-3 text-center">
                    <Icon className="mx-auto h-5 w-5 text-pink-400" />
                    <p className="mt-1 text-lg font-bold">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>

              {/* Quick Ask AI */}
              <Link
                to="/app/tutor"
                className="btn-primary mt-6 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Sparkles className="h-4 w-4" />
                Ask AI Tutor
              </Link>
            </GlassCard>

            {/* Today's Plan */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold">Today's Plan</h2>
              <div className="mt-4 space-y-3">
                {todayTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="flex w-full items-center gap-3 rounded-xl bg-white/50 p-3 text-left transition hover:bg-white/80"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-gray-400" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500">{task.subject}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      task.priority === 'high' ? 'bg-red-100 text-red-600' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {task.priority}
                    </span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right: Island + Toolbox + Map */}
          <div className="space-y-6">
            {/* Current Island */}
            <GlassCard className="flex flex-col items-center p-6">
              <IslandNode
                country={currentCountry}
                progress={currentSubject.progress}
                isActive
                size="lg"
              />
              <h3 className="mt-4 text-lg font-bold">{currentCountry.name}</h3>
              <p className="text-sm text-gray-500">{currentCountry.landmark}</p>
              <p className="mt-1 text-xs text-gray-400">{currentCountry.description}</p>
            </GlassCard>

            {/* Subject Toolbox */}
            <GlassCard className="p-4">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-pink-500">Your Subjects</h3>
              <div className="grid grid-cols-3 gap-2">
                {mockSubjects.map((subject) => {
                  const country = getCountryById(subject.country)
                  return (
                    <Link
                      key={subject.name}
                      to={`/app/subjects`}
                      className="flex flex-col items-center gap-1 rounded-xl p-2 transition hover:bg-white/60"
                    >
                      <span className="text-2xl" role="img" aria-label={country.name}>
                        {country.flag}
                      </span>
                      <span className="text-xs font-medium text-gray-600 truncate w-full text-center">
                        {subject.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </GlassCard>

            {/* Mini World Map */}
            <WorldMap visitedCountries={visitedCountries} stamps={stamps} />
          </div>
        </div>

        {/* Scroll hint */}
        <p className="mt-8 text-center text-sm text-gray-400">
          <MapPin className="mr-1 inline h-4 w-4" />
          Scroll to explore your study world
        </p>
      </div>
    </SceneBackground>
  )
}
