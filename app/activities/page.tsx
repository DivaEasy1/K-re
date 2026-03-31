import type { Metadata } from 'next'
import Image from 'next/image'

import activitiesData from '@/data/activities.json'
import settingsData from '@/data/settings.json'
import type { Activity, Settings } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import ActivitiesClient from '@/components/activities/ActivitiesClient'

const activities = activitiesData as Activity[]
const settings = settingsData as Settings
const sportCount = activities.filter((activity) => activity.category === 'sport').length
const natureCount = activities.filter((activity) => activity.category === 'nature').length
const featuredActivities = activities.slice(0, 3)
const heroImage =
  activities[0]?.image ??
  'https://images.pexels.com/photos/7753828/pexels-photo-7753828.jpeg?auto=compress&cs=tinysrgb&w=1800'

export const metadata: Metadata = {
  title: 'Activites',
  description:
    'Decouvrez les activites K-Re: coucher de soleil, marais salants, regates et experiences gourmandes.',
  openGraph: {
    title: 'Activites K-Re',
    description:
      "Toutes nos activites kayak et paddle sur l'ile de Re, pour tous les niveaux.",
    url: 'https://www.kayak-en-re.fr/activities',
    images: [heroImage],
  },
}

export default function ActivitiesPage() {
  return (
    <PageTransition>
      <section
        className="relative overflow-hidden py-12 sm:py-16"
        data-gsap-parallax-root
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,165,0,0.26),transparent_30%),radial-gradient(circle_at_88%_14%,rgba(30,144,255,0.18),transparent_33%),radial-gradient(circle_at_48%_92%,rgba(10,22,40,0.12),transparent_42%)]" />
        <div
          className="pointer-events-none absolute left-[7%] top-20 h-20 w-20 rounded-full border border-amber-200/85 bg-amber-50/55 backdrop-blur-sm"
          data-gsap-parallax
          data-parallax-depth="20"
        />
        <div
          className="pointer-events-none absolute right-[6%] top-44 h-14 w-14 rotate-6 rounded-xl border border-brand-blue/30 bg-brand-blue/10"
          data-gsap-parallax
          data-parallax-depth="26"
        />

        <div className="relative mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <header className="gsap-reveal relative overflow-hidden rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_26px_65px_-42px_rgba(10,22,40,0.7)] backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute -right-28 -top-24 h-52 w-52 rounded-full bg-brand-gold/18 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl" />
            <p className="mb-3 inline-flex rounded-full border border-brand-gold/25 bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
              Experiences K-Re
            </p>
            <div className="relative grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
                  Activites premium avec photos reelles
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                  Chaque experience presente une photo authentique et une ambiance claire:
                  nature, gourmandise, challenge ou moment detente.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-brand-blue/20 bg-brand-blue/10 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                    Activites
                  </p>
                  <p className="mt-1 text-2xl font-bold text-brand-dark">{activities.length}</p>
                </div>
                <div className="rounded-2xl border border-brand-gold/30 bg-amber-100/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    Parcours sport
                  </p>
                  <p className="mt-1 text-2xl font-bold text-amber-700">{sportCount}</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50/85 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Evasion nature
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-800">{natureCount} sorties dediees</p>
                </div>
              </div>
            </div>
          </header>

          <section className="gsap-reveal grid gap-4 md:grid-cols-3">
            {featuredActivities.map((activity) => (
              <article
                key={activity.id}
                data-gsap-hover
                className="group relative overflow-hidden rounded-[1.6rem] border border-white/75 shadow-[0_20px_50px_-34px_rgba(10,22,40,0.75)]"
              >
                <div className="relative h-64">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    quality={70}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/85 via-brand-dark/35 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                      Photo reelle
                    </p>
                    <h2 className="mt-2 font-heading text-xl font-bold tracking-tight">
                      {activity.title}
                    </h2>
                    <p className="mt-1 text-sm text-white/90">{activity.duration} - {activity.price}</p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <ActivitiesClient activities={activities} bookingUrl={settings.bookingUrl} />
        </div>
      </section>
    </PageTransition>
  )
}
