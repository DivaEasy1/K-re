'use client'

import { motion } from 'framer-motion'

interface TimelineEntry {
  year: number
  title: string
  description: string
}

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
          Déploiement K-Ré 2023 → 2028
        </h2>
        <div className="relative mt-12">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-10">
            {items.map((entry, index) => {
              const right = index % 2 === 1
              return (
                <motion.article
                  key={`${entry.year}-${entry.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                  className="relative md:grid md:grid-cols-2"
                >
                  <div
                    className={`md:px-8 ${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}
                  >
                    <div className="ml-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:ml-0">
                      <span className="inline-flex rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white">
                        {entry.year}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-bold tracking-tight text-brand-dark">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                  <span className="absolute left-4 top-6 inline-block h-3 w-3 -translate-x-1/2 rounded-full bg-brand-gold md:left-1/2" />
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
