import type { Metadata } from 'next'

import activitiesData from '@/data/activities.json'
import settings from '@/data/settings.json'
import stationsData from '@/data/stations.json'
import type { Activity, Station } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import Hero from '@/components/home/Hero'
import Concept from '@/components/home/Concept'
import HowItWorks from '@/components/home/HowItWorks'
import KeyNumbers from '@/components/home/KeyNumbers'
import StationsPreview from '@/components/home/StationsPreview'
import ActivitiesPreview from '@/components/home/ActivitiesPreview'
import { Button } from '@/components/ui/button'

const stations = stationsData as Station[]
const activities = activitiesData as Activity[]

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    "K-Ré, location autonome de kayak et paddle sur l'Île de Ré. Réservez, déverrouillez, pagayez.",
  openGraph: {
    title: 'Kayak en Ré | Accueil',
    description:
      "Découvrez le concept K-Ré: stations en libre-service et activités nautiques sur l'Île de Ré.",
    url: 'https://www.kayak-en-re.fr',
    images: ['/images/hero-bg.jpg'],
  },
}

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Concept />
      <HowItWorks />
      <KeyNumbers />
      <StationsPreview stations={stations} />
      <ActivitiesPreview activities={activities} />

      <section className="bg-brand-dark py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à pagayer ?
            </h2>
            <p className="mt-2 text-slate-200">{settings.tagline}</p>
          </div>
          <Button asChild size="lg" className="bg-brand-gold text-brand-dark hover:bg-amber-400">
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver sur Kayakomat"
            >
              Réserver
            </a>
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}
