import type { Metadata } from 'next'

import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/layout/HeroSection'
import StationsClientWrapper from '@/components/stations/StationsClientWrapper'
import { getMergedStations } from '@/lib/stations'
import type { Station } from '@/types'


export const metadata: Metadata = {
  title: 'K-re | Stations',
  description:
    "Retrouvez toutes les stations K-Re sur l'ile de Re et leurs disponibilites.",
  openGraph: {
    title: 'Stations K-Re',
    description:
      "Carte interactive et liste des stations K-Re ouvertes ou a venir sur l'ile de Re.",
    url: 'https://k-re.fr/stations',
    images: [
      '/images/stations-hero.jpeg',
    ],
  },
}

export default async function StationsPage() {
  let stations: Station[] = []
  let fetchError = false

  try {
    stations = await getMergedStations()
  } catch (e) {
    fetchError = true
  }

  const openCount = stations.filter((station) => station.status === 'open').length
  const comingSoonCount = stations.filter((station) => station.status === 'coming_soon').length

  return (
    <PageTransition>
      <HeroSection
        variant="stations"
        title={<>Nos <span className="bg-linear-to-r from-brand-blue to-sky-400 bg-clip-text text-transparent">stations</span> sur l&apos;île</>}
        subtitle="Retrouvez nos points d'accès en libre-service répartis stratégiquement sur l'île de Ré. Carte, horaires et réservations en direct."
        badge="🗺️ Réseau K-Ré"
        backgroundImage="/images/stations-hero.jpeg"
        stats={[
          { label: 'ouvertes', value: openCount.toString() },
          { label: 'à venir', value: comingSoonCount.toString() },
        ]}
        cta={[
          { label: 'Voir la carte', href: '#stations-map', variant: 'primary' },
          { label: 'Réserver', href: '#stations-list', variant: 'secondary' },
        ]}
      />
      <section id="stations-map" className="relative mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {fetchError ? (
          <div className="rounded-2xl border border-rose-300/50 bg-rose-50/60 p-8 text-center text-rose-700">
            Stations Non trouvé
          </div>
        ) : (
          <StationsClientWrapper stations={stations} />
        )}
      </section>
    </PageTransition>
  )
}
