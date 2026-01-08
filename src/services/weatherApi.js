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
