import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  Lightbulb,
  ListChecks,
  Play,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'

const stats = [
  { label: 'Progress', value: '68%', icon: Trophy },
  { label: 'Streak', value: '7 days', icon: Flame },
  { label: 'Study', value: '12.5 hrs', icon: Clock3 },
]

const studyPlan = [
  { title: 'DSA', duration: '45 min', status: 'Pending', accent: 'bg-[#000000]' },
  { title: 'C++', duration: '30 min', status: 'Done', accent: 'bg-[#000000]' },
  { title: 'Quiz', duration: '15 min', status: 'Pending', accent: 'bg-[#000000]' },
]

export default function Dashboard() {
  return (
    <section className="mx-auto max-w-[90rem] space-y-8 px-1 py-1 bg-[#000000]">
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">Workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight bg-[#000000] sm:text-4xl">Good evening, Alex Student</h1>
        </div>
        <p className="text-sm bg-[#000000]">Ready to continue learning?</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-[#C0C0C0] bg-[#000000] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#C0C0C0] hover:shadow-none">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] bg-[#000000]">{label}</p>
                <p className="mt-3 text-3xl font-bold bg-[#000000]">{value}</p>
              </div>
              <div className="rounded-2xl bg-[#000000] p-3 text-[#C0C0C0] ring-1 ring-[#C0C0C0]">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-[#C0C0C0] bg-[#000000] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">Continue Learning</p>
            <h2 className="mt-2 text-2xl font-bold bg-[#000000]">Data Structures & Algorithms</h2>
          </div>
          <Button as={Link} to="/app/subjects" variant="ghost" size="sm">
            View course <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 rounded-2xl border border-[#C0C0C0] bg-[#000000] p-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-sm bg-[#000000]">
            <span>Progress</span>
            <span className="font-semibold text-[#C0C0C0]">72%</span>
          </div>
          <ProgressBar value={72} size="md" className="!space-y-2" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm bg-[#000000]">Next</p>
              <p className="font-medium bg-[#000000]">Linked Lists</p>
            </div>
            <Button as={Link} to="/app/tutor" className="bg-[#000000] text-[#C0C0C0] hover:bg-[#000000]">
              <Play className="h-4 w-4" /> Continue
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
        <Card className="border-[#C0C0C0] bg-[#000000] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold bg-[#000000]">Today's Study Plan</h2>
            <Button as={Link} to="/app/planner" variant="ghost" size="sm">
              Open planner <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {studyPlan.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#C0C0C0] bg-[#000000] p-4 shadow-none ring-1 ring-[#C0C0C0]">
                <div className="flex items-center justify-between gap-2">
                  <div className="rounded-xl bg-[#000000] p-2 text-[#C0C0C0] ring-1 ring-[#C0C0C0]">
                    {item.title === 'DSA' ? <BookOpen className="h-4 w-4" /> : item.title === 'C++' ? <BrainCircuit className="h-4 w-4" /> : <ListChecks className="h-4 w-4" />}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] bg-[#000000]">{item.duration}</span>
                </div>
                <p className="mt-4 text-lg font-semibold bg-[#000000]">{item.title}</p>
                <p className={`mt-3 text-sm ${item.status === 'Done' ? 'bg-[#000000]' : 'bg-[#000000]'}`}>
                  {item.status === 'Done' ? 'âœ“ Done' : 'â—‹ Pending'}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-[#C0C0C0] bg-[#000000] p-5 text-[#C0C0C0] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C0C0C0]">AI Recommendation</p>
              <h2 className="mt-2 text-xl font-bold">Practice session</h2>
            </div>
            <Lightbulb className="h-5 w-5" />
          </div>
          <p className="mt-5 text-sm leading-6 text-[#C0C0C0]">
            You are struggling with Linked Lists. Try this 15-minute practice session.
          </p>
          <Button as={Link} to="/app/tutor" variant="outline" size="sm" className="mt-6 border-black text-[#C0C0C0] hover:bg-[#000000] hover:text-[#C0C0C0]">
            Start Practice <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>

    </section>
  )
}
