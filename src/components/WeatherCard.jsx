export default function WeatherCard({ data }) {
  return (
    <div className="mt-6 bg-slate-800 rounded-xl p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">{data.name}</h2>
          <p className="text-slate-400">
            {data.weather[0].description}
          </p>
        </div>
        <div className="text-4xl text-cyan-400">
          {Math.round(data.main.temp)}°C
        </div>
      </div>
    </div>
  )
}
