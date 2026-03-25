'use client'

import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

import settings from '@/data/settings.json'

const numbers = [
  { value: settings.kayakomatStats.countries, label: 'Pays' },
  { value: settings.kayakomatStats.stations, label: 'Stations Kayakomat' },
  { value: settings.kayakomatStats.stationsFrance, label: 'Stations en France' },
  { value: settings.kayakomatStats.paddlers, label: 'Pagayeurs' },
]

export default function KeyNumbers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 text-white" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(30,144,255,0.28),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,165,0,0.24),transparent_30%)]" />
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mx-auto w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
          Réseau Kayakomat
        </p>
        <h2 className="section-heading mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Les chiffres qui parlent
        </h2>
        <p className="mt-3 text-sm text-slate-200 sm:text-base">
          Leader mondial de location de sports de pagaie
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((stat, idx) => (
            <div
              key={stat.label}
              data-gsap-hover
              className="gsap-card rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur"
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              <p className="text-4xl font-bold tracking-tight text-brand-gold">
                {inView ? <CountUp end={stat.value} duration={2.2} separator=" " /> : '0'}
                {stat.label === 'Pagayeurs' ? '+' : ''}
              </p>
              <p className="mt-2 text-sm text-slate-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
