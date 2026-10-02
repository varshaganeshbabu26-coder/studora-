import { useEffect, useState } from 'react'
import { Plus, Calendar } from 'lucide-react'
import Modal from './Modal'
import Input from './Input'
import Button from './Button'
import CountryPicker from './CountryPicker'
import { getCountryById } from '../data/countries'
import { slugifySubject } from '../data/subjectStorage'

export default function AddSubjectModal({ open, onClose, onSave, existingSubject, existingSubjects = [], usedCountries = [] }) {
  const [name, setName] = useState(existingSubject?.name || '')
  const [emoji, setEmoji] = useState(existingSubject?.icon || '📚')
  const [examDate, setExamDate] = useState(existingSubject?.examDate || '')
  const [countryId, setCountryId] = useState(existingSubject?.country || '')
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [error, setError] = useState('')

  const isEditing = !!existingSubject

  useEffect(() => {
    if (!open) return
    setName(existingSubject?.name || '')
    setEmoji(existingSubject?.icon || '📚')
    setExamDate(existingSubject?.examDate || '')
    setCountryId(existingSubject?.country || '')
    setError('')
  }, [open, existingSubject])

  function handleSave() {
    const subjectSlug = slugifySubject(name)
    if (!subjectSlug) {
      setError('Enter a subject name using letters or numbers')
      return
    }
    if (existingSubjects.some((subject) => (
      slugifySubject(subject.name) === subjectSlug &&
      slugifySubject(subject.name) !== slugifySubject(existingSubject?.name || '')
    ))) {
      setError('A subject with this name already exists')
      return
    }
    if (!countryId) {
      setError('Please choose a country')
      return
    }
    setError('')
    onSave({
      name: name.trim(),
      icon: emoji,
      examDate,
      country: countryId,
    })
    onClose()
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title={isEditing ? 'Edit subject' : 'Add new subject'}>
        <div className="space-y-5">
          <Input
            label="Subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Biology"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Icon</label>
            <div className="flex flex-wrap gap-2">
              {['📚', '🔬', '📐', '🌍', '🎨', '📖', '🧮', '🎵', '💻', '⚗️'].map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 text-xl transition ${
                    emoji === e ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white/50 hover:border-pink-200'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              <Calendar className="mr-1 inline h-4 w-4" />
              Exam date (optional)
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Country</label>
            <button
              type="button"
              onClick={() => setShowCountryPicker(true)}
              className="flex w-full items-center gap-3 rounded-xl border border-white/40 bg-white/60 px-4 py-3 text-left transition hover:border-pink-300"
            >
              {countryId ? (
                <>
                  <span className="text-2xl">{getCountryFlag(countryId)}</span>
                  <span className="font-medium text-gray-700">{getCountryName(countryId)}</span>
                </>
              ) : (
                <span className="text-gray-400">Choose a country...</span>
              )}
            </button>
            {countryId && usedCountries.includes(countryId) && (
              <p className="text-xs text-amber-600">This country is already used by another subject</p>
            )}
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>
              <Plus className="h-4 w-4" />
              {isEditing ? 'Save changes' : 'Add subject'}
            </Button>
          </div>
        </div>
      </Modal>

      <CountryPicker
        open={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={setCountryId}
        currentCountryId={countryId}
        title="Choose a destination"
      />
    </>
  )
}

function getCountryFlag(id) {
  return getCountryById(id)?.flag || '🌍'
}

function getCountryName(id) {
  return getCountryById(id)?.name || id
}
