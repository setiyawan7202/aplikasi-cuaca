import { useState, useEffect } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastList from "./components/ForecastList"
import { getCurrentWeather, getForecast } from "./services/weatherApi"

// Ganti dengan kota default pilihan Anda
const DEFAULT_CITY = "Jakarta"

export default function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Load cuaca default saat halaman pertama kali dibuka
  useEffect(() => {
    handleSearch(DEFAULT_CITY)
  }, [])

  const handleSearch = async (city) => {
    try {
      setLoading(true)
      setError("")

      const weatherData = await getCurrentWeather(city)
      const forecastData = await getForecast(city)

      setWeather(weatherData)
      setForecast(forecastData.list.slice(0, 5))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {weather && <WeatherCard data={weather} />}
        {forecast.length > 0 && <ForecastList data={forecast} />}
      </main>
    </div>
  )
}
