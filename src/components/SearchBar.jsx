import { useState } from "react"

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const city = query.trim()
    if (!city) return
    onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kota..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-main text-main placeholder-dim input-field"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl btn-primary font-medium"
        >
          Cari
        </button>
      </div>
    </form>
  )
}
