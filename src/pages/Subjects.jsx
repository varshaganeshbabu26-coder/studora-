import { useState, useMemo, useRef } from 'react'
import { Search, Plus, ArrowUpDown, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import BunnyAvatar from '../components/BunnyAvatar'
import SubjectIsland from '../components/SubjectIsland'
import AddSubjectModal from '../components/AddSubjectModal'
import WorldMap from '../components/WorldMap'
import CountryBackground from '../components/CountryBackground'
import { FloatingTopNav, FloatingDockNav } from '../components/FloatingNav'
import Badge from '../components/Badge'
import Button from '../components/Button'
import mockSubjects from '../data/mockSubjects'
import mockTasks from '../data/mockTasks'
import { getCountryById } from '../data/countries'

const filterOptions = ['All', 'In progress', 'Completed', 'Not started']
const sortOptions = ['recent', 'progress', 'A-Z']

export default function Subjects() {
  const [subjects, setSubjects] = useState(mockSubjects)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('recent')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [defaultCountry] = useState(() => {
    const firstSubject = mockSubjects[0]
    return firstSubject ? getCountryById(firstSubject.country) : null
  })
  const carouselRef = useRef(null)

  const usedCountries = subjects.map((s) => s.country)
  const visitedCountries = [...new Set(subjects.map((s) => s.country))]
  const stamps = subjects.flatMap((s) => s.stamps || [])
  const totalTasks = mockTasks.length
  const completedTasks = mockTasks.filter((t) => t.completed).length
  const kmTraveled = completedTasks * 12

  const filteredSubjects = useMemo(() => {
    let result = [...subjects]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          getCountryById(s.country).name.toLowerCase().includes(q)
      )
    }

    if (filter === 'In progress') {
      result = result.filter((s) => s.progress > 0 && s.progress < 100)
    } else if (filter === 'Completed') {
      result = result.filter((s) => s.progress >= 100)
    } else if (filter === 'Not started') {
      result = result.filter((s) => s.progress === 0)
    }

    if (sort === 'progress') {
      result.sort((a, b) => b.progress - a.progress)
    } else if (sort === 'A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [subjects, search, filter, sort])

  const bgCountry = defaultCountry

  function handleSaveSubject(data) {
    if (editingSubject) {
      setSubjects((prev) =>
        prev.map((s) =>
          s.name === editingSubject.name
            ? { ...s, ...data, progress: s.progress, completedTasks: s.completedTasks, bunnyPosition: s.bunnyPosition, stamps: s.stamps }
            : s
        )
      )
    } else {
      setSubjects((prev) => [
        ...prev,
        {
          name: data.name,
          icon: data.icon,
          progress: 0,
          color: 'blue',
          country: data.country,
          completedTasks: 0,
          bunnyPosition: 0,
          stamps: [],
        },
      ])
    }
    setEditingSubject(null)
  }

  function handleDeleteSubject(name) {
    setSubjects((prev) => prev.filter((s) => s.name !== name))
    setDeleteConfirm(null)
  }

  function scrollCarousel(direction) {
    if (carouselRef.current) {
      const scrollAmount = 320
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <CountryBackground country={bgCountry}>
      <FloatingTopNav />
      <FloatingDockNav />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 md:pt-28">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_280px]">
          {/* Left Panel: Search, Filter, Stats */}
          <div className="space-y-4">
            <GlassCard className="p-5">
              <h1 className="text-2xl font-bold text-gray-800">My Trips</h1>
              <p className="mt-1 text-sm text-gray-500">Your learning destinations</p>

              {/* Search */}
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trips..."
                  className="w-full rounded-xl border border-white/40 bg-white/60 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
                />
              </div>

              {/* Filter chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                {filterOptions.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      filter === f
                        ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md'
                        : 'bg-white/50 text-gray-600 hover:bg-white/80'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="mt-3 flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="flex-1 rounded-xl border border-white/40 bg-white/60 px-3 py-2 text-sm text-gray-700 outline-none focus:border-pink-300"
                >
                  {sortOptions.map((s) => (
                    <option key={s} value={s}>
                      {s === 'recent' ? 'Recently studied' : s === 'progress' ? 'By progress' : 'A-Z'}
                    </option>
                  ))}
                </select>
              </div>
            </GlassCard>

            {/* Travel stats card */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-pink-500">Travel Stats</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-white/50 p-3">
                  <p className="text-lg font-bold text-gray-800">{subjects.length}</p>
                  <p className="text-xs text-gray-500">Trips</p>
                </div>
                <div className="rounded-xl bg-white/50 p-3">
                  <p className="text-lg font-bold text-gray-800">{completedTasks}</p>
                  <p className="text-xs text-gray-500">Tasks done</p>
                </div>
                <div className="rounded-xl bg-white/50 p-3">
                  <p className="text-lg font-bold text-gray-800">{visitedCountries.length}</p>
                  <p className="text-xs text-gray-500">Countries</p>
                </div>
                <div className="rounded-xl bg-white/50 p-3">
                  <p className="text-lg font-bold text-gray-800">{kmTraveled} km</p>
                  <p className="text-xs text-gray-500">Traveled</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Center: Destination Carousel */}
          <div>
            {filteredSubjects.length > 0 ? (
              <div className="relative">
                {/* Carousel navigation */}
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="primary">{filteredSubjects.length} destinations</Badge>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => scrollCarousel(-1)}
                      className="rounded-full bg-white/60 p-2 text-gray-600 shadow-md transition hover:bg-white/90"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCarousel(1)}
                      className="rounded-full bg-white/60 p-2 text-gray-600 shadow-md transition hover:bg-white/90"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Horizontal scrollable carousel */}
                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {filteredSubjects.map((subject) => {
                    const country = getCountryById(subject.country)
                    const subjectTasks = mockTasks.filter((t) => t.subject === subject.name)
                    const completedCount = subjectTasks.filter((t) => t.completed).length
                    const isLastStudied = subject.name === 'Biology'

                    return (
                      <div
                        key={subject.name}
                        className="snap-center shrink-0"
                      >
                        <SubjectIsland
                          subject={subject}
                          country={country}
                          taskCount={subjectTasks.length}
                          completedCount={completedCount}
                          isLastStudied={isLastStudied}
                        />
                      </div>
                    )
                  })}

                  {/* Add new trip card */}
                  <div className="flex shrink-0 snap-center items-center">
                    <button
                      type="button"
                      onClick={() => { setEditingSubject(null); setShowAddModal(true) }}
                      className="group flex h-36 w-36 flex-col items-center justify-center rounded-full border-3 border-dashed border-pink-300 bg-white/30 transition-all duration-300 hover:scale-110 hover:border-pink-400 hover:bg-white/50 sm:h-44 sm:w-44"
                      aria-label="Plan a new trip"
                    >
                      <Plus className="h-10 w-10 text-pink-400 transition-transform group-hover:scale-110" />
                      <span className="mt-2 text-sm font-semibold text-pink-500">Plan a trip</span>
                    </button>
                  </div>
                </div>

                {/* Scroll hint */}
                <p className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  Scroll / Drag to explore
                </p>
              </div>
            ) : (
              <GlassCard className="flex flex-col items-center justify-center p-12 text-center">
                <BunnyAvatar size="lg" />
                <h3 className="mt-4 text-lg font-bold text-gray-700">No trips found</h3>
                <p className="mt-2 text-sm text-gray-500">Try a different search or plan a new trip!</p>
                <Button
                  className="mt-4"
                  onClick={() => { setEditingSubject(null); setShowAddModal(true) }}
                >
                  <Plus className="h-4 w-4" /> Plan a trip
                </Button>
              </GlassCard>
            )}
          </div>

          {/* Right Panel: World Map + Stamps */}
          <div className="space-y-4">
            <WorldMap visitedCountries={visitedCountries} stamps={stamps} />

            {/* Stamp collection */}
            <GlassCard className="p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-pink-500">Passport Stamps</h3>
              {stamps.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {stamps.map((stamp) => {
                    const country = getCountryById(stamp)
                    return (
                      <div
                        key={stamp}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-50 text-xl"
                        title={country.name}
                      >
                        {country.milestoneSouvenir || '🏅'}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Complete all tasks in a trip to earn a stamp!</p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Add/Edit Subject Modal */}
      <AddSubjectModal
        open={showAddModal}
        onClose={() => { setShowAddModal(false); setEditingSubject(null) }}
        onSave={handleSaveSubject}
        existingSubject={editingSubject}
        usedCountries={usedCountries}
      />

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <GlassCard className="w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">Delete trip?</h3>
            <p className="mt-2 text-sm text-gray-500">
              This will remove <strong>{deleteConfirm}</strong> and all its tasks. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="danger" onClick={() => handleDeleteSubject(deleteConfirm)}>Delete</Button>
            </div>
          </GlassCard>
        </div>
      )}
    </CountryBackground>
  )
}
