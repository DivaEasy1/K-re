'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import type { Activity } from '@/types'
import ActivityCard from '@/components/activities/ActivityCard'
import { Button } from '@/components/ui/button'

type Filter = 'all' | 'leisure' | 'nature' | 'gastronomy' | 'sport'

const labels: Record<Filter, string> = {
  all: 'Toutes',
  leisure: 'Loisir',
  nature: 'Nature',
  gastronomy: 'Gastronomie',
  sport: 'Sport',
}

export default function ActivitiesClient({ activities }: { activities: Activity[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const filteredActivities = useMemo(() => {
    if (filter === 'all') return activities
    return activities.filter((activity) => activity.category === filter)
  }, [activities, filter])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(labels) as Filter[]).map((value) => (
          <Button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            variant={filter === value ? 'default' : 'outline'}
            className={filter === value ? 'bg-brand-blue' : ''}
            aria-label={`Filtrer les activités: ${labels[value]}`}
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
        {filteredActivities.map((activity) => (
          <motion.div
            key={activity.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
