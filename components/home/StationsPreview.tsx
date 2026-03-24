'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import type { Station } from '@/types'
import StationCard from '@/components/stations/StationCard'

export default function StationsPreview({ stations }: { stations: Station[] }) {
  const topStations = stations.slice(0, 3)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Nos stations sur l&apos;île
          </h2>
          <Link
            href="/stations"
            className="text-sm font-semibold text-brand-blue hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Voir toutes les stations →
          </Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {topStations.map((station) => (
            <motion.div
              key={station.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <StationCard station={station} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
