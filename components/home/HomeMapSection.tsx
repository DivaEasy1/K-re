'use client'

import { Suspense, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Search } from 'lucide-react'

import { resolveStationBookingUrl } from '@/lib/stations'
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

function normalizeForSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export default function HomeMapSection({ stations }: HomeMapSectionProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<StationFilter>('all')
  const [showResults, setShowResults] = useState(false)

  const normalizedQuery = query.trim()
  const hasQuery = normalizedQuery.length > 0

  const filterStations = useMemo(
    () => stations.filter((station) => (filter === 'all' ? true : station.status === filter)),
    [stations, filter]
  )

  const matchedStations = useMemo(() => {
    const searchValue = normalizeForSearch(normalizedQuery)

    if (searchValue.length === 0) {
      return filterStations
    }

    return filterStations.filter(
      (station) =>
        normalizeForSearch(station.name).includes(searchValue) ||
        normalizeForSearch(station.location).includes(searchValue)
    )
  }, [filterStations, normalizedQuery])

  const stationsForMap = hasQuery
    ? matchedStations.length > 0
      ? matchedStations
      : filterStations
    : filterStations

  const shouldShowResults = showResults || hasQuery

  return (
    <section id='home-map-section' className="relative -mt-12 pb-16 sm:-mt-14 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="gsap-reveal relative rounded-4xl border border-white/70 bg-white/92 p-3 shadow-[0_26px_65px_-40px_rgba(10,22,40,0.75)] backdrop-blur sm:p-4 lg:p-5">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2">
            <div className="pointer-events-none absolute inset-x-2 top-2 z-30 sm:inset-x-4 sm:top-4">
              <div className="pointer-events-auto rounded-2xl border border-slate-200/85 bg-white/95 p-3 shadow-[0_24px_55px_-28px_rgba(10,22,40,0.5)] backdrop-blur">
                <form
                  className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)_210px]"
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
                      onFocus={() => setShowResults(true)}
                      onBlur={() => setTimeout(() => setShowResults(false), 200)}
                      type="search"
                      placeholder="Recherche de station ou lieu"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-brand-dark placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                    />

                    {shouldShowResults ? (
                      <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-40 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-[0_18px_40px_-28px_rgba(10,22,40,0.8)]">
                        {matchedStations.length > 0 ? (
                          <ul
                            data-lenis-prevent
                            onWheel={(event) => event.stopPropagation()}
                            onTouchMove={(event) => event.stopPropagation()}
                            className="max-h-84 divide-y divide-slate-200 overflow-y-auto"
                          >
                            {matchedStations.map((station) => {
                              const bookingUrl =
                                station.status === 'open'
                                  ? resolveStationBookingUrl(station)
                                  : null

                              return (
                                <li
                                  key={`result-${station.id}`}
                                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate text-lg font-semibold leading-tight text-brand-dark">
                                      {station.name}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                      {station.location}
                                    </p>
                                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                                      {station.status === 'open'
                                        ? 'Station ouverte'
                                        : 'Bientot disponible'}
                                    </p>
                                  </div>

                                  {bookingUrl ? (
                                    <a
                                      href={bookingUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label={`Reserver maintenant pour ${station.name}`}
                                      className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue px-4 text-sm font-semibold text-white shadow-[0_14px_30px_-20px_rgba(30,144,255,0.9)] transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                                    >
                                      Reserver maintenant
                                    </a>
                                  ) : (
                                    <span className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-500">
                                      Lien a venir
                                    </span>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        ) : (
                          <div className="px-4 py-6 text-center">
                            <p className="text-sm font-semibold text-brand-dark">
                              Aucun resultat similaire
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              Aucun resultat pour &quot;{normalizedQuery}&quot;. Essayez un autre mot-cle.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue px-5 text-sm font-semibold text-white shadow-[0_14px_32px_-20px_rgba(30,144,255,0.85)] hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                    aria-label="Appliquer la recherche"
                  >
                    RECHERCHE
                  </button>
                </form>
              </div>
            </div>

            {stationsForMap.length > 0 ? (
              <Suspense
                fallback={
                  <LoadingState
                    className="h-116 w-full rounded-[1.2rem]"
                    title="Chargement de la carte"
                    description="Affichage des stations en cours..."
                  />
                }
              >
                <MapView stations={stationsForMap} height={560} showLearnMore={false} />
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
