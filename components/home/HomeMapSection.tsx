'use client'

import { Suspense, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Search } from 'lucide-react'

import type { Station } from '@/types'
import LoadingState from '@/components/ui/loading-state'

const MapView = dynamic(() => import('@/components/stations/MapView'), {
  ssr: false,
})

type StationFilter = 'all' | 'open' | 'coming_soon'

interface HomeMapSectionProps {
  stations: Station[]
}

const statusLabels: Record<StationFilter, string> = {
  all: 'Toutes les stations',
  open: 'Stations ouvertes',
  coming_soon: 'Bientot disponibles',
}

export default function HomeMapSection({ stations }: HomeMapSectionProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<StationFilter>('all')

  const filteredStations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return stations.filter((station) => {
      const matchesFilter = filter === 'all' ? true : station.status === filter
      const matchesQuery =
        normalizedQuery.length === 0
          ? true
          : station.name.toLowerCase().includes(normalizedQuery) ||
            station.location.toLowerCase().includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [stations, filter, query])

  return (
    <section className="relative -mt-12 pb-16 sm:-mt-14 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gsap-reveal relative rounded-4xl border border-white/70 bg-white/92 p-3 shadow-[0_26px_65px_-40px_rgba(10,22,40,0.75)] backdrop-blur sm:p-4 lg:p-5">
          <form
            className="relative z-10 grid gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm md:grid-cols-[220px_minmax(0,1fr)_210px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor="home-map-filter">
              Filtrer les stations
            </label>
            <div className="relative">
              <select
                id="home-map-filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value as StationFilter)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <label className="sr-only" htmlFor="home-map-search">
              Recherche station
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                id="home-map-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Recherche de station ou lieu"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-brand-dark placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-5 text-sm font-semibold text-white shadow-[0_14px_32px_-20px_rgba(30,144,255,0.85)] hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              aria-label="Appliquer la recherche"
            >
              RECHERCHE
            </button>
          </form>

          <div className="mt-3 rounded-3xl border border-slate-200/80 bg-white p-2 sm:mt-4">
            {filteredStations.length > 0 ? (
              <Suspense
                fallback={
                  <LoadingState
                    className="h-116 w-full rounded-[1.2rem]"
                    title="Chargement de la carte"
                    description="Affichage des stations en cours..."
                  />
                }
              >
                <MapView stations={filteredStations} height={500} showLearnMore={false} />
              </Suspense>
            ) : (
              <div className="flex h-116 items-center justify-center rounded-[1.2rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <div className="max-w-sm space-y-2">
                  <p className="font-semibold text-brand-dark">Aucun resultat</p>
                  <p className="text-sm text-slate-600">
                    Essayez un autre mot-cle ou repassez sur &quot;Toutes les stations&quot;.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
