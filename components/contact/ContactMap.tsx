'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import type { Station } from '@/types'
import LoadingState from '@/components/ui/loading-state'

const MapView = dynamic(() => import('@/components/stations/MapView'), {
  ssr: false,
})

export default function ContactMap({ station }: { station: Station }) {
  return (
    <Suspense
      fallback={
        <LoadingState
          className="h-[280px] w-full rounded-3xl"
          title="Chargement de la carte locale"
          description="Localisation de la station en cours..."
        />
      }
    >
      <MapView
        stations={[station]}
        height={280}
        center={[station.lat, station.lng]}
        zoom={13}
        showLearnMore={false}
      />
    </Suspense>
  )
}
