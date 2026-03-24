import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

import settingsData from '@/data/settings.json'
import stationsData from '@/data/stations.json'
import type { Settings, Station } from '@/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import PageTransition from '@/components/layout/PageTransition'
import Timeline from '@/components/about/Timeline'

const settings = settingsData as Settings
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
    title: 'Déploiement au Bois-Plage-en-Ré',
    description: stations.find((s) => s.openYear === 2026)?.description ?? '',
  },
  {
    year: 2027,
    title: 'Expansion vers le nord de l’île',
    description: "Deux nouvelles stations prévues à Saint-Clément et Les Portes.",
  },
  {
    year: 2028,
    title: 'Réseau insulaire consolidé',
    description: 'Loix et Saint-Martin-de-Ré complètent la couverture K-Ré.',
  },
]

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "L'histoire de K-Ré et son intégration dans le réseau franchise Kayakomat.",
  openGraph: {
    title: 'À propos de K-Ré',
    description: "Notre histoire, nos valeurs et la vision Kayakomat sur l'Île de Ré.",
    url: 'https://www.kayak-en-re.fr/about',
    images: ['/images/stations/la-rochelle.jpg'],
  },
}

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="py-16">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <header className="space-y-3">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              L&apos;histoire de K-Ré
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">
              K-Ré est né d&apos;une ambition claire: rendre les sports de pagaie
              simples, accessibles et autonomes pour tous les amoureux de l&apos;Île
              de Ré.
            </p>
          </header>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-slate-700">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-dark">
                Une aventure locale, une vision internationale
              </h2>
              <p className="leading-relaxed">
                Notre équipe locale développe des stations parfaitement intégrées à
                l&apos;environnement côtier et à la vie insulaire. Chaque nouvelle
                implantation est pensée pour préserver les sites naturels et offrir
                une expérience fluide aux visiteurs comme aux résidents.
              </p>
              <p className="leading-relaxed">
                En rejoignant le réseau Kayakomat, K-Ré bénéficie du savoir-faire
                du leader mondial de la location libre-service des sports de
                pagaie.
              </p>
            </div>
            <div className="relative h-80 overflow-hidden rounded-3xl shadow-ocean sm:h-[420px]">
              <Image
                src="/images/stations/bois-plage.jpg"
                alt="Station K-Ré en bord de mer"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          </div>

          <section className="rounded-3xl bg-brand-dark p-8 text-white">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Franchise Kayakomat
            </h2>
            <p className="mt-3 max-w-3xl text-slate-200">
              Un réseau solide qui prouve la fiabilité du modèle, au service
              d&apos;une expérience nautique libre et responsable.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold text-brand-gold">
                  {settings.kayakomatStats.countries}
                </p>
                <p className="text-sm text-slate-100">Pays</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold text-brand-gold">
                  {settings.kayakomatStats.stations}
                </p>
                <p className="text-sm text-slate-100">Stations Kayakomat</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold text-brand-gold">
                  {settings.kayakomatStats.stationsFrance}
                </p>
                <p className="text-sm text-slate-100">Stations en France</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-3xl font-bold text-brand-gold">
                  {settings.kayakomatStats.paddlers.toLocaleString('fr-FR')}+
                </p>
                <p className="text-sm text-slate-100">Pagayeurs</p>
              </div>
            </div>
          </section>

          <Timeline items={timelineItems} />

          <section>
            <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Nos valeurs
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <Sparkles className="mx-auto h-7 w-7 text-brand-blue" />
                <h3 className="mt-3 font-semibold">Innovation utile</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Un service autonome pensé pour être simple et fiable.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <ShieldCheck className="mx-auto h-7 w-7 text-brand-blue" />
                <h3 className="mt-3 font-semibold">Sécurité</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Des équipements contrôlés et des parcours adaptés.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <Globe2 className="mx-auto h-7 w-7 text-brand-blue" />
                <h3 className="mt-3 font-semibold">Impact réduit</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Une activité douce, respectueuse des milieux naturels.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <HeartHandshake className="mx-auto h-7 w-7 text-brand-blue" />
                <h3 className="mt-3 font-semibold">Convivialité</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Une aventure partagée en famille, entre amis ou en solo.
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </PageTransition>
  )
}
