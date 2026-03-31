import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import settings from '@/data/settings.json'
import stationsData from '@/data/stations.json'
import type { Station } from '@/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import WeatherWidget from '@/components/layout/WeatherWidget'

export default function Hero() {
  const stations = stationsData as Station[]
  const openStations = stations.filter((station) => station.status === 'open').length

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.85rem)] items-start overflow-hidden lg:items-center">
      <Image
        src="https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800"
        alt="Kayaks sur la cote de l'ile de Re"
        data-hero-media
        fill
        sizes="100vw"
        quality={70}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-b from-brand-dark/90 via-brand-dark/58 to-brand-dark/84" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(27,160,226,0.4),transparent_38%),radial-gradient(circle_at_86%_12%,rgba(248,180,0,0.35),transparent_38%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6 sm:pb-28 sm:pt-7 lg:px-1 lg:pb-30 lg:pt-14">
        <div className="flex flex-col gap-6 sm:gap-7">
          <div className="w-full max-w-md">
            <WeatherWidget />
          </div>

          <div
            data-hero-content
            className="mx-auto flex max-w-4xl flex-col items-center text-center text-white"
          >
            <span className="glass-panel rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase sm:text-sm">
              Ile de Re, France
            </span>

            <h1 className="section-heading mt-5 text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              L&apos;aventure kayak
              <span className="mt-1 block bg-linear-to-r from-brand-blue via-brand-gold to-brand-orange bg-clip-text text-transparent">
                en toute liberte
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
              {settings.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/90 sm:text-sm">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                {openStations} stations ouvertes
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                Reservation en 2 minutes
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                Sans file d&apos;attente
              </span>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-brand-gold text-brand-dark shadow-[0_16px_40px_-20px_rgba(255,165,0,0.95)] hover:bg-amber-300 sm:w-auto"
              >
                <a
                  href={settings.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reserver maintenant sur Kayakomat"
                >
                  Reserver maintenant
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-white/50 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Link href="/station" aria-label="Decouvrir les stations">
                  Decouvrir nos stations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[6%] top-[40%] hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur lg:block floating">
        Stations 24/7
      </div>

      <div className="pointer-events-none absolute bottom-18 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 md:block">
        <ChevronDown className="h-7 w-7 floating" aria-hidden />
      </div>

      <svg
        viewBox="0 0 1440 180"
        className="absolute bottom-0 left-0 h-22 w-full text-brand-light sm:h-26 md:h-35"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,133.3C1200,128,1320,96,1380,80L1440,64L1440,181L1380,181C1320,181,1200,181,1080,181C960,181,840,181,720,181C600,181,480,181,360,181C240,181,120,181,60,181L0,181Z"
        />
      </svg>
    </section>
  )
}
