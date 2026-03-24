import type { Metadata } from 'next'

import stationsData from '@/data/stations.json'
import settingsData from '@/data/settings.json'
import type { Settings, Station } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import StationsClient from '@/components/stations/StationsClient'

const stations = stationsData as Station[]
const settings = settingsData as Settings
const openCount = stations.filter((station) => station.status === 'open').length
const comingSoonCount = stations.length - openCount
const nextOpeningYear = stations
  .filter((station) => station.status === 'coming_soon')
  .reduce((year, station) => Math.min(year, station.openYear), Number.POSITIVE_INFINITY)

export const metadata: Metadata = {
  title: 'Stations',
  description:
    "Retrouvez toutes les stations K-Re sur l'ile de Re et leurs disponibilites.",
  openGraph: {
    title: 'Stations K-Re',
    description:
      "Carte interactive et liste des stations K-Re ouvertes ou a venir sur l'ile de Re.",
    url: 'https://www.kayak-en-re.fr/stations',
    images: [
      'https://images.pexels.com/photos/34054794/pexels-photo-34054794.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  },
}

export default function StationsPage() {
  const upcomingYear =
    Number.isFinite(nextOpeningYear) && comingSoonCount > 0
      ? Math.trunc(nextOpeningYear)
      : null

  return (
    <PageTransition>
      <section
        className="relative overflow-hidden py-12 sm:py-16"
        data-gsap-parallax-root
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(30,144,255,0.2),transparent_32%),radial-gradient(circle_at_87%_12%,rgba(255,165,0,0.2),transparent_31%),radial-gradient(circle_at_40%_95%,rgba(10,22,40,0.12),transparent_40%)]" />
        <div
          className="pointer-events-none absolute left-[6%] top-24 h-24 w-24 rounded-full border border-brand-blue/25 bg-white/35 backdrop-blur-sm"
          data-gsap-parallax
          data-parallax-depth="18"
        />
        <div
          className="pointer-events-none absolute right-[8%] top-40 h-16 w-16 rounded-2xl border border-amber-200/80 bg-amber-100/50"
          data-gsap-parallax
          data-parallax-depth="24"
        />
        <div className="relative mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <header className="gsap-reveal relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_26px_65px_-42px_rgba(10,22,40,0.7)] backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute -right-28 -top-28 h-56 w-56 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-52 w-52 rounded-full bg-brand-gold/15 blur-3xl" />
            <p className="mb-3 inline-flex rounded-full border border-brand-blue/15 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Reseau K-Re
            </p>
            <div className="relative grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
                  Trouvez votre station en quelques secondes
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                  Carte dynamique, filtres rapides et infos claires: tout est pense
                  pour reserver votre sortie en un clin d&apos;oeil.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-brand-success/20 bg-brand-success/10 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/90">
                    Ouvertes
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-700">{openCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                    Bientot
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-800">{comingSoonCount}</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-brand-blue/15 bg-gradient-to-r from-brand-blue/10 to-sky-100/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                    Prochaine ouverture
                  </p>
                  <p className="mt-1 text-xl font-bold text-brand-dark">
                    {upcomingYear ? `Prevue en ${upcomingYear}` : 'Calendrier en cours'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <StationsClient stations={stations} bookingUrl={settings.bookingUrl} />
        </div>
      </section>
    </PageTransition>
  )
}
