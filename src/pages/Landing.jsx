import { ArrowRight, BookOpen, CalendarCheck, MessageCircle, Sparkles, Target, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

const features = [
  {
    icon: MessageCircle,
    title: 'AI Tutor',
    description: 'Ask questions in plain language and get patient, step-by-step explanations whenever you are stuck.',
    accent: 'bg-[#000000] text-[#C0C0C0]',
  },
  {
    icon: BookOpen,
    title: 'Smart Notes',
    description: 'Turn scattered ideas into focused study notes that are easy to revisit before your next exam.',
    accent: 'bg-[#000000] text-[#C0C0C0]',
  },
  {
    icon: Zap,
    title: 'AI Quiz',
    description: 'Build confidence with practice questions tuned to your subjects, progress, and weak spots.',
    accent: 'bg-[#000000] text-[#C0C0C0]',
  },
  {
    icon: CalendarCheck,
    title: 'Study Planner',
    description: 'Break ambitious goals into realistic daily tasks and keep your momentum visible.',
    accent: 'bg-[#000000] text-[#C0C0C0]',
  },
]

export default function Landing() {
  return (
    <main>
      <section className="relative overflow-hidden border-b bg-[#000000] dark:bg-[#000000]">
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C0C0C0] bg-[#000000] px-3 py-1.5 text-sm font-semibold text-[#C0C0C0] shadow-sm">
              <Sparkles className="h-4 w-4" />
              A clearer way to learn
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-[#000000] sm:text-6xl lg:text-7xl dark:bg-[#000000]">
              Make every study session count.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 bg-[#000000] sm:text-xl dark:bg-[#000000]">
              Studora brings your tutor, notes, quizzes, and plan into one calm workspace built around the way you learn.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button as={Link} to="/register" size="lg">
                Start learning free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button as={Link} to="/login" variant="outline" size="lg">
                Log in to your workspace
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium bg-[#000000] dark:bg-[#000000]">
              <span className="inline-flex items-center gap-2"><Target className="h-4 w-4 text-[#C0C0C0]" />Personalized practice</span>
              <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#C0C0C0]" />Built for focus</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#000000] blur-2xl" />
            <Card className="relative overflow-hidden bg-[#000000] p-0 dark:bg-[#000000]">
              <div className="bg-[#000000] px-6 py-5 bg-[#000000] dark:bg-[#000000]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">Today\'s focus</p>
                    <h2 className="mt-2 text-2xl font-bold">Build your rhythm</h2>
                  </div>
                  <div className="rounded-2xl bg-[#000000] p-3 text-[#C0C0C0]"><Sparkles className="h-6 w-6" /></div>
                </div>
              </div>
              <div className="space-y-4 bg-[#000000] p-6 dark:bg-[#000000]">
                <div className="rounded-xl border border-[#C0C0C0] bg-[#000000] p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-[#C0C0C0]"><span>Study streak</span><span>7 days</span></div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#000000]"><div className="h-full w-4/5 rounded-full bg-[#000000]" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-[#000000] p-4 dark:bg-[#000000]"><p className="text-sm bg-[#000000] dark:bg-[#000000]">Quiz average</p><p className="mt-2 text-2xl font-bold bg-[#000000] dark:bg-[#000000]">86%</p></div>
                  <div className="rounded-xl border bg-[#000000] p-4 dark:bg-[#000000]"><p className="text-sm bg-[#000000] dark:bg-[#000000]">Tasks done</p><p className="mt-2 text-2xl font-bold bg-[#000000] dark:bg-[#000000]">12/16</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-[#000000] p-4"><div className="rounded-lg bg-[#000000] p-2 text-[#C0C0C0]"><BookOpen className="h-5 w-5" /></div><div><p className="text-sm font-semibold bg-[#000000]">Review cellular respiration</p><p className="mt-1 text-xs bg-[#000000]">Biology Â· 20 minutes</p></div></div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C0C0C0]">Everything in one place</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight bg-[#000000] sm:text-4xl dark:bg-[#000000]">A study system that adapts with you.</h2>
          <p className="mt-4 text-lg leading-8 bg-[#000000] dark:bg-[#000000]">Less time organizing your work. More time understanding it.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, accent }) => (
            <Card key={title} className="p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className={`inline-flex rounded-xl p-3 ${accent}`}><Icon className="h-6 w-6" /></div>
              <h3 className="mt-5 text-lg font-bold bg-[#000000] dark:bg-[#000000]">{title}</h3>
              <p className="mt-2 text-sm leading-6 bg-[#000000] dark:bg-[#000000]">{description}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
