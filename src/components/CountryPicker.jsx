import { useState } from 'react'
import countries from '../data/countries'
import Modal from './Modal'
import GlassCard from './GlassCard'

export default function CountryPicker({ open, onClose, onSelect, currentCountryId, title = 'Choose a destination' }) {
  const [selected, setSelected] = useState(currentCountryId || countries[0].id)

  function handleConfirm() {
    onSelect(selected)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {countries.map((country) => (
          <button
            key={country.id}
            type="button"
            onClick={() => setSelected(country.id)}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
              selected === country.id
                ? 'border-pink-400 bg-pink-50 shadow-md'
                : 'border-gray-200 bg-white/50 hover:border-pink-200'
            }`}
          >
            <span className="text-3xl" role="img" aria-label={country.name}>
              {country.flag}
            </span>
            <span className="text-sm font-semibold text-gray-700">{country.name}</span>
            <span className="text-xs text-gray-500">{country.landmark}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 px-4 py-2 text-sm font-bold text-white shadow-md shadow-pink-200/50 transition hover:from-pink-500 hover:to-rose-500"
        >
          Confirm
        </button>
      </div>
    </Modal>
  )
}
