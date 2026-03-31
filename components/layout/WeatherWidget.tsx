'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CloudSun } from 'lucide-react'

import { cn } from '@/lib/utils'

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

interface WeatherWidgetProps {
  className?: string
}

export default function WeatherWidget({ className }: WeatherWidgetProps) {
  const [forecast, setForecast] = useState<DayForecast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=La Rochelle,FR&units=metric&appid=${apiKey}`

        const res = await fetch(url, { signal: controller.signal })
        const data: ForecastResponse & { message?: string } = await res.json()

        if (controller.signal.aborted) {
          return
        }

        if (!res.ok) {
          throw new Error(data?.message || 'API error')
        }

        if (!data.list?.length) {
          setForecast([])
          return
        }

        const daily = data.list.filter((_, index) => index % 8 === 0).slice(0, 3)

        const days = daily.map((item, index) => ({
          day:
            index === 0
              ? "Aujourd'hui"
              : index === 1
                ? 'Demain'
                : new Date(item.dt_txt).toLocaleDateString('fr-FR', {
                    weekday: 'short',
                  }),
          temp: `${Math.round(item.main.temp)} C`,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }))

        setForecast(days)
      } catch (err) {
        if (controller.signal.aborted) {
          return
        }
        console.error('Weather error:', err)
        setForecast([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchWeather()

    return () => {
      controller.abort()
    }
  }, [])

  if (loading) {
    return (
      <div
        className={cn(
          'rounded-3xl border border-white/28 bg-linear-to-r from-white/14 via-white/10 to-white/12 px-4 py-3 text-white backdrop-blur-lg',
          className
        )}
      >
        <div className="h-16 animate-pulse rounded-2xl bg-white/12" />
      </div>
    )
  }

  if (!forecast.length) {
    return (
      <div
        className={cn(
          'rounded-3xl border border-white/24 bg-white/10 px-4 py-3 text-white backdrop-blur-md',
          className
        )}
      >
        <p className="text-sm font-medium text-white/90">Meteo indisponible</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-3xl border border-white/32 bg-linear-to-r from-white/15 via-white/10 to-white/12 px-4 py-3 text-white shadow-[0_20px_40px_-30px_rgba(10,22,40,0.9)] backdrop-blur-lg',
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <CloudSun className="h-4 w-4 text-brand-gold" aria-hidden />
        <p className="text-sm font-semibold">Meteo - Ile de Re</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {forecast.map((item, index) => (
          <div key={`${item.day}-${index}`} className="rounded-2xl bg-white/10 p-2 text-center text-xs">
            <Image
              src={item.icon}
              alt={`Meteo ${item.day}`}
              width={28}
              height={28}
              unoptimized
              className="mx-auto h-7 w-7"
            />
            <span className="block font-semibold">{item.temp}</span>
            <span className="block text-white/80">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
