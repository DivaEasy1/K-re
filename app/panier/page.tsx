import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import PageTransition from '@/components/layout/PageTransition'
import PanierClient from '@/components/panier/PanierClient'

export const metadata: Metadata = {
  title: 'Mon Panier',
  description: 'Consultez et gerez les activites de votre panier',
}

export default function PanierPage() {
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
              Shopping
            </p>
            <div className="relative">
              <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
                Mon Panier
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                Consultez et gerez les activites reservees. Vous pouvez modifier les quantites et passer la commande.
              </p>
            </div>
          </header>

          <PanierClient />
        </div>
      </section>
    </PageTransition>
  )
}
