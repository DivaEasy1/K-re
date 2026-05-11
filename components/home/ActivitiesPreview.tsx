import Link from 'next/link'

import type { Activity } from '@/types'
import ActivityCard from '@/components/activities/ActivityCard'

export default function ActivitiesPreview({ activities }: { activities: Activity[] }) {
  return (
    <section className="bg-brand-light/70 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-brand-gold/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
              Experiences
            </p>
            <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Nos activites
            </h2>
          </div>
          <Link
            href="/activities"
            className="rounded-full border border-brand-blue/20 bg-white px-4 py-2 text-sm font-semibold text-brand-blue hover:border-brand-blue/50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Voir toutes les activites →
          </Link>
        </div>
        <div className="mt-8 rounded-3xl border border-brand-blue/20 bg-white/60 backdrop-blur p-12 text-center">
          <p className="text-lg font-medium text-slate-700 mb-3">
            Les activités seront bientôt disponibles
          </p>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Nous préparons une sélection curatée d'expériences premium pour enrichir votre séjour. Revenez nous voir très prochainement pour découvrir des aventures inoubliables sur l'île de Ré.
          </p>
        </div>
      </div>
    </section>
  )
}
