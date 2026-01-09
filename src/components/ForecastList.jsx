import { useState } from "react"

export default function ForecastList({ data, rawData }) {
  const [forecastType, setForecastType] = useState('5day')
  
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

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return {
      date: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  }

  // Get display data based on forecastType
  const getDisplayData = () => {
    switch (forecastType) {
      case '3hour':
        // 3 jam - ambil semua data yang tersedia (max ~8 data = 24 jam)
        return rawData.slice(0, 8).map(item => ({
          type: 'hourly',
          ...formatDateTime(item.dt),
          icon: item.weather[0].icon,
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          humidity: item.main.humidity
        }))
      case '5hour':
        // 5 jam - ambil semua data yang tersedia (max ~16 data = 48 jam)
        return rawData.slice(0, 16).map(item => ({
          type: 'hourly',
          ...formatDateTime(item.dt),
          icon: item.weather[0].icon,
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          humidity: item.main.humidity
        }))
      case '5day':
      default:
        // 5 hari - tampilkan semua 5 hari
        return data.slice(0, 5).map(item => ({
          type: 'daily',
          ...item
        }))
    }
  }

  const displayData = getDisplayData()

  return (
    <div className="mt-6 animate-in">
      {/* Header with Select */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-sub">Prakiraan Cuaca</h3>
        <select
          value={forecastType}
          onChange={(e) => setForecastType(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg bg-card border border-main text-main cursor-pointer focus:outline-none focus:border-blue-500"
        >
          <option value="3hour">Per 3 Jam (24 Jam)</option>
          <option value="5hour">Per 3 Jam (48 Jam)</option>
          <option value="5day">5 Hari</option>
        </select>
      </div>
      
      {/* Forecast Container - Horizontal Scroll */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3" style={{ minWidth: 'min-content' }}>
          {displayData.map((item, index) => (
            <div
              key={index}
              className="card rounded-xl p-4 text-center hover:scale-[1.02] transition-transform flex-shrink-0"
              style={{ width: '140px' }}
            >
              {item.type === 'daily' ? (
                // Daily Forecast View
                <>
                  <div className="text-xs text-dim mb-2 font-medium">{item.date}</div>
                  <div className="text-3xl mb-2">{getWeatherIcon(item.icon)}</div>
                  <div className="flex justify-center gap-2 text-sm">
                    <span className="font-semibold text-main">{item.temp_max}°</span>
                    <span className="text-dim">{item.temp_min}°</span>
                  </div>
                  <div className="text-xs text-dim mt-2 capitalize truncate">{item.description}</div>
                  <div className="text-xs text-dim mt-1">💧 {item.humidity}%</div>
                </>
              ) : (
                // Hourly Forecast View
                <>
                  <div className="text-xs text-dim mb-1">{item.date}</div>
                  <div className="text-xs text-sub font-medium mb-2">{item.time}</div>
                  <div className="text-3xl mb-2">{getWeatherIcon(item.icon)}</div>
                  <div className="text-lg font-semibold text-main">{item.temp}°</div>
                  <div className="text-xs text-dim mt-2 capitalize truncate">{item.description}</div>
                  <div className="text-xs text-dim mt-1">💧 {item.humidity}%</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
