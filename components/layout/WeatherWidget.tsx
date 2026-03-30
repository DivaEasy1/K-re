/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'

interface ForecastItem {
  dt_txt: string
  main: {
    temp: number
  }
  weather: {
    icon: string
  }[]
}

interface ForecastResponse {
  list: ForecastItem[]
}

interface DayForecast {
  day: string
  temp: string
  icon: string
}

export default function WeatherWidget() {
  const [forecast, setForecast] = useState<DayForecast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

        console.log('API KEY:', apiKey)

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=La Rochelle,FR&units=metric&appid=${apiKey}`

        console.log('FETCH URL:', url)

        const res = await fetch(url)

        console.log('STATUS:', res.status)

        const data = await res.json()

        console.log('FULL RESPONSE:', data)

        if (!res.ok) {
          console.error('API ERROR MESSAGE:', data)
          throw new Error(data?.message || 'API error')
        }

        if (!data.list) {
          console.error('No list in response')
          return
        }

        const daily = data.list
          .filter((_: any, index: number) => index % 8 === 0)
          .slice(0, 3)

        console.log('DAILY DATA:', daily)

        const days = daily.map((d: ForecastItem, index: number) => ({
          day:
            index === 0
              ? "Aujourd’hui"
              : index === 1
              ? "Demain"
              : new Date(d.dt_txt).toLocaleDateString('fr-FR', {
                  weekday: 'short',
                }),

          temp: `${Math.round(d.main.temp)}°C`,
          icon: `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`,
        }))

        console.log('FINAL DAYS:', days)

        setForecast(days)
      } catch (err) {
        console.error('Weather error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur">
        <p className="text-xs">Chargement...</p>
      </div>
    )
  }

  if (!forecast.length) {
    return (
      <div className="rounded-2xl border border-red-400 bg-red-500/20 px-4 py-3 text-white">
        <p className="text-xs">météo</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur shadow-lg">
      <p className="mb-2 text-xs font-semibold">Météo - Île de Ré</p>

      <div className="flex gap-4">
        {forecast.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-xs">
            <img src={item.icon} alt="" className="h-6 w-6" />
            <span className="font-semibold">{item.temp}</span>
            <span className="opacity-80">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}