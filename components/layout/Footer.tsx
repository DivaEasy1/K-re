import Link from 'next/link'
import { Camera, Mail, MapPin, Phone, Share2 } from 'lucide-react'

import settings from '@/data/settings.json'

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-brand-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(30,144,255,0.25),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,165,0,0.2),transparent_35%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            <span className="text-brand-blue">Kayak</span>{' '}
            <span className="text-brand-gold">en Ré</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-slate-200">{settings.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-slate-200">
          <p className="font-semibold text-white">Contact</p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-brand-gold" />
            <span>
              {settings.contact.address}
              <br />
              {settings.contact.city}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-brand-gold" />
            <a
              href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}
              className="hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {settings.contact.phone}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-brand-gold" />
            <a
              href={`mailto:${settings.contact.email}`}
              className="hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {settings.contact.email}
            </a>
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Suivez-nous</p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href={settings.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Page Facebook Kayak en Ré"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href={settings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-gold hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Page Instagram Kayak en Ré"
            >
              <Camera className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-300">
            Franchise Kayakomat - Leader mondial de location de sports de pagaie
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block text-sm font-medium text-brand-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            Une question ? Contactez-nous
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-300 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Kayak en Ré. Tous droits réservés.
      </div>
    </footer>
  )
}
