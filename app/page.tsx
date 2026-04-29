import type { Metadata } from 'next'
import Link from 'next/link'
import { CircleCheckBig, MessageSquareText, TimerReset } from 'lucide-react'

import settings from '@/data/settings.json'
import stationsData from '@/data/stations.json'
import type { Activity, Station } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import Hero from '@/components/home/Hero'
import TideWidget from '@/components/home/TideWidget'
import HomeMapSection from '@/components/home/HomeMapSection'
import Concept from '@/components/home/Concept'
import HowItWorks from '@/components/home/HowItWorks'
import KeyNumbers from '@/components/home/KeyNumbers'
import StationsPreview from '@/components/home/StationsPreview'
import ActivitiesPreview from '@/components/home/ActivitiesPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterForm from '@/components/home/NewsletterForm'
import { Button } from '@/components/ui/button'
import { fetchActivities } from '@/lib/api'

const stations = stationsData as Station[]

async function getActivitiesData() {
  try {
    const activities = await fetchActivities()
    return activities as Activity[]
  } catch (error) {
    console.error('Failed to fetch activities:', error)
    return [] as Activity[]
  }
}

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    "K-Re, location autonome de kayak et paddle sur l'ile de Re. Reservez, deverrouillez, pagayez.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kayak en Re | Accueil',
    description:
      "Decouvrez le concept K-Re: stations en libre-service et activites nautiques sur l'ile de Re.",
    url: 'https://www.kayak-en-re.fr',
    images: [
      'https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayak en Re | Accueil',
    description: "Location autonome de kayak et paddle sur l'ile de Re.",
    images: [
      'https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800',
    ],
  },
}
export default async function HomePage() {
  const activities = await getActivitiesData()
  return (
    <PageTransition>
      <Hero />
      <HomeMapSection stations={stations} />
      <TideWidget />
      <Concept />
      <HowItWorks />
      <KeyNumbers />
      <StationsPreview stations={stations} />
      <ActivitiesPreview activities={activities} />
      <TestimonialsSection />

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(27,160,226,0.18),transparent_32%),radial-gradient(circle_at_86%_82%,rgba(248,180,0,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 overflow-hidden rounded-4xl border border-brand-dark/10 bg-white/88 p-6 shadow-[0_26px_60px_-38px_rgba(10,22,40,0.55)] backdrop-blur sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-brand-blue/15 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
                Newsletter K-Re
              </p>
              <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
                Recevez les nouveautes et les meilleurs moments pour sortir
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Une courte dose d&apos;infos utiles sur les stations, les idees de balades et les
                temps forts a ne pas manquer sur l&apos;ile de Re.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  Nouveautes des stations
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  Conseils sortie
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  Infos saison
                </span>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                Restez informe
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Pas de spam, juste l&apos;essentiel pour profiter de K-Re au bon moment.
              </p>
              <div className="mt-5">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(30,144,255,0.3),transparent_33%),radial-gradient(circle_at_85%_80%,rgba(255,165,0,0.23),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gsap-reveal grid gap-7 overflow-hidden rounded-4xl border border-brand-dark/10 bg-brand-dark p-6 text-white shadow-ocean sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
                Derniere etape
              </p>
              <h2 className="section-heading font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Pret a pagayer ?
              </h2>
              <p className="mt-3 max-w-2xl text-slate-200">{settings.tagline}</p>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <MessageSquareText className="h-5 w-5 text-brand-gold" aria-hidden />
                  <p className="mt-2 text-sm font-medium">Code recu par SMS</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <TimerReset className="h-5 w-5 text-brand-gold" aria-hidden />
                  <p className="mt-2 text-sm font-medium">Depart rapide</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <CircleCheckBig className="h-5 w-5 text-brand-gold" aria-hidden />
                  <p className="mt-2 text-sm font-medium">Retour simple</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">
                Reservation express
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Choisissez votre station, recevez votre code, et partez pagayer en
                toute autonomie.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-brand-gold text-brand-dark shadow-[0_16px_40px_-20px_rgba(255,165,0,0.95)] hover:bg-amber-300"
                >
                  <Link href="/stations" aria-label="Voir les stations">
                    Reserver maintenant
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-white/40 bg-white/5 text-white hover:bg-white/15"
                >
                  <Link href="/activities" aria-label="Voir toutes les activites">
                    Voir les activites
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
