export default function ForecastList({ data }) {
  // Get weather icon based on condition
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

  // Format time from timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-slate-800 rounded-lg p-4 text-center"
        >
          <p className="text-slate-400 text-sm">{formatTime(item.dt)}</p>
          <p className="text-2xl">{getWeatherIcon(item.weather[0].icon)}</p>
          <p className="text-white font-semibold">{Math.round(item.main.temp)}°C</p>
          <p className="text-slate-400 text-xs capitalize">{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  )
}

