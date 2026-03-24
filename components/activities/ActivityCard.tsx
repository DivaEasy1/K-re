'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import type { Activity } from '@/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const difficultyStyles = {
  easy: {
    label: 'Facile',
    variant: 'success' as const,
  },
  medium: {
    label: 'Intermediaire',
    variant: 'warning' as const,
  },
  hard: {
    label: 'Difficile',
    variant: 'destructive' as const,
  },
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  const diff = difficultyStyles[activity.difficulty]
  const isRemoteImage = activity.image.startsWith('http')

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="gsap-card h-full transform-gpu"
    >
      <Card className="group relative h-full overflow-hidden border-white/80 bg-white/95 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.6)] transition-shadow hover:shadow-[0_22px_50px_-24px_rgba(10,22,40,0.75)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,165,0,0.12)_46%,transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative h-44 overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            unoptimized={isRemoteImage}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/25 to-transparent" />
          <div
            className="absolute left-4 top-4 rounded-2xl border border-white/30 bg-white/15 px-2 py-1 text-3xl backdrop-blur"
            aria-hidden
          >
            {activity.icon}
          </div>
        </div>

        <CardContent className="pt-5">
          <h3 className="font-heading text-xl font-bold tracking-tight text-brand-dark">
            {activity.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {activity.description}
          </p>
        </CardContent>

        <CardFooter className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <Badge variant="outline">{activity.duration}</Badge>
          <Badge variant={diff.variant}>{diff.label}</Badge>
          <Badge variant="default" className="bg-brand-gold text-brand-dark">
            {activity.price}
          </Badge>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
