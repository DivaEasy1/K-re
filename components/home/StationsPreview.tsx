import Link from 'next/link'

import type { Station } from '@/types'
import StationCard from '@/components/stations/StationCard'

export default function StationsPreview({ stations }: { stations: Station[] }) {
  const topStations = stations.slice(0, 3)

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Reseau local
            </p>
            <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Nos stations sur l&apos;ile
            </h2>
          </div>
          <Link
            href="/stations"
            className="rounded-full border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue hover:border-brand-blue/50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Voir toutes les stations →
          </Link>
        </div>
        <div className="gsap-stagger mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topStations.map((station) => (
            <div key={station.id}>
              <StationCard station={station} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
