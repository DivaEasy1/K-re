'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import type { Station } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

const MapView = dynamic(() => import('@/components/stations/MapView'), {
  ssr: false,
})

export default function ContactMap({ station }: { station: Station }) {
  return (
    <Suspense fallback={<Skeleton className="h-[280px] w-full rounded-3xl" />}>
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
