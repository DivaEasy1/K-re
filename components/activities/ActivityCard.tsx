'use client'

import Image from 'next/image'

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

const categoryLabels = {
  leisure: 'Loisir',
  nature: 'Nature',
  gastronomy: 'Gastronomie',
  sport: 'Sport',
} as const

export default function ActivityCard({ activity }: { activity: Activity }) {
  const diff = difficultyStyles[activity.difficulty]
  const category =
    categoryLabels[activity.category as keyof typeof categoryLabels] ?? 'Experience'

  return (
    <div className="gsap-card h-full transform-gpu transition-transform duration-200 hover:-translate-y-1">
      <Card className="group relative flex h-full flex-col overflow-hidden border-white/80 bg-white/95 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.6)] transition-shadow hover:shadow-[0_22px_50px_-24px_rgba(10,22,40,0.75)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,165,0,0.12)_46%,transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative h-44 overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            quality={70}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-brand-dark/25 to-transparent" />
          <div
            className="absolute left-4 top-4 rounded-2xl border border-white/30 bg-white/15 px-2 py-1 text-3xl backdrop-blur"
            aria-hidden
          >
            {activity.icon}
          </div>
          <div className="absolute right-4 top-4 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {category}
          </div>
        </div>

        <CardContent className="flex-1 pt-5">
          <h3 className="min-h-14 font-heading text-xl font-bold tracking-tight text-brand-dark">
            {activity.title}
          </h3>
          <p className="mt-2 min-h-22 line-clamp-3 text-sm leading-relaxed text-slate-600">
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
    </div>
  )
}
