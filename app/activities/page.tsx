import type { Metadata } from 'next'
import Link from 'next/link'

import settingsData from '@/data/settings.json'
import type { Settings } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/layout/HeroSection'
import { Button } from '@/components/ui/button'

const defaultSettings: Settings = {
  siteName: 'K-re',
  tagline: 'L\'aventure aquatique en toute liberte',
  contact: {
    address: '',
    city: '',
    phone: '',
    email: '',
  },
  social: {
    facebook: '',
    instagram: '',
  },
  bookingUrl: 'https://www.kayakomat.com',
  kayakomatStats: {
    countries: 0,
    stations: 0,
    stationsFrance: 0,
    paddlers: 0,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const settings = (settingsData || defaultSettings) as Settings

export const metadata: Metadata = {
  title: 'Activites',
  description:
    'Decouvrez les activites K-Re: coucher de soleil, marais salants, regates et experiences gourmandes.',
  openGraph: {
    title: 'Activites K-Re',
    description:
      "Toutes nos activites kayak et paddle sur l'ile de Re, pour tous les niveaux.",
    url: 'https://www.k-re.fr/activities',
    images: [
      '/images/activities-hero.jpeg',
    ],
  },
}

export default async function ActivitiesPage() {
  return (
    <PageTransition>
      <HeroSection
        variant="activities"
        title={<>Activités <span className="bg-linear-to-r from-brand-gold to-amber-400 bg-clip-text text-transparent">premium</span></>}
        subtitle="Découvrez bientôt nos expériences uniques : détente, nature, gastronomie et aventure."
        badge="✨ À venir"
        backgroundImage="/images/activities-hero.jpeg"
        stats={[
          { label: 'nouvelles', value: 'bientôt' },
          { label: 'niveaux', value: 'tous' },
          { label: 'expériences', value: 'premium' },
        ]}
        cta={[
          { label: 'Retour à l\'accueil', href: '/', variant: 'primary' },
          { label: 'Réserver', href: '#activities-grid', variant: 'secondary' },
        ]}
      />
      <section id="activities-grid" className="relative mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-3xl border border-brand-blue/20 bg-white/60 backdrop-blur p-12 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Les activités seront bientôt disponibles</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Nous préparons une sélection curatée d&apos;expériences premium pour enrichir votre séjour. Découvrez des aventures inoubliables sur l&apos;île de Ré : sorties en kayak thématiques, dégustations gastronomiques, explorations naturelles et bien d&apos;autres surprises.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Revenez nous voir prochainement pour réserver votre expérience idéale.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/contact">
                Nous contacter pour réserver
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
