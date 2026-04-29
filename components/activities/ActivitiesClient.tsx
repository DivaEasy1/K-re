'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import type { Activity } from '@/types'
import ActivityCard from '@/components/activities/ActivityCard'
import ActivitiesFilter from '@/components/activities/ActivitiesFilter'
import { Button } from '@/components/ui/button'

interface ActivitiesClientProps {
  activities: Activity[]
}

export default function ActivitiesClient({ activities }: ActivitiesClientProps) {
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities)
  const gridRef = useRef<HTMLDivElement>(null)

  const getMotionProfile = () => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    return {
      cardDuration: mobile ? 0.42 : 0.56,
      cardY: mobile ? 12 : 18,
      cardStagger: mobile ? 0.045 : 0.07,
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = gridRef.current?.querySelectorAll<HTMLElement>('[data-gsap-item]')
    if (!cards?.length) return
    const motion = getMotionProfile()

    gsap.killTweensOf(cards)
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: motion.cardY, scale: 0.988 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: motion.cardDuration,
        stagger: motion.cardStagger,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [filteredActivities.length])

  return (
    <div className="space-y-8">
      {/* Filters & Grid Section */}
      <section className="gsap-reveal rounded-4xl border border-white/70 bg-white/92 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">
              Affiner votre recherche
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {filteredActivities.length} resultat{filteredActivities.length !== 1 ? 's' : ''}
            </p>
          </div>
          <ActivitiesFilter
            activities={activities}
            onFiltersChange={setFilteredActivities}
          />
        </div>

        {/* Grid */}
        {filteredActivities.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredActivities.map((activity) => (
              <div key={activity.id} data-gsap-item className="h-full">
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold text-slate-600">
              Aucune activite ne correspond a vos criteres
            </p>
            <Button
              onClick={() => setFilteredActivities(activities)}
              variant="outline"
              className="mt-4"
            >
              Reinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Tip */}
        <div className="rounded-2xl border border-brand-blue/12 bg-brand-blue/[0.07] p-4 text-sm text-slate-700">
          <p className="inline-flex items-center gap-2 font-semibold text-brand-dark">
            <span>💡 Astuce K-Re</span>
          </p>
          <p className="mt-1 leading-relaxed">
            Pour une experience fluide, arrivez 15 minutes avant votre depart et prevoyez une
            tenue legere resistant aux eclaboussures.
          </p>
        </div>
      </section>
    </div>
  )
}
