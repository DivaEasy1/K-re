'use client'

import Link from 'next/link'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { CalendarClock, MapPinned, Radar } from 'lucide-react'

import type { Station } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import LoadingState from '@/components/ui/loading-state'
import StationCard from '@/components/stations/StationCard'

const MapView = dynamic(() => import('@/components/stations/MapView'), {
  ssr: false,
})

type Filter = 'all' | 'open' | 'coming_soon'

const labels: Record<Filter, string> = {
  all: 'Toutes',
  open: 'Ouvertes',
  coming_soon: 'Bientot',
}

interface StationsClientProps {
  stations: Station[]
  bookingUrl: string
}

export default function StationsClient({ stations, bookingUrl }: StationsClientProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const chipRefs = useRef<Record<Filter, HTMLButtonElement | null>>({
    all: null,
    open: null,
    coming_soon: null,
  })

  const filteredStations = useMemo(() => {
    if (filter === 'all') return stations
    return stations.filter((station) => station.status === filter)
  }, [stations, filter])

  const nextStation = useMemo(() => {
    return stations
      .filter((station) => station.status === 'coming_soon')
      .sort((a, b) => a.openYear - b.openYear)[0]
  }, [stations])

  const getMotionProfile = () => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    return {
      chipDuration: mobile ? 0.3 : 0.45,
      cardDuration: mobile ? 0.42 : 0.56,
      cardY: mobile ? 12 : 18,
      cardStagger: mobile ? 0.045 : 0.07,
      indicatorDuration: mobile ? 0.24 : 0.34,
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chips = filterRef.current?.querySelectorAll<HTMLElement>('[data-gsap-chip]')
    if (!chips?.length) return
    const motion = getMotionProfile()

    gsap.fromTo(
      chips,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.chipDuration,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [])

  useEffect(() => {
    const container = filterRef.current
    const indicator = indicatorRef.current
    const activeChip = chipRefs.current[filter]
    if (!container || !indicator || !activeChip) return

    const syncIndicator = (animate: boolean) => {
      const x = activeChip.offsetLeft
      const y = activeChip.offsetTop
      const width = activeChip.offsetWidth
      const height = activeChip.offsetHeight

      const target = { x, y, width, height }
      if (animate) {
        const motion = getMotionProfile()
        gsap.to(indicator, {
          ...target,
          duration: motion.indicatorDuration,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      } else {
        gsap.set(indicator, target)
      }
    }

    syncIndicator(false)
    const raf = window.requestAnimationFrame(() => syncIndicator(true))
    const onResize = () => syncIndicator(false)
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [filter])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = gridRef.current?.querySelectorAll<HTMLElement>('[data-gsap-item]')
    if (!cards?.length) return
    const motion = getMotionProfile()

    gsap.killTweensOf(cards)
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: motion.cardY, scale: 0.988 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: motion.cardDuration,
        stagger: motion.cardStagger,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [filter, filteredStations.length])

  return (
    <div className="space-y-8">
      <section className="gsap-reveal rounded-4xl border border-white/70 bg-white/90 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">
                  Carte des stations
                </h2>
                <p className="text-sm text-slate-600">Zoom conseille: niveau 11 a 13</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                <MapPinned className="h-3.5 w-3.5" aria-hidden />
                Donnees en temps reel
              </span>
            </div>

            <Suspense
              fallback={
                <LoadingState
                  className="h-125 w-full rounded-3xl"
                  title="Chargement de la carte"
                  description="Affichage des stations en cours..."
                />
              }
            >
              <MapView stations={stations} height={500} />
            </Suspense>
          </div>

          <aside className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <article
              className="rounded-3xl border border-brand-blue/15 bg-linear-to-br from-brand-blue/10 to-white p-4"
              data-gsap-hover
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Stations ouvertes</p>
              <p className="mt-1 text-3xl font-bold text-brand-dark">
                {stations.filter((station) => station.status === 'open').length}
              </p>
              <p className="mt-1 text-sm text-slate-600">Disponibles des maintenant</p>
            </article>

            <article
              className="rounded-3xl border border-slate-200 bg-slate-50/85 p-4"
              data-gsap-hover
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Prochaine ouverture</p>
              <p className="mt-1 text-xl font-bold text-brand-dark">{nextStation ? nextStation.name : 'Annonce a venir'}</p>
              <p className="mt-1 text-sm text-slate-600">
                {nextStation ? `Ouverture prevue en ${nextStation.openYear}` : 'Calendrier en cours'}
              </p>
            </article>

            <article
              className="rounded-3xl border border-amber-200 bg-amber-50/90 p-4 sm:col-span-2 xl:col-span-1"
              data-gsap-hover
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Reservation express</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                Selectionnez votre spot, puis finalisez en quelques clics sur Kayakomat.
              </p>
              <Button asChild className="mt-3 w-full bg-brand-dark hover:bg-slate-900">
                <Link href={bookingUrl} target="_blank" rel="noreferrer">
                  Reserver maintenant
                </Link>
              </Button>
            </article>
          </aside>
        </div>
      </section>

      <section className="gsap-reveal rounded-4xl border border-white/70 bg-white/92 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="max-w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div
              ref={filterRef}
              className="relative inline-flex min-w-max items-center gap-1 rounded-full border border-slate-200 bg-slate-100/85 p-1"
            >
              <span
                ref={indicatorRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 rounded-full bg-brand-dark shadow-[0_12px_26px_-18px_rgba(10,22,40,0.8)]"
              />
              {(Object.keys(labels) as Filter[]).map((value) => (
                <Button
                  key={value}
                  type="button"
                  data-gsap-chip
                  ref={(el) => {
                    chipRefs.current[value] = el
                  }}
                  onClick={() => setFilter(value)}
                  variant={filter === value ? 'default' : 'outline'}
                  className={cn(
                    'relative z-10 h-10 border-transparent px-4',
                    filter === value
                      ? 'bg-transparent text-white hover:bg-transparent'
                      : 'bg-transparent text-slate-700 hover:bg-white/60 hover:text-brand-dark'
                  )}
                  aria-label={`Filtrer les stations: ${labels[value]}`}
                >
                  {labels[value]}
                </Button>
              ))}
            </div>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            <Radar className="h-4 w-4" aria-hidden />
            {filteredStations.length} resultat{filteredStations.length > 1 ? 's' : ''}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStations.map((station) => (
            <div key={station.id} id={`station-${station.id}`} data-gsap-item>
              <StationCard station={station} />
            </div>
          ))}
        </div>

        <div
          className="mt-5 rounded-2xl border border-brand-blue/12 bg-brand-blue/[0.07] p-4 text-sm text-slate-700"
          data-gsap-hover
        >
          <p className="inline-flex items-center gap-2 font-semibold text-brand-dark">
            <CalendarClock className="h-4 w-4" aria-hidden />
            Conseil K-Re
          </p>
          <p className="mt-1 leading-relaxed">
            Les meilleures conditions sont souvent le matin. Pensez a reserver la veille pour
            garantir le materiel disponible sur votre station preferee.
          </p>
        </div>
      </section>
    </div>
  )
}
