import type { Metadata } from 'next'

import settingsData from '@/data/settings.json'
import type { Activity, Settings } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import HeroSection from '@/components/layout/HeroSection'
import ActivitiesClient from '@/components/activities/ActivitiesClient'
import { fetchActivities } from '@/lib/api'

const defaultSettings: Settings = {
  siteName: 'Kayak en Re',
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

const settings = (settingsData || defaultSettings) as Settings

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
  title: 'Activites',
  description:
    'Decouvrez les activites K-Re: coucher de soleil, marais salants, regates et experiences gourmandes.',
  openGraph: {
    title: 'Activites K-Re',
    description:
      "Toutes nos activites kayak et paddle sur l'ile de Re, pour tous les niveaux.",
    url: 'https://www.kayak-en-re.fr/activities',
    images: [
      'https://images.pexels.com/photos/7753828/pexels-photo-7753828.jpeg?auto=compress&cs=tinysrgb&w=1800',
    ],
  },
}

export default async function ActivitiesPage() {
  const activities = await getActivitiesData()

  return (
    <PageTransition>
      <HeroSection
        variant="activities"
        title={<>Activités <span className="bg-linear-to-r from-brand-gold to-amber-400 bg-clip-text text-transparent">premium</span></>}
        subtitle="Explorez nos expériences uniques : détente, nature, gastronomie et aventure. Tous les niveaux, du débutant au confirmé."
        badge="✨ Sélection Curatée"
        backgroundImage="https://images.pexels.com/photos/7753828/pexels-photo-7753828.jpeg?auto=compress&cs=tinysrgb&w=1800"
        stats={[
          { label: 'activités', value: activities.length.toString() },
          { label: 'niveaux', value: '3' },
          { label: 'expériences', value: 'variées' },
        ]}
        cta={[
          { label: 'Découvrir', href: '#activities-grid', variant: 'primary' },
          { label: 'Réserver', href: settings.bookingUrl, variant: 'secondary' },
        ]}
      />
      <section id="activities-grid" className="relative mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ActivitiesClient activities={activities} bookingUrl={settings.bookingUrl} />
      </section>
    </PageTransition>
  )
}
