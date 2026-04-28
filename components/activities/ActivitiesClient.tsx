'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { Sparkles } from 'lucide-react'

import type { Activity } from '@/types'
import ActivityCard from '@/components/activities/ActivityCard'
import ActivitiesFilter from '@/components/activities/ActivitiesFilter'
import { Button } from '@/components/ui/button'

interface ActivitiesClientProps {
  activities: Activity[]
  bookingUrl: string
}

export default function ActivitiesClient({
  activities,
  bookingUrl,
}: ActivitiesClientProps) {
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities)
  const gridRef = useRef<HTMLDivElement>(null)

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      leisure: 0,
      nature: 0,
      gastronomy: 0,
      sport: 0,
    }

    activities.forEach((activity) => {
      if (activity.category in counts) {
        counts[activity.category] += 1
      }
    })

    return counts
  }, [activities])

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
      {/* Info Section */}
      <section className="gsap-reveal rounded-4xl border border-white/70 bg-white/90 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Selection premium
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
              Une collection d&apos;activites nettes, modernes et memorables
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Choisissez votre ambiance, filtrez en instantane et trouvez le parcours ideal pour
              votre niveau.
            </p>
          </div>

          <div className="w-full max-w-xs space-y-3 sm:w-auto">
            <Button asChild className="w-full bg-brand-dark hover:bg-slate-900">
              <Link href={bookingUrl} target="_blank" rel="noreferrer">
                Reserver sur Kayakomat
              </Link>
            </Button>
            <div
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-700"
            >
              Niveau conseille: debutant a confirme selon le parcours choisi.
            </div>
          </div>
        </div>

        {/* Category Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div
              key={category}
              className="rounded-2xl border border-brand-blue/15 bg-brand-blue/10 p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                {category}
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-dark">{count}</p>
            </div>
          ))}
        </div>
      </section>

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
