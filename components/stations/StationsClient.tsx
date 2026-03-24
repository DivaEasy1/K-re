'use client'

import { Suspense, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

import type { Station } from '@/types'
import StationCard from '@/components/stations/StationCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const MapView = dynamic(() => import('@/components/stations/MapView'), {
  ssr: false,
})

type Filter = 'all' | 'open' | 'coming_soon'

const labels: Record<Filter, string> = {
  all: 'Toutes',
  open: 'Ouvertes',
  coming_soon: 'Bientôt',
}

export default function StationsClient({ stations }: { stations: Station[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const filteredStations = useMemo(() => {
    if (filter === 'all') return stations
    return stations.filter((station) => station.status === filter)
  }, [stations, filter])

  return (
    <div className="space-y-10">
      <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-3xl" />}>
        <MapView stations={stations} height={500} />
      </Suspense>

      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(labels) as Filter[]).map((value) => (
          <Button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            variant={filter === value ? 'default' : 'outline'}
            className={filter === value ? 'bg-brand-blue' : ''}
            aria-label={`Filtrer les stations: ${labels[value]}`}
          >
            {labels[value]}
          </Button>
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredStations.map((station) => (
          <motion.div
            key={station.id}
            id={`station-${station.id}`}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <StationCard station={station} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
