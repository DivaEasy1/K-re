import type { Metadata } from 'next'
import { Camera, Mail, MapPin, Phone, Share2 } from 'lucide-react'

import settingsData from '@/data/settings.json'
import stationsData from '@/data/stations.json'
import type { Settings, Station } from '@/types'
import PageTransition from '@/components/layout/PageTransition'
import ContactForm from '@/components/contact/ContactForm'
import ContactMap from '@/components/contact/ContactMap'

const settings = settingsData as Settings
const stations = stationsData as Station[]
const mainStation =
  stations.find((station) => station.name === 'Le Bois-Plage-en-Ré') ?? stations[0]

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez K-Ré pour vos questions, informations pratiques et partenariats.',
  openGraph: {
    title: 'Contact K-Ré',
    description: "Besoin d'aide ? Écrivez à l'équipe Kayak en Ré.",
    url: 'https://www.kayak-en-re.fr/contact',
    images: [
      'https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800',
    ],
  },
}

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(30,144,255,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(255,165,0,0.12),transparent_33%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <header className="gsap-reveal rounded-4xl border border-white/60 bg-white/75 p-6 shadow-[0_20px_45px_-30px_rgba(10,22,40,0.45)] backdrop-blur sm:p-8">
                <p className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
                  Assistance K-Ré
                </p>
                <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
                  Contactez-nous
                </h1>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Une question sur une station, une activité ou la réservation ?
                  Notre équipe vous répond rapidement.
                </p>
              </header>

              <div className="gsap-reveal space-y-3 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="flex items-start gap-3 text-sm text-slate-700">
                  <MapPin className="mt-0.5 h-5 w-5 text-brand-blue" />
                  <span>
                    {settings.contact.address}
                    <br />
                    {settings.contact.city}
                  </span>
                </p>
                <p className="flex items-center gap-3 text-sm text-slate-700">
                  <Phone className="h-5 w-5 text-brand-blue" />
                  <a
                    href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}
                    className="hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    {settings.contact.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3 text-sm text-slate-700">
                  <Mail className="h-5 w-5 text-brand-blue" />
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    {settings.contact.email}
                  </a>
                </p>
                <div className="pt-2">
                  <p className="text-sm font-semibold text-brand-dark">Réseaux sociaux</p>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={settings.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Kayak en Ré"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      <Share2 className="h-4 w-4" />
                    </a>
                    <a
                      href={settings.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Kayak en Ré"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/15 text-amber-600 hover:bg-brand-gold hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                    >
                      <Camera className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <ContactMap station={mainStation} />
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
