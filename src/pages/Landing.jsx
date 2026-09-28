import { ArrowRight, BookOpen, CalendarCheck, MessageCircle, Sparkles, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'

const features = [
  {
    icon: MessageCircle,
    title: 'AI Tutor',
    description: 'Ask questions in plain language and get patient, step-by-step explanations whenever you are stuck.',
  },
  {
    icon: BookOpen,
    title: 'Smart Notes',
    description: 'Turn scattered ideas into focused study notes that are easy to revisit before your next exam.',
  },
  {
    icon: Zap,
    title: 'AI Quiz',
    description: 'Build confidence with practice questions tuned to your subjects, progress, and weak spots.',
  },
  {
    icon: CalendarCheck,
    title: 'Study Planner',
    description: 'Break ambitious goals into realistic daily tasks and keep your momentum visible.',
  },
]

export default function Landing() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-2 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-4 py-2 text-sm font-semibold text-pink-600 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            A clearer way to learn
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Make every study session count.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Study World brings your tutor, notes, quizzes, and plan into one calm workspace built around the way you learn.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-base">
              Start learning free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 text-base"
            >
              Log in to your workspace
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-500">
            <span className="inline-flex items-center gap-2">
              <Target className="h-4 w-4 text-pink-400" />
              Personalized practice
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-400" />
              Built for focus
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative mx-auto w-full max-w-md">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">Today's focus</p>
                <h2 className="mt-2 text-2xl font-bold">Build your rhythm</h2>
              </div>
              <BunnyAvatar size="lg" mood="happy" />
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/40 bg-white/50 p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
                  <span>Study streak</span>
                  <span className="text-pink-600">7 days</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/60">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/40 bg-white/50 p-4">
                  <p className="text-sm text-gray-500">Quiz average</p>
                  <p className="mt-2 text-2xl font-bold">86%</p>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/50 p-4">
                  <p className="text-sm text-gray-500">Tasks done</p>
                  <p className="mt-2 text-2xl font-bold">12/16</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 p-4">
                <div className="rounded-xl bg-pink-100 p-2 text-pink-500">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Review cellular respiration</p>
                  <p className="mt-1 text-xs text-gray-500">Biology · 20 minutes</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-2 py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wider text-pink-500">Everything in one place</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A study system that adapts with you.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Less time organizing your work. More time understanding it.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <GlassCard key={title} className="p-6 transition duration-200 hover:-translate-y-1">
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-pink-100 to-lavender-100 p-3 text-pink-500">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}
