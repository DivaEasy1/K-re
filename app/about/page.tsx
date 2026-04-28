import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

import stationsData from '@/data/stations.json'
import type { Station } from '@/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/layout/HeroSection'
import Timeline from '@/components/about/Timeline'

const stations = stationsData as Station[]

const timelineItems = [
  {
    year: 2023,
    title: "Lancement de La Rochelle - L'Houmeau",
    description: stations.find((s) => s.openYear === 2023)?.description ?? '',
  },
  {
    year: 2025,
    title: 'Ouverture de Rivedoux-Plage',
    description: stations.find((s) => s.openYear === 2025)?.description ?? '',
  },
  {
    year: 2026,
    title: 'Deploiement au Bois-Plage-en-Re',
    description: stations.find((s) => s.openYear === 2026)?.description ?? '',
  },
  {
    year: 2027,
    title: "Expansion vers le nord de l'ile",
    description: 'Deux nouvelles stations prevues a Saint-Clement et Les Portes.',
  },
  {
    year: 2028,
    title: 'Reseau insulaire consolide',
    description: 'Loix et Saint-Martin-de-Re completent la couverture K-Re.',
  },
]

export const metadata: Metadata = {
  title: 'A propos',
  description: "L'histoire de K-Re et son integration dans le reseau franchise Kayakomat.",
  openGraph: {
    title: 'A propos de K-Re',
    description: "Notre histoire, nos valeurs et la vision Kayakomat sur l'Ile de Re.",
    url: 'https://www.kayak-en-re.fr/about',
    images: [
      'https://images.pexels.com/photos/8151592/pexels-photo-8151592.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  },
}

export default function AboutPage() {
  return (
    <PageTransition>
      <HeroSection
        variant="about"
        title={<>Notre <span className="bg-linear-to-r from-brand-blue to-brand-gold bg-clip-text text-transparent">histoire</span></>}
        subtitle="K-Ré est née d'une ambition simple : rendre les sports de pagaie accessibles, autonomes et mémorables pour tous les amoureux de l'île."
        badge="📖 Notre Voyage"
        backgroundImage="/images/stations/Rivedoux.png"
        cta={[
          { label: 'Découvrir l\'aventure', href: '#timeline', variant: 'primary' },
        ]}
      />
      <div className="relative mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="grid items-stretch gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <article className="gsap-reveal relative overflow-hidden rounded-4xl border border-white/70 bg-white/94 p-6 shadow-[0_24px_56px_-38px_rgba(10,22,40,0.65)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-brand-blue/8 blur-3xl" />
            <h2 className="section-heading relative font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Une aventure locale, une vision internationale
            </h2>
            <div className="relative mt-5 space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                Notre equipe locale developpe des stations integrees a l&apos;environnement
                cotier et a la vie insulaire. Chaque implantation est pensee pour preserver
                les sites naturels et offrir une experience fluide aux visiteurs comme aux residents.
              </p>
              <p>
                En rejoignant le reseau Kayakomat, K-Re beneficie du savoir-faire du leader
                mondial de la location libre-service des sports de pagaie.
              </p>
            </div>
            <div className="relative mt-6 inline-flex rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-2 text-sm font-semibold text-brand-blue">
              Developpement raisonne sur l&apos;Ile de Re
            </div>
          </article>

          <article className="gsap-reveal group relative h-80 overflow-hidden rounded-4xl border border-white/70 shadow-[0_24px_56px_-34px_rgba(10,22,40,0.75)] sm:h-107.5">
            <Image
              src="https://images.pexels.com/photos/34054794/pexels-photo-34054794.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Station K-Re en bord de mer"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
              quality={70}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-dark/70 via-brand-dark/12 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <p className="rounded-full border border-white/30 bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                Franchise Kayakomat
              </p>
              <p className="rounded-full border border-white/30 bg-white/12 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                Ile de Re
              </p>
            </div>
          </article>
        </section>

        <section id="timeline">
          <Timeline items={timelineItems} />
        </section>

        <section className="gsap-reveal rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="section-heading text-center font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Nos valeurs
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md">
              <Sparkles className="mx-auto h-7 w-7 text-brand-blue" />
              <h3 className="mt-3 font-semibold">Innovation utile</h3>
              <p className="mt-2 text-sm text-slate-600">
                Un service autonome pense pour etre simple et fiable.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md">
              <ShieldCheck className="mx-auto h-7 w-7 text-brand-blue" />
              <h3 className="mt-3 font-semibold">Securite</h3>
              <p className="mt-2 text-sm text-slate-600">
                Des equipements controles et des parcours adaptes.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md">
              <Globe2 className="mx-auto h-7 w-7 text-brand-blue" />
              <h3 className="mt-3 font-semibold">Impact reduit</h3>
              <p className="mt-2 text-sm text-slate-600">
                Une activite douce, respectueuse des milieux naturels.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md">
              <HeartHandshake className="mx-auto h-7 w-7 text-brand-blue" />
              <h3 className="mt-3 font-semibold">Convivialite</h3>
              <p className="mt-2 text-sm text-slate-600">
                Une aventure partagee en famille, entre amis ou en solo.
              </p>
            </article>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
