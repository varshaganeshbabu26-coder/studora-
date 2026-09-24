import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Atom, BookOpen, Dna, FlaskConical, Globe2, Languages, Sigma } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import mockNotes from '../data/mockNotes'
import mockQuizzes from '../data/mockQuizzes'
import mockSubjects from '../data/mockSubjects'

const iconMap = {
  Biology: Dna,
  Calculus: Sigma,
  'World History': Globe2,
  'Organic Chemistry': FlaskConical,
  Spanish: Languages,
  Physics: Atom,
}

const accentStyles = {
  emerald: { badge: 'bg-[#000000] bg-[#000000] bg-[#000000]', accent: 'bg-[#000000]' },
  blue: { badge: 'bg-[#000000] bg-[#000000] bg-[#000000]', accent: 'bg-[#000000]' },
  amber: { badge: 'bg-[#000000] bg-[#000000] bg-[#000000]', accent: 'bg-[#000000]' },
  violet: { badge: 'bg-[#000000] bg-[#000000] bg-[#000000]', accent: 'bg-[#000000]' },
  rose: { badge: 'bg-[#000000] bg-[#000000] bg-[#000000]', accent: 'bg-[#000000]' },
  cyan: { badge: 'bg-[#000000] bg-[#000000] bg-[#000000]', accent: 'bg-[#000000]' },
}

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function SubjectDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('notes')

  const subject = useMemo(() => {
    return mockSubjects.find((item) => slugify(item.name) === id)
  }, [id])

  const relatedNotes = useMemo(() => {
    if (!subject) return []
    return mockNotes.filter((note) => note.subject === subject.name)
  }, [subject])

  const relatedQuizzes = useMemo(() => {
    if (!subject) return []
    return mockQuizzes.filter((quiz) => quiz.subject === subject.name)
  }, [subject])

  if (!subject) {
    return (
      <section className="mx-auto max-w-4xl">
        <Card className="border-dashed border-[#C0C0C0] bg-[#000000] p-8 text-center bg-[#000000]">
          Subject not found.
        </Card>
      </section>
    )
  }

  const Icon = iconMap[subject.name] || BookOpen
  const styles = accentStyles[subject.color] || accentStyles.violet

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-5">
        <Button as={Link} to="/app/subjects" variant="ghost" className="bg-[#000000] hover:bg-[#000000]">
          <ArrowLeft className="h-4 w-4" /> Back to subjects
        </Button>
      </div>

      <Card className="border-[#C0C0C0] bg-[#000000] p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className={`rounded-2xl border p-3 ${styles.badge}`}>
              <Icon className={`h-6 w-6 ${styles.accent}`} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C0C0C0]">Subject overview</p>
              <h1 className="mt-2 text-3xl font-bold bg-[#000000]">{subject.name}</h1>
            </div>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-lg">
            <div className="rounded-xl border bg-[#000000] bg-[#000000] p-3">
              <p className="text-[#C0C0C0] uppercase tracking-[0.14em] bg-[#000000]">Progress</p>
              <p className="mt-2 text-2xl font-bold bg-[#000000]">{subject.progress}%</p>
            </div>
            <div className="rounded-xl border bg-[#000000] bg-[#000000] p-3">
              <p className="text-[#C0C0C0] uppercase tracking-[0.14em] bg-[#000000]">Notes</p>
              <p className="mt-2 text-2xl font-bold bg-[#000000]">{relatedNotes.length}</p>
            </div>
            <div className="rounded-xl border bg-[#000000] bg-[#000000] p-3">
              <p className="text-[#C0C0C0] uppercase tracking-[0.14em] bg-[#000000]">Quizzes</p>
              <p className="mt-2 text-2xl font-bold bg-[#000000]">{relatedQuizzes.length}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar value={subject.progress} label="Subject progress" />
        </div>
      </Card>

      <div className="mt-6">
        <div className="inline-flex rounded-xl border bg-[#000000] bg-[#000000] p-1">
          <button
            type="button"
            onClick={() => setTab('notes')}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${tab === 'notes' ? 'bg-[#000000] text-[#C0C0C0]' : 'bg-[#000000] hover:bg-[#000000]'}`}
          >
            Notes
          </button>
          <button
            type="button"
            onClick={() => setTab('quizzes')}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${tab === 'quizzes' ? 'bg-[#000000] text-[#C0C0C0]' : 'bg-[#000000] hover:bg-[#000000]'}`}
          >
            Quizzes
          </button>
        </div>
      </div>

      <div className="mt-5">
        {tab === 'notes' ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedNotes.length === 0 ? (
              <Card className="border-dashed border-[#C0C0C0] bg-[#000000] p-6 bg-[#000000] md:col-span-2 xl:col-span-3">
                No notes for this subject yet.
              </Card>
            ) : (
              relatedNotes.map((note) => (
                <Card key={`${note.title}-${note.createdAt}`} className="border-[#C0C0C0] bg-[#000000] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="primary">{note.subject}</Badge>
                    <span className="text-[#C0C0C0] uppercase tracking-[0.16em] bg-[#000000]">
                      {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold bg-[#000000]">{note.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 bg-[#000000]">{note.content || 'No summary added yet.'}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-[#000000] px-2 py-1 text-[#C0C0C0] uppercase tracking-[0.12em] bg-[#000000]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedQuizzes.length === 0 ? (
              <Card className="border-dashed border-[#C0C0C0] bg-[#000000] p-6 bg-[#000000] md:col-span-2 xl:col-span-3">
                No quizzes for this subject yet.
              </Card>
            ) : (
              relatedQuizzes.map((quiz) => (
                <Card key={`${quiz.title}-${quiz.subject}`} className="border-[#C0C0C0] bg-[#000000] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="primary">{quiz.difficulty}</Badge>
                    <span className="text-[#C0C0C0] uppercase tracking-[0.16em] bg-[#000000]">{quiz.numberOfQuestions} Qs</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold bg-[#000000]">{quiz.title}</h3>
                  <p className="mt-3 text-sm bg-[#000000]">
                    {quiz.pastScore === null ? 'Not attempted yet' : `Past score: ${quiz.pastScore}%`}
                  </p>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}
