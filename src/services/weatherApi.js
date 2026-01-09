const API_KEY = "020f567cb46f67e8b5d70619e8ab2359"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function getCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
  )

  if (!res.ok) {
    throw new Error("Kota tidak ditemukan")
  }

  return res.json()
}

export async function getForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id`
  )

  if (!res.ok) {
    throw new Error("Gagal mengambil forecast")
  }

  return res.json()
}

// Process 3-hour forecast into daily forecast (5 days)
export function getDailyForecast(forecastData) {
  const dailyMap = {}

  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })

    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        temps: [],
        icons: [],
        descriptions: [],
        humidity: [],
        dt: item.dt
      }
    }

    dailyMap[date].temps.push(item.main.temp)
    dailyMap[date].icons.push(item.weather[0].icon)
    dailyMap[date].descriptions.push(item.weather[0].description)
    dailyMap[date].humidity.push(item.main.humidity)
  })

  // Convert to array and calculate min/max
  return Object.values(dailyMap).slice(0, 5).map(day => ({
    date: day.date,
    dt: day.dt,
    temp_min: Math.round(Math.min(...day.temps)),
    temp_max: Math.round(Math.max(...day.temps)),
    icon: getMostFrequent(day.icons),
    description: getMostFrequent(day.descriptions),
    humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length)
  }))
}

// Helper: get most frequent item in array
function getMostFrequent(arr) {
  const counts = {}
  let maxCount = 0
  let maxItem = arr[0]
  
  arr.forEach(item => {
    counts[item] = (counts[item] || 0) + 1
    if (counts[item] > maxCount) {
      maxCount = counts[item]
      maxItem = item
    }
  })
  
  return maxItem
}

