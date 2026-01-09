export default function WeatherCard({ data }) {
  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000)
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'UTC'
    })
  }

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    }
    return iconMap[iconCode] || '🌤️'
  }

  return (
    <div className="mt-6 card rounded-2xl p-6 animate-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-main">{data.name}</h2>
            <span className="px-2 py-0.5 text-xs font-medium bg-alt rounded text-sub">
              {data.sys.country}
            </span>
          </div>
          <p className="text-sub text-sm capitalize mt-1">{data.weather[0].description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Temperature Section */}
        <div className="flex items-center gap-5">
          <span className="text-6xl float-icon">{getWeatherIcon(data.weather[0].icon)}</span>
          <div>
            <div className="text-5xl font-bold text-main">{Math.round(data.main.temp)}°</div>
            <div className="text-sub text-sm mt-1">Terasa {Math.round(data.main.feels_like)}°</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-alt rounded-xl p-4">
            <div className="text-dim text-xs mb-1">Kelembapan</div>
            <div className="text-main font-semibold">{data.main.humidity}%</div>
          </div>
          <div className="bg-alt rounded-xl p-4">
            <div className="text-dim text-xs mb-1">Angin</div>
            <div className="text-main font-semibold">{data.wind.speed} m/s</div>
          </div>
          <div className="bg-alt rounded-xl p-4">
            <div className="text-dim text-xs mb-1">Tekanan</div>
            <div className="text-main font-semibold">{data.main.pressure} hPa</div>
          </div>
          <div className="bg-alt rounded-xl p-4">
            <div className="text-dim text-xs mb-1">Jarak Pandang</div>
            <div className="text-main font-semibold">{(data.visibility / 1000).toFixed(1)} km</div>
          </div>
        </div>
      </div>

      {/* Sunrise & Sunset */}
      <div className="flex gap-6 mt-6 pt-5 border-t border-main">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌅</span>
          <div>
            <div className="text-xs text-dim">Terbit</div>
            <div className="text-main text-sm font-medium">{formatTime(data.sys.sunrise, data.timezone)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌇</span>
          <div>
            <div className="text-xs text-dim">Terbenam</div>
            <div className="text-main text-sm font-medium">{formatTime(data.sys.sunset, data.timezone)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
