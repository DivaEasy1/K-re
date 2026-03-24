'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Ship, Users, Waves } from 'lucide-react'

import type { Station } from '@/types'
import { BLUR_DATA_URL, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

function equipmentLabel(equipment: string) {
  if (equipment === 'kayak_tandem') {
    return {
      icon: <Users className="h-4 w-4" aria-hidden />,
      label: 'Kayak tandem',
    }
  }
  if (equipment === 'kayak_solo') {
    return {
      icon: <Ship className="h-4 w-4" aria-hidden />,
      label: 'Kayak solo',
    }
  }
  return { icon: <Waves className="h-4 w-4" aria-hidden />, label: 'Paddle' }
}

export default function StationCard({ station }: { station: Station }) {
  const open = station.status === 'open'

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Card className="group overflow-hidden border-slate-200/80 shadow-sm transition-shadow hover:shadow-xl">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={station.image}
            alt={`Station ${station.name}`}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/15 to-transparent opacity-70 transition-opacity group-hover:opacity-85" />
          <Badge
            variant={open ? 'success' : 'muted'}
            className="absolute left-4 top-4"
            aria-label={open ? 'Station ouverte' : 'Station bientôt disponible'}
          >
            {open ? 'Ouvert' : 'Bientôt'}
          </Badge>
        </div>
        <CardContent className="space-y-3 pt-5">
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold tracking-tight text-brand-dark">
              {station.name}
            </h3>
            <p className="text-sm text-slate-600">{station.location}</p>
          </div>
          <p className="text-sm font-medium text-brand-blue">Ouverture: {station.openYear}</p>
          <div className="flex flex-wrap gap-2">
            {station.equipment.map((item) => {
              const eq = equipmentLabel(item)
              return (
                <span
                  key={`${station.id}-${item}`}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1 text-xs font-medium text-brand-dark'
                  )}
                >
                  {eq.icon}
                  {eq.label}
                </span>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
