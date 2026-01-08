export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const city = e.target.city.value.trim()
    if (!city) return

    onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-6">
      <input
        name="city"
        placeholder="Cari kota..."
        className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white"
      />
      <button
        type="submit"
        className="bg-cyan-500 px-4 py-2 rounded-lg"
      >
        Cari
      </button>
    </form>
  )
}
