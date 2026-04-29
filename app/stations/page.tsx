import type { Metadata } from 'next'

import stationsData from '@/data/stations.json'
import settingsData from '@/data/settings.json'
import type { Settings, Station } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/layout/HeroSection'
import StationsClient from '@/components/stations/StationsClient'

const stations = stationsData as Station[]
const settings = settingsData as Settings
const openCount = stations.filter((station) => station.status === 'open').length
const comingSoonCount = stations.length - openCount

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

  return (
    <PageTransition>
      <HeroSection
        variant="stations"
        title={<>Nos <span className="bg-linear-to-r from-brand-blue to-sky-400 bg-clip-text text-transparent">stations</span> sur l&apos;île</>}
        subtitle="Retrouvez nos points d'accès en libre-service répartis stratégiquement sur l'île de Ré. Carte, horaires et réservations en direct."
        badge="🗺️ Réseau K-Ré"
        backgroundImage="https://images.pexels.com/photos/34054794/pexels-photo-34054794.jpeg?auto=compress&cs=tinysrgb&w=1600"
        stats={[
          { label: 'ouvertes', value: openCount.toString() },
          { label: 'à venir', value: comingSoonCount.toString() },
        ]}
        cta={[
          { label: 'Voir la carte', href: '#stations-map', variant: 'primary' },
          { label: 'Réserver', href: settings.bookingUrl, variant: 'secondary' },
        ]}
      />
      <section id="stations-map" className="relative mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <StationsClient stations={stations} />
      </section>
    </PageTransition>
  )
}
