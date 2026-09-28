import countries from '../data/countries'
import GlassCard from './GlassCard'

export default function WorldMap({ visitedCountries = [], stamps = [], className = '' }) {
  return (
    <GlassCard className={`p-4 ${className}`}>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-pink-500">World Map</h3>
      <div className="grid grid-cols-5 gap-2">
        {countries.map((country) => {
          const isVisited = visitedCountries.includes(country.id)
          const hasStamp = stamps.includes(country.id)
          return (
            <div
              key={country.id}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 transition-all ${
                isVisited ? 'bg-pink-50' : 'bg-gray-50 opacity-50'
              }`}
              title={`${country.name}${hasStamp ? ' (stamped)' : ''}`}
            >
              <span className="text-xl" role="img" aria-label={country.name}>
                {country.flag}
              </span>
              {hasStamp && (
                <span className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold text-white">STAMP</span>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        {visitedCountries.length} of {countries.length} countries visited
      </p>
    </GlassCard>
  )
}
