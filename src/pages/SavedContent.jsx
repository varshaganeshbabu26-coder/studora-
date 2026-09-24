import { useMemo, useState } from 'react'
import { BookOpen, MessageSquareText, NotebookText, Plus, Trash2 } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import mockSaved from '../data/mockSaved'

const filterLabels = {
  all: 'All',
  note: 'Note',
  quiz: 'Quiz',
  chat: 'Chat',
}

const typeStyles = {
  note: 'bg-[#000000] bg-[#000000] bg-[#000000]',
  quiz: 'bg-[#000000] bg-[#000000] bg-[#000000]',
  chat: 'bg-[#000000] bg-[#000000] bg-[#000000]',
}

const typeIcons = {
  note: NotebookText,
  quiz: BookOpen,
  chat: MessageSquareText,
}

export default function SavedContent() {
  // TODO: Replace local saved-item state with backend storage for note, quiz, and chat saves.
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(mockSaved)

  const visibleItems = useMemo(() => {
    return filter === 'all' ? items : items.filter((item) => item.type === filter)
  }, [filter, items])

  const removeItem = (itemId) => {
    setItems((current) => current.filter((item) => item.title !== itemId))
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">Library</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight bg-[#000000] sm:text-4xl">Saved Content</h1>
        </div>

        <div className="inline-flex rounded-xl border bg-[#000000] bg-[#000000] p-1">
          {Object.entries(filterLabels).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${filter === value ? 'bg-[#000000] text-[#C0C0C0]' : 'bg-[#000000] hover:bg-[#000000]'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <Card className="border-dashed border-[#C0C0C0] bg-[#000000] p-8 text-center bg-[#000000]">
          No saved items in this category yet.
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => {
            const Icon = typeIcons[item.type] || BookOpen

            return (
              <Card key={`${item.type}-${item.title}-${item.savedAt}`} className="border-[#C0C0C0] bg-[#000000] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className={`rounded-2xl border p-3 ${typeStyles[item.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-[#C0C0C0] font-semibold uppercase tracking-[0.16em] ${typeStyles[item.type]}`}>
                    {filterLabels[item.type]}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-[#C0C0C0] font-semibold uppercase tracking-[0.18em] bg-[#000000]">{item.subject}</p>
                  <h2 className="mt-2 text-xl font-semibold bg-[#000000]">{item.title}</h2>
                </div>

                <p className="mt-4 text-sm bg-[#000000]">
                  Saved {new Date(item.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button type="button" variant="outline" className="flex-1">
                    <Plus className="h-4 w-4" /> Open
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 bg-[#000000] hover:bg-[#000000] hover:bg-[#000000]"
                    onClick={() => removeItem(item.title)}
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}
