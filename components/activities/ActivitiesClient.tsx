'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { Compass, Filter, Sparkles } from 'lucide-react'

import type { Activity } from '@/types'
import { cn } from '@/lib/utils'
import ActivityCard from '@/components/activities/ActivityCard'
import { Button } from '@/components/ui/button'

type FilterKey = 'all' | 'leisure' | 'nature' | 'gastronomy' | 'sport'
type CategoryKey = Exclude<FilterKey, 'all'>

const labels: Record<FilterKey, string> = {
  all: 'Toutes',
  leisure: 'Loisir',
  nature: 'Nature',
  gastronomy: 'Gastronomie',
  sport: 'Sport',
}

interface ActivitiesClientProps {
  activities: Activity[]
  bookingUrl: string
}

export default function ActivitiesClient({
  activities,
  bookingUrl,
}: ActivitiesClientProps) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const chipRefs = useRef<Record<FilterKey, HTMLButtonElement | null>>({
    all: null,
    leisure: null,
    nature: null,
    gastronomy: null,
    sport: null,
  })

  const filteredActivities = useMemo(() => {
    if (filter === 'all') return activities
    return activities.filter((activity) => activity.category === filter)
  }, [activities, filter])

  const categoryCounts = useMemo<Record<CategoryKey, number>>(() => {
    const initial: Record<CategoryKey, number> = {
      leisure: 0,
      nature: 0,
      gastronomy: 0,
      sport: 0,
    }

    activities.forEach((activity) => {
      if (activity.category in initial) {
        const key = activity.category as CategoryKey
        initial[key] += 1
      }
    })

    return initial
  }, [activities])

  const getMotionProfile = () => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    return {
      chipDuration: mobile ? 0.3 : 0.45,
      cardDuration: mobile ? 0.42 : 0.56,
      cardY: mobile ? 12 : 18,
      cardStagger: mobile ? 0.045 : 0.07,
      indicatorDuration: mobile ? 0.24 : 0.34,
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chips = filterRef.current?.querySelectorAll<HTMLElement>('[data-gsap-chip]')
    if (!chips?.length) return
    const motion = getMotionProfile()

    gsap.fromTo(
      chips,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.chipDuration,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [])

  useEffect(() => {
    const container = filterRef.current
    const indicator = indicatorRef.current
    const activeChip = chipRefs.current[filter]
    if (!container || !indicator || !activeChip) return

    const syncIndicator = (animate: boolean) => {
      const x = activeChip.offsetLeft
      const y = activeChip.offsetTop
      const width = activeChip.offsetWidth
      const height = activeChip.offsetHeight

      const target = { x, y, width, height }
      if (animate) {
        const motion = getMotionProfile()
        gsap.to(indicator, {
          ...target,
          duration: motion.indicatorDuration,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      } else {
        gsap.set(indicator, target)
      }
    }

    syncIndicator(false)
    const raf = window.requestAnimationFrame(() => syncIndicator(true))
    const onResize = () => syncIndicator(false)
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [filter])

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
  }, [filter, filteredActivities.length])

  return (
    <div className="space-y-8">
      <section className="gsap-reveal rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
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
              data-gsap-hover
            >
              Niveau conseille: debutant a confirme selon le parcours choisi.
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(categoryCounts) as CategoryKey[]).map((category) => (
            <div
              key={category}
              className="rounded-2xl border border-brand-blue/15 bg-brand-blue/10 p-3"
              data-gsap-hover
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                {labels[category]}
              </p>
              <p className="mt-1 text-2xl font-bold text-brand-dark">{categoryCounts[category]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gsap-reveal rounded-[2rem] border border-white/70 bg-white/92 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="max-w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div
              ref={filterRef}
              className="relative inline-flex min-w-max items-center gap-1 rounded-full border border-slate-200 bg-slate-100/85 p-1"
            >
              <span
                ref={indicatorRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 rounded-full bg-brand-dark shadow-[0_12px_26px_-18px_rgba(10,22,40,0.8)]"
              />
              {(Object.keys(labels) as FilterKey[]).map((value) => (
                <Button
                  key={value}
                  type="button"
                  data-gsap-chip
                  ref={(el) => {
                    chipRefs.current[value] = el
                  }}
                  onClick={() => setFilter(value)}
                  variant={filter === value ? 'default' : 'outline'}
                  className={cn(
                    'relative z-10 h-10 border-transparent px-4',
                    filter === value
                      ? 'bg-transparent text-white hover:bg-transparent'
                      : 'bg-transparent text-slate-700 hover:bg-white/60 hover:text-brand-dark'
                  )}
                  aria-label={`Filtrer les activites: ${labels[value]}`}
                >
                  {labels[value]}
                </Button>
              ))}
            </div>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            <Filter className="h-4 w-4" aria-hidden />
            {filteredActivities.length} activite{filteredActivities.length > 1 ? 's' : ''}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredActivities.map((activity) => (
            <div key={activity.id} data-gsap-item>
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>

        <div
          className="mt-5 rounded-2xl border border-brand-blue/12 bg-brand-blue/[0.07] p-4 text-sm text-slate-700"
          data-gsap-hover
        >
          <p className="inline-flex items-center gap-2 font-semibold text-brand-dark">
            <Compass className="h-4 w-4" aria-hidden />
            Astuce K-Re
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
