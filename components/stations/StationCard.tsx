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
  const isRemoteImage = station.image.startsWith('http')

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="gsap-card h-full transform-gpu"
    >
      <Card className="group relative h-full overflow-hidden border-white/80 bg-white/95 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.6)] transition-shadow hover:shadow-[0_22px_50px_-24px_rgba(10,22,40,0.75)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(30,144,255,0.1)_46%,transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative h-52 overflow-hidden">
          <Image
            src={station.image}
            alt={`Station ${station.name}`}
            fill
            unoptimized={isRemoteImage}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/25 to-transparent opacity-90" />
          <Badge
            variant={open ? 'success' : 'muted'}
            className="absolute left-4 top-4 shadow-sm"
            aria-label={open ? 'Station ouverte' : 'Station bientot disponible'}
          >
            {open ? 'Ouvert' : 'Bientot'}
          </Badge>
          <div className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {station.openYear}
          </div>
        </div>

        <CardContent className="space-y-3 pt-5">
          <div className="space-y-1">
            <h3 className="font-heading text-xl font-bold tracking-tight text-brand-dark">
              {station.name}
            </h3>
            <p className="text-sm text-slate-600">{station.location}</p>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {station.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {station.equipment.map((item) => {
              const equipment = equipmentLabel(item)
              return (
                <span
                  key={`${station.id}-${item}`}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border border-brand-blue/12 bg-brand-light px-2.5 py-1 text-xs font-medium text-brand-dark'
                  )}
                >
                  {equipment.icon}
                  {equipment.label}
                </span>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
