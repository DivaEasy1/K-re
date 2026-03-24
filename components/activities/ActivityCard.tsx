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
    label: 'Intermédiaire',
    variant: 'warning' as const,
  },
  hard: {
    label: 'Difficile',
    variant: 'destructive' as const,
  },
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  const diff = difficultyStyles[activity.difficulty]

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Card className="group h-full overflow-hidden">
        <div className="relative h-44">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/20 to-transparent" />
          <div className="absolute left-4 top-4 text-4xl" aria-hidden>
            {activity.icon}
          </div>
        </div>
        <CardContent className="pt-5">
          <h3 className="font-heading text-xl font-bold tracking-tight text-brand-dark">
            {activity.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {activity.description}
          </p>
        </CardContent>
        <CardFooter className="mt-auto flex flex-wrap items-center gap-2 pt-0">
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
