'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

import settings from '@/data/settings.json'
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
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Kayaks sur la côte de l'île de Ré"
        fill
        priority
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-brand-dark/85 via-brand-dark/60 to-brand-dark/75" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-20 text-center text-white sm:px-6 lg:px-8"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur"
        >
          🏝️ Île de Ré, France
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          L&apos;aventure kayak
          <span className="block bg-linear-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent">
            en toute liberté
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
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="bg-brand-gold text-brand-dark hover:bg-amber-400">
            <a
              href={settings.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Réserver maintenant sur Kayakomat"
            >
              Réserver maintenant
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/50 bg-white/10 text-white hover:bg-white/20">
            <Link href="/stations" aria-label="Découvrir les stations">
              Découvrir nos stations
            </Link>
          </Button>
        </motion.div>
      </motion.div>

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
