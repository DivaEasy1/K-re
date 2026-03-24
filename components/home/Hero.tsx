'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

import settings from '@/data/settings.json'
import stationsData from '@/data/stations.json'
import type { Station } from '@/types'
import { BLUR_DATA_URL } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const stations = stationsData as Station[]
  const openStations = stations.filter((station) => station.status === 'open').length

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="https://images.pexels.com/photos/7615952/pexels-photo-7615952.jpeg?auto=compress&cs=tinysrgb&w=1800"
        alt="Kayaks sur la cote de l'ile de Re"
        data-hero-media
        fill
        sizes="100vw"
        quality={72}
        preload
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-brand-dark/88 via-brand-dark/52 to-brand-dark/82" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,144,255,0.35),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(255,165,0,0.28),transparent_38%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        data-hero-content
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 text-center text-white sm:px-6 lg:px-8"
      >
        <motion.span
          variants={item}
          className="glass-panel rounded-full px-4 py-1.5 text-sm font-semibold"
        >
          Ile de Re, France
        </motion.span>

        <motion.h1
          variants={item}
          className="section-heading mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
        >
          L&apos;aventure kayak
          <span className="block bg-linear-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent">
            en toute liberte
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg"
        >
          {settings.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/90 sm:text-sm"
        >
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            {openStations} stations ouvertes
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            Reservation en 2 minutes
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            Sans file d&apos;attente
          </span>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-brand-gold text-brand-dark shadow-[0_16px_40px_-20px_rgba(255,165,0,0.95)] hover:bg-amber-300"
          >
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reserver maintenant sur Kayakomat"
            >
              Reserver maintenant
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/50 bg-white/10 text-white hover:bg-white/20"
          >
            <Link href="/stations" aria-label="Decouvrir les stations">
              Decouvrir nos stations
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute left-[7%] top-[26%] hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur lg:block floating">
        Reservation par SMS
      </div>
      <div className="pointer-events-none absolute right-[8%] top-[34%] hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur lg:block floating">
        Stations 24/7
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-white"
      >
        <ChevronDown className="h-8 w-8" aria-hidden />
      </motion.div>

      <svg
        viewBox="0 0 1440 180"
        className="absolute bottom-0 left-0 h-25 w-full text-brand-light md:h-35"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,133.3C1200,128,1320,96,1380,80L1440,64L1440,181L1380,181C1320,181,1200,181,1080,181C960,181,840,181,720,181C600,181,480,181,360,181C240,181,120,181,60,181L0,181Z"
        />
      </svg>
    </section>
  )
}
