import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Sparkles, CheckCircle2, Circle, Volume2, VolumeX, Play, Maximize, MapPin } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'
import BunnyTraveler from '../components/BunnyTraveler'
import CinematicScene from '../components/CinematicScene'
import TimelineScrubber from '../components/TimelineScrubber'
import TaskStopCard from '../components/TaskStopCard'
import StampCelebration from '../components/StampCelebration'
import CountryPicker from '../components/CountryPicker'
import { FloatingTopNav, FloatingDockNav } from '../components/FloatingNav'
import Badge from '../components/Badge'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import mockSubjects from '../data/mockSubjects'
import mockTasks from '../data/mockTasks'
import { getCountryById } from '../data/countries'

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function SubjectDetail() {
  const { id } = useParams()
  const [tasks, setTasks] = useState(mockTasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [showStampCelebration, setShowStampCelebration] = useState(false)
  const [currentStop, setCurrentStop] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isWalking, setIsWalking] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bunnyMood, setBunnyMood] = useState('idle')
  const [speechBubble, setSpeechBubble] = useState(null)
  const [postcards, setPostcards] = useState([])
  const playIntervalRef = useRef(null)

  const subject = useMemo(() => {
    return mockSubjects.find((item) => slugify(item.name) === id)
  }, [id])

  const country = subject ? getCountryById(subject.country) : null
  const stops = country?.stops || []

  const subjectTasks = useMemo(() => {
    if (!subject) return []
    return tasks.filter((t) => t.subject === subject.name)
  }, [tasks, subject])

  const completedCount = subjectTasks.filter((t) => t.completed).length
  const totalCount = subjectTasks.length
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const isCompleted = totalCount > 0 && completedCount === totalCount

  const nextTask = subjectTasks.find((t) => !t.completed)

  // Sync currentStop with completedCount
  useEffect(() => {
    if (completedCount > 0 && completedCount <= stops.length) {
      setCurrentStop(completedCount - 1)
    }
  }, [completedCount, stops.length])

  const triggerTravelTransition = useCallback((newStopIndex) => {
    if (newStopIndex === currentStop) return
    setIsTransitioning(true)
    setIsWalking(true)
    setBunnyMood('happy')

    setTimeout(() => {
      setCurrentStop(newStopIndex)
      setSpeechBubble(`Stop ${newStopIndex + 1}: ${stops[newStopIndex]?.title || 'New place'}!`)
    }, 800)

    setTimeout(() => {
      setIsTransitioning(false)
      setIsWalking(false)
      setBunnyMood('idle')
    }, 2000)

    setTimeout(() => {
      setSpeechBubble(null)
    }, 4000)
  }, [currentStop, stops])

  function toggleTask(taskId) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newCompleted = !t.completed
          if (newCompleted) {
            const newCompletedCount = subjectTasks.filter((task) => task.completed).length + 1
            if (newCompletedCount <= stops.length) {
              setTimeout(() => triggerTravelTransition(newCompletedCount - 1), 100)
            }
            // Check milestone (every 5th task)
            if (newCompletedCount % 5 === 0) {
              const souvenir = country?.souvenirs?.[Math.floor(newCompletedCount / 5) - 1] || '🏅'
              setPostcards((prev) => [...prev, { stop: newCompletedCount, souvenir, fact: country?.fact }])
            }
            // Check if all done
            const updatedTasks = prev.map((task) =>
              task.id === taskId ? { ...task, completed: true } : task
            )
            const allDone = updatedTasks
              .filter((task) => task.subject === subject?.name)
              .every((task) => task.completed)
            if (allDone) {
              setTimeout(() => setShowStampCelebration(true), 2500)
            }
          }
          return { ...t, completed: newCompleted }
        }
        return t
      })
    )
  }

  function handleChangeCountry(newCountryId) {
    setShowCountryPicker(false)
  }

  function handlePlayJourney() {
    if (isPlaying) {
      clearInterval(playIntervalRef.current)
      setIsPlaying(false)
      return
    }
    setIsPlaying(true)
    let stopIndex = 0
    playIntervalRef.current = setInterval(() => {
      if (stopIndex < stops.length) {
        triggerTravelTransition(stopIndex)
        stopIndex++
      } else {
        clearInterval(playIntervalRef.current)
        setIsPlaying(false)
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current)
    }
  }, [])

  if (!subject || !country) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
        <FloatingTopNav />
        <FloatingDockNav />
        <div className="mx-auto max-w-4xl px-4 pb-24 pt-24 md:pt-28">
          <GlassCard className="p-8 text-center">
            <BunnyAvatar size="lg" className="mx-auto" />
            <h2 className="mt-4 text-xl font-bold text-gray-700">Destination not found</h2>
            <p className="mt-2 text-gray-500">This trip hasn't been planned yet.</p>
            <Link to="/app/subjects" className="btn-primary mt-4 inline-block">
              Back to trips
            </Link>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cinematic Background — full page */}
      <div className="fixed inset-0 z-0">
        <CinematicScene
          country={country}
          stopIndex={currentStop}
          isTransitioning={isTransitioning}
        />
      </div>

      {/* Bunny Traveler */}
      <BunnyTraveler
        position={10 + (currentStop / Math.max(stops.length - 1, 1)) * 60}
        mood={bunnyMood}
        isWalking={isWalking}
        className="z-10"
      />

      {/* Speech bubble */}
      {speechBubble && (
        <div className="fixed bottom-32 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-white/50 bg-white/90 px-4 py-2 text-sm font-semibold text-pink-600 shadow-lg backdrop-blur-md" aria-live="polite">
          {speechBubble}
        </div>
      )}

      {/* Top Nav */}
      <FloatingTopNav />
      <FloatingDockNav />

      {/* Place caption chip — top left */}
      <div className="fixed left-4 top-20 z-30 md:left-8">
        <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-4 py-2 shadow-lg backdrop-blur-md">
          <span className="text-xl">{country.flag}</span>
          <div>
            <p className="text-xs font-bold text-gray-800">{stops[currentStop]?.title || country.landmark}</p>
            <p className="text-[10px] text-gray-500">Stop {currentStop + 1} of {stops.length}</p>
          </div>
        </div>
      </div>

      {/* Controls — top right */}
      <div className="fixed right-4 top-20 z-30 flex gap-2 md:right-8">
        <button
          type="button"
          onClick={() => setSoundOn(!soundOn)}
          className="rounded-full border border-white/40 bg-white/70 p-2.5 text-gray-600 shadow-lg backdrop-blur-md transition hover:bg-white/90"
          aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
        >
          {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={handlePlayJourney}
          className="rounded-full border border-white/40 bg-white/70 p-2.5 text-gray-600 shadow-lg backdrop-blur-md transition hover:bg-white/90"
          aria-label={isPlaying ? 'Pause journey' : 'Play journey'}
        >
          {isPlaying ? <div className="h-4 w-4 rounded-sm bg-current" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else {
              document.documentElement.requestFullscreen()
            }
          }}
          className="rounded-full border border-white/40 bg-white/70 p-2.5 text-gray-600 shadow-lg backdrop-blur-md transition hover:bg-white/90"
          aria-label="Toggle fullscreen"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>

      {/* Main Content — full page overlay */}
      <div className="fixed inset-0 z-20 overflow-y-auto">
       <div className="mx-auto flex min-h-full max-w-7xl flex-col px-4 pb-24 pt-24 md:pt-28">
        <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main: Trail + Tasks */}
          <div className="space-y-6">
            {/* Subject Header */}
            <GlassCard className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                    style={{ background: `linear-gradient(135deg, ${country.colors.primary}40, ${country.colors.secondary}60)` }}
                  >
                    {country.flag}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">Trip journey</p>
                    <h1 className="text-2xl font-bold text-gray-800">{subject.name}</h1>
                    <p className="text-sm text-gray-500">{country.name} · {country.landmark}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isCompleted ? 'warning' : 'primary'}>
                    {isCompleted ? '🏅 Stamped!' : `${progress}%`}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => setShowCountryPicker(true)}>
                    Change country
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={progress} label="Trip progress" />
              </div>
            </GlassCard>

            {/* Timeline Scrubber */}
            <GlassCard className="p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-pink-500">Journey Timeline</h3>
              <TimelineScrubber
                stops={stops}
                currentStop={currentStop}
                onSelect={(index) => {
                  if (index <= completedCount - 1) {
                    triggerTravelTransition(index)
                  }
                }}
              />
            </GlassCard>

            {/* Task List */}
            <GlassCard className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Tasks</h2>
                <Badge variant="default">{completedCount} of {totalCount} done</Badge>
              </div>
              <div className="mt-4 space-y-2">
                {subjectTasks.map((task) => (
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
                      <p className="text-xs text-gray-500">{task.dueDate}</p>
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

          {/* Right Panel: Info + Tools */}
          <div className="space-y-4">
            {/* Current stop info */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-pink-500">Current Stop</h3>
              <div className="mt-3">
                <p className="text-lg font-bold text-gray-800">{stops[currentStop]?.title}</p>
                <p className="text-sm text-gray-500">{stops[currentStop]?.place}</p>
                <p className="mt-2 text-sm text-gray-600 italic">"{stops[currentStop]?.caption}"</p>
              </div>
              {stops[currentStop]?.wildlife && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/50 p-2">
                  <span className="text-2xl">{stops[currentStop].wildlife}</span>
                  <span className="text-xs text-gray-500">Wildlife spotted!</span>
                </div>
              )}
            </GlassCard>

            {/* Did you know */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-pink-500">Did you know?</h3>
              <p className="mt-2 text-sm text-gray-600">{country.fact}</p>
            </GlassCard>

            {/* Postcards */}
            {postcards.length > 0 && (
              <GlassCard className="p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-pink-500">Postcards</h3>
                <div className="mt-3 space-y-2">
                  {postcards.map((card, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-white/50 p-2">
                      <span className="text-2xl">{card.souvenir}</span>
                      <div>
                        <p className="text-xs font-bold text-gray-700">Stop {card.stop}</p>
                        <p className="text-[10px] text-gray-500">{card.fact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* AI Tools */}
            <GlassCard className="p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-pink-500">AI Tools</h3>
              <div className="space-y-2">
                <Link to="/app/tutor" className="btn-primary flex w-full items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" /> Ask AI about this place
                </Link>
                <Link to="/app/quiz" className="btn-secondary flex w-full items-center justify-center gap-2">
                  Quiz me
                </Link>
                <Link to="/app/notes" className="btn-secondary flex w-full items-center justify-center gap-2">
                  Smart Notes
                </Link>
              </div>
            </GlassCard>

            {/* Back button */}
            <Link to="/app/subjects" className="btn-secondary flex w-full items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to trips
            </Link>
          </div>
        </div>
       </div>
      </div>

      {/* Task Detail Modal */}
      <TaskStopCard
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onToggle={toggleTask}
        onEdit={(task) => setSelectedTask(task)}
        onDelete={(taskId) => {
          setTasks((prev) => prev.filter((t) => t.id !== taskId))
          setSelectedTask(null)
        }}
        onAskAI={() => {
          setSelectedTask(null)
        }}
      />

      {/* Country Picker */}
      <CountryPicker
        open={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={handleChangeCountry}
        currentCountryId={subject.country}
        title="Change destination"
      />

      {/* Stamp Celebration */}
      {showStampCelebration && (
        <StampCelebration
          country={country}
          onClose={() => setShowStampCelebration(false)}
        />
      )}
    </div>
  )
}
