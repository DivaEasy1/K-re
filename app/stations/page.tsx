import type { Metadata } from 'next'

import stationsData from '@/data/stations.json'
import type { Station } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import StationsClient from '@/components/stations/StationsClient'

const stations = stationsData as Station[]

export const metadata: Metadata = {
  title: 'Stations',
  description:
    "Retrouvez toutes les stations K-Ré sur l'Île de Ré et leurs disponibilités.",
  openGraph: {
    title: 'Stations K-Ré',
    description:
      "Carte interactive et liste des stations K-Ré ouvertes ou à venir sur l'Île de Ré.",
    url: 'https://www.kayak-en-re.fr/stations',
    images: ['/images/stations/bois-plage.jpg'],
  },
}

export default function StationsPage() {
  return (
    <PageTransition>
      <section className="py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          <header className="space-y-3">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Nos stations sur l&apos;île
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">
              Explorez la carte interactive des stations K-Ré. Vérifiez en un clin
              d&apos;oeil les points ouverts et les nouvelles implantations à venir.
            </p>
          </header>
          <StationsClient stations={stations} />
        </div>
      </section>
    </PageTransition>
  )
}
