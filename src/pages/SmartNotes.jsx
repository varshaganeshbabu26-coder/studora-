import { FilePlus2, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Modal from '../components/Modal'
import mockNotes from '../data/mockNotes'

const emptyNote = {
  title: '',
  subject: 'Biology',
  content: '',
  createdAt: '',
  tags: [],
}

const subjectVariants = {
  Biology: 'success',
  Calculus: 'primary',
  'World History': 'warning',
  'Organic Chemistry': 'danger',
  Spanish: 'default',
  Physics: 'primary',
}

function formatDate(dateString) {
  if (!dateString) return 'Just now'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString))
}

export default function SmartNotes() {
  const [notes, setNotes] = useState(mockNotes)
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All subjects')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [draft, setDraft] = useState(emptyNote)
  const [formError, setFormError] = useState('')

  const subjects = ['All subjects', ...new Set(notes.map((note) => note.subject))]
  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase()
    return notes.filter((note) => {
      const matchesSubject = subjectFilter === 'All subjects' || note.subject === subjectFilter
      const searchableText = `${note.title} ${note.subject} ${note.content} ${note.tags.join(' ')}`.toLowerCase()
      return matchesSubject && (!query || searchableText.includes(query))
    })
  }, [notes, search, subjectFilter])

  function openNewNote() {
    setEditingNote(null)
    setDraft({ ...emptyNote })
    setFormError('')
    setModalOpen(true)
  }

  function openNote(note) {
    setEditingNote(note)
    setDraft({ ...note })
    setFormError('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setFormError('')
  }

  function saveNote(event) {
    event.preventDefault()
    if (!draft.title.trim() || !draft.content.trim()) {
      setFormError('Add a title and some note content before saving.')
      return
    }

    const noteToSave = {
      ...draft,
      title: draft.title.trim(),
      content: draft.content.trim(),
      createdAt: draft.createdAt || new Date().toISOString(),
    }

    if (editingNote) {
      setNotes((current) => current.map((note) => (note === editingNote ? noteToSave : note)))
    } else {
      setNotes((current) => [noteToSave, ...current])
    }
    closeModal()
  }

  function deleteNote() {
    if (!editingNote) return
    setNotes((current) => current.filter((note) => note !== editingNote))
    closeModal()
  }

  return (
    <section className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] bg-[#000000] dark:bg-[#000000]">Your knowledge base</p><h1 className="mt-2 text-3xl font-bold tracking-tight bg-[#000000] dark:bg-[#000000]">Smart Notes</h1><p className="mt-2 bg-[#000000] dark:bg-[#000000]">Capture the ideas worth coming back to.</p></div>
        <Button onClick={openNewNote}><Plus className="h-4 w-4" />New note</Button>
      </header>

      <Card className="border-[#C0C0C0] bg-[#000000] p-4 sm:p-5"><div className="flex flex-col gap-3 lg:flex-row"><div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C0C0C0]" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notes, subjects, or tags..." aria-label="Search notes" className="w-full rounded-xl border border-[#C0C0C0] bg-[#000000] py-3 pl-10 pr-4 text-sm bg-[#000000] outline-none transition focus:ring-2 focus:ring-[#C0C0C0]" /></div><select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} aria-label="Filter notes by subject" className="rounded-xl border border-[#C0C0C0] bg-[#000000] px-4 py-3 text-sm font-medium bg-[#000000] outline-none focus:ring-2 focus:ring-[#C0C0C0]">{subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></div><p className="mt-3 text-xs bg-[#000000]">Showing {filteredNotes.length} of {notes.length} notes</p></Card>

      {filteredNotes.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredNotes.map((note) => <Card as="button" type="button" key={`${note.title}-${note.createdAt}`} onClick={() => openNote(note)} className="group flex h-full flex-col border-[#C0C0C0] bg-[#000000] text-left transition hover:-translate-y-0.5 hover:bg-[#000000] hover:text-[#C0C0C0]"><div className="flex items-start justify-between gap-3"><div className="rounded-xl bg-[#000000] p-2.5 text-[#C0C0C0]"><FilePlus2 className="h-5 w-5" /></div><Badge variant={subjectVariants[note.subject] || 'default'}>{note.subject}</Badge></div><h2 className="mt-5 line-clamp-2 text-lg font-bold bg-[#000000] group-hover:text-[#C0C0C0]">{note.title}</h2><p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 bg-[#000000] group-hover:text-[#C0C0C0]">{note.content || 'No content added yet.'}</p><div className="mt-5 flex items-center justify-between border-t border-[#C0C0C0] pt-4 text-xs bg-[#000000] group-hover:text-[#C0C0C0]"><span>{formatDate(note.createdAt)}</span><span className="font-semibold text-[#C0C0C0] opacity-0 transition group-hover:text-[#C0C0C0] group-hover:opacity-100">Open note</span></div></Card>)}</div> : <Card className="flex flex-col items-center justify-center border-[#C0C0C0] bg-[#000000] px-6 py-16 text-center"><div className="rounded-2xl bg-[#000000] p-4 text-[#C0C0C0]"><Search className="h-7 w-7" /></div><h2 className="mt-5 text-xl font-bold bg-[#000000]">No notes found</h2><p className="mt-2 max-w-sm text-sm bg-[#000000]">Try another keyword or subject, or create a fresh note for this topic.</p><Button onClick={openNewNote} variant="outline" className="mt-6"><Plus className="h-4 w-4" />New note</Button></Card>}

      <Modal open={modalOpen} onClose={closeModal} title={editingNote ? 'Edit note' : 'New note'}>
        <form onSubmit={saveNote} className="space-y-5">
          <Input label="Title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="e.g. Photosynthesis review" required />
          <div className="space-y-2"><label htmlFor="note-subject" className="block text-sm font-semibold bg-[#000000]">Subject</label><select id="note-subject" value={draft.subject} onChange={(event) => setDraft({ ...draft, subject: event.target.value })} className="w-full rounded-xl border border-[#C0C0C0] bg-[#000000] px-4 py-3 text-sm bg-[#000000] outline-none focus:ring-2 focus:ring-[#C0C0C0]">{subjects.filter((subject) => subject !== 'All subjects').map((subject) => <option key={subject}>{subject}</option>)}</select></div>
          <div className="space-y-2"><label htmlFor="note-content" className="block text-sm font-semibold bg-[#000000]">Content <span className="text-[#C0C0C0]">*</span></label><textarea id="note-content" value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} rows="7" placeholder="Write down the idea you want to remember..." className="w-full resize-y rounded-xl border border-[#C0C0C0] bg-[#000000] px-4 py-3 text-sm leading-6 bg-[#000000] outline-none placeholder:bg-[#000000] focus:ring-2 focus:ring-[#C0C0C0]" required /></div>
          {formError && <p className="rounded-xl bg-[#000000] px-4 py-3 text-sm font-medium text-[#C0C0C0]" role="alert">{formError}</p>}
          <div className="flex flex-col-reverse gap-3 border-t border-[#C0C0C0] pt-5 sm:flex-row sm:items-center sm:justify-between">{editingNote ? <Button type="button" variant="ghost" className="self-start" onClick={deleteNote}><Trash2 className="h-4 w-4" />Delete</Button> : <span />}<div className="flex gap-3"><Button type="button" variant="outline" onClick={closeModal}>Cancel</Button><Button type="submit"><Pencil className="h-4 w-4" />Save note</Button></div></div>
        </form>
      </Modal>
    </section>
  )
}
