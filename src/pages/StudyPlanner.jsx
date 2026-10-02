import { useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import Modal from '../components/Modal'
import mockSubjects from '../data/mockSubjects'
import mockTasks from '../data/mockTasks'

const priorityStyles = {
  high: { label: 'High', dot: 'bg-red-500', chip: 'border border-red-100 bg-red-50 text-red-600' },
  medium: { label: 'Medium', dot: 'bg-amber-500', chip: 'border border-amber-100 bg-amber-50 text-amber-600' },
  low: { label: 'Low', dot: 'bg-green-500', chip: 'border border-green-100 bg-green-50 text-green-600' },
}

const subjectOptions = mockSubjects.map((subject) => subject.name)

const normalizeTasks = (items) =>
  items.map((task, index) => ({
    ...task,
    id: task.id ?? `${task.title}-${index}`,
  }))

const formatDateLabel = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`)
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const getRangeForCalendar = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const calendarDays = []

  for (let i = 0; i < 42; i += 1) {
    const dayOffset = i - firstDayIndex + 1
    const date = new Date(year, month, dayOffset)
    calendarDays.push(date)
  }

  return { year, month, calendarDays, daysInMonth }
}

export default function StudyPlanner() {
  // TODO: Replace local task state with API-backed CRUD and synced due-date scheduling.
  const [tasks, setTasks] = useState(() => normalizeTasks(mockTasks))
  const [view, setView] = useState('list')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    subject: subjectOptions[0],
    dueDate: '',
    priority: 'medium',
  })

  const groupedTasks = useMemo(() => {
    const groups = {}

    tasks
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .forEach((task) => {
        if (!groups[task.dueDate]) {
          groups[task.dueDate] = []
        }
        groups[task.dueDate].push(task)
      })

    return Object.entries(groups)
  }, [tasks])

  const taskMapByDate = useMemo(() => {
    const map = {}
    tasks.forEach((task) => {
      if (!map[task.dueDate]) map[task.dueDate] = []
      map[task.dueDate].push(task)
    })
    return map
  }, [tasks])

  const { year, month, calendarDays } = useMemo(() => getRangeForCalendar(), [])

  const openModal = () => {
    setEditingTaskId(null)
    setForm({
      title: '',
      subject: subjectOptions[0],
      dueDate: '',
      priority: 'medium',
    })
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTaskId(task.id)
    setForm({
      title: task.title,
      subject: task.subject,
      dueDate: task.dueDate,
      priority: task.priority,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTaskId(null)
    setForm({
      title: '',
      subject: subjectOptions[0],
      dueDate: '',
      priority: 'medium',
    })
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const title = form.title.trim()
    if (!title || !form.subject || !form.dueDate) return

    if (editingTaskId) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTaskId
            ? { ...task, title, subject: form.subject, dueDate: form.dueDate, priority: form.priority }
            : task,
        ),
      )
    } else {
      const newTask = {
        id: `${Date.now()}`,
        title,
        subject: form.subject,
        dueDate: form.dueDate,
        priority: form.priority,
        completed: false,
      }

      setTasks((previous) => [...previous, newTask])
    }

    closeModal()
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((previous) => previous.filter((task) => task.id !== taskId))
  }

  const monthLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1))

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-pink-500">Your week at a glance</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-gray-800 sm:text-5xl">Study Planner<span className="text-pink-500">.</span></h1>
          <p className="mt-2 max-w-xl text-sm text-gray-600">Turn scattered intentions into a rhythm you can actually keep.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex rounded-xl border border-white/50 bg-white/50 p-1 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${view === 'list' ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md' : 'text-gray-600 hover:bg-white/70 hover:text-pink-600'}`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setView('calendar')}
              className={`rounded-lg px-3 py-2 text-sm font-bold transition ${view === 'calendar' ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md' : 'text-gray-600 hover:bg-white/70 hover:text-pink-600'}`}
            >
              Calendar
            </button>
          </div>

          <Button type="button" onClick={openModal}>
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="space-y-5">
          {groupedTasks.length === 0 ? (
            <GlassCard className="border-dashed p-8 text-center text-gray-600">
              No tasks scheduled yet. Add your first study task.
            </GlassCard>
          ) : (
            groupedTasks.map(([date, items]) => (
              <GlassCard key={date} className="p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/50 pb-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">Due date</p>
                    <h2 className="mt-1 text-lg font-black text-gray-800">{formatDateLabel(date)}</h2>
                  </div>
                  <Badge variant="default">{items.length} tasks</Badge>
                </div>

                <div className="space-y-3">
                  {items.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col gap-3 rounded-xl border border-white/50 bg-white/50 p-3 transition hover:bg-white/75 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mt-1 h-5 w-5 accent-pink-500"
                          aria-label={`Mark ${task.title} complete`}
                        />

                        <div>
                          <p className={`text-base font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            {task.title}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant="primary">
                              {task.subject}
                            </Badge>
                            <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-semibold uppercase tracking-[0.14em] ${priorityStyles[task.priority].chip}`}>
                              <span className={`h-2 w-2 rounded-full ${priorityStyles[task.priority].dot}`} />
                              {priorityStyles[task.priority].label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Button type="button" variant="ghost" size="sm" onClick={() => openEditModal(task)}>
                          <Pencil className="h-4 w-4" /> Edit
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => deleteTask(task.id)}>
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))
          )}
        </div>
      ) : (
        <GlassCard className="p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-pink-500" />
              <h2 className="text-xl font-black text-gray-800">{monthLabel}</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <button type="button" aria-label="Previous month" className="rounded-lg border border-white/60 bg-white/50 p-2 transition hover:bg-white/80"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" aria-label="Next month" className="rounded-lg border border-white/60 bg-white/50 p-2 transition hover:bg-white/80"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase tracking-[0.18em] text-gray-500">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date) => {
              const key = date.toISOString().slice(0, 10)
              const tasksForDate = taskMapByDate[key] || []
              const isCurrentMonth = date.getMonth() === month

              return (
                <div
                  key={key}
                  className={`min-h-[120px] rounded-xl border p-2 ${
                    isCurrentMonth ? 'border-white/50 bg-white/45' : 'border-white/30 bg-white/20 text-gray-400'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className={`text-xs font-bold ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}`}>
                      {date.getDate()}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {tasksForDate.slice(0, 2).map((task) => (
                      <div key={task.id} className="rounded-md bg-pink-100 px-1.5 py-1 text-xs font-semibold text-pink-700">
                        {task.title}
                      </div>
                    ))}
                    {tasksForDate.length > 2 && (
                      <div className="text-xs text-gray-500">+{tasksForDate.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      )}

      <Modal open={isModalOpen} onClose={closeModal} title={editingTaskId ? 'Edit task' : 'Add task'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleFieldChange}
              placeholder="Finish reading chapter"
              className="w-full rounded-xl border border-white/50 bg-white/60 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleFieldChange}
              className="w-full rounded-xl border border-white/50 bg-white/60 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            >
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dueDate" className="mb-2 block text-sm font-medium text-gray-700">
                Due date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleFieldChange}
                className="w-full rounded-xl border border-white/50 bg-white/60 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="mb-2 block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleFieldChange}
                className="w-full rounded-xl border border-white/50 bg-white/60 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              <Check className="h-4 w-4" /> {editingTaskId ? 'Save Changes' : 'Add Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
