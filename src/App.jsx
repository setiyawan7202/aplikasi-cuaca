import { useState, useEffect } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastList from "./components/ForecastList"
import { getCurrentWeather, getForecast, getDailyForecast } from "./services/weatherApi"

const DEFAULT_CITY = "Jakarta"

export default function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [rawForecast, setRawForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    handleSearch(DEFAULT_CITY)
  }, [])

  const handleSearch = async (city) => {
    try {
      setLoading(true)
      setError("")

      const weatherData = await getCurrentWeather(city)
      const forecastData = await getForecast(city)
      
      // Process into 5-day forecast
      const dailyForecast = getDailyForecast(forecastData)

      setWeather(weatherData)
      setForecast(dailyForecast)
      setRawForecast(forecastData.list) // Keep raw 3-hour data for hourly view
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast([])
      setRawForecast([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-main">
      <Header />
      
      <main className="max-w-5xl mx-auto px-5 py-6">
        <SearchBar onSearch={handleSearch} />

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex flex-col items-center">
            <div className="w-10 h-10 spinner"></div>
            <p className="mt-3 text-sub text-sm">Memuat data...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in">
            <p className="text-red-500 text-sm">Kota tidak ditemukan. Coba nama kota lain.</p>
          </div>
        )}

        {/* Content */}
        {!loading && weather && (
          <>
            <WeatherCard data={weather} />
            {forecast.length > 0 && <ForecastList data={forecast} rawData={rawForecast} />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-5 py-6 mt-8 border-t border-main">
        <p className="text-dim text-xs text-center">Data dari OpenWeatherMap</p>
      </footer>
    </div>
  )
}
