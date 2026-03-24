import type { Metadata } from 'next'

import activitiesData from '@/data/activities.json'
import type { Activity } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import ActivitiesClient from '@/components/activities/ActivitiesClient'

const activities = activitiesData as Activity[]

export const metadata: Metadata = {
  title: 'Activités',
  description:
    "Découvrez les activités K-Ré: coucher de soleil, marais salants, régates et expériences gourmandes.",
  openGraph: {
    title: 'Activités K-Ré',
    description:
      "Toutes nos activités kayak et paddle sur l'Île de Ré, pour tous les niveaux.",
    url: 'https://www.kayak-en-re.fr/activities',
    images: ['/images/activities/sunset.jpg'],
  },
}

export default function ActivitiesPage() {
  return (
    <PageTransition>
      <section className="py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <header className="space-y-3">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Nos activités
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">
              Programmes loisir, nature, gastronomie et sport pour vivre
              l&apos;île de Ré autrement.
            </p>
          </header>
          <ActivitiesClient activities={activities} />
        </div>
      </section>
    </PageTransition>
  )
}
