'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    id: '01',
    icon: '📱',
    title: 'RÉSERVEZ',
    description: 'Réservation en ligne, puis réception de votre code par SMS.',
  },
  {
    id: '02',
    icon: '🔓',
    title: 'DÉVERROUILLEZ',
    description: 'Utilisez votre code pour déverrouiller kayak ou paddle.',
  },
  {
    id: '03',
    icon: '🚣',
    title: 'PAGAYEZ',
    description: 'Profitez, puis retournez et verrouillez votre équipement.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mx-auto w-fit rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
          Parcours client
        </p>
        <h2 className="section-heading mt-4 text-center font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Comment ça marche ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Une expérience fluide de la réservation au retour du matériel.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.55)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-blue/8" />
              <span className="absolute right-5 top-5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
                {step.id}
              </span>
              <div className="text-4xl" aria-hidden>
                {step.icon}
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-brand-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
              {index < steps.length - 1 ? (
                <ArrowRight
                  className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-brand-gold lg:block"
                  aria-hidden
                />
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
