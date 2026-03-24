import Image from 'next/image'
import { Leaf, Smile, Sparkles, Wallet, Waves, Wind } from 'lucide-react'

import { BLUR_DATA_URL } from '@/lib/utils'

const conceptPoints = [
  { icon: Sparkles, label: 'Original' },
  { icon: Wind, label: 'En plein air' },
  { icon: Waves, label: 'Simple' },
  { icon: Leaf, label: 'Non polluant' },
  { icon: Smile, label: 'Amusant' },
  { icon: Wallet, label: 'Economique' },
]

export default function Concept() {
  return (
    <section className="bg-brand-light/80 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative h-80 overflow-hidden rounded-4xl border border-white/60 shadow-ocean sm:h-115">
          <Image
            src="https://images.pexels.com/photos/4705199/pexels-photo-4705199.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Pagaie sur les marais de l'ile de Re"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading="lazy"
            quality={70}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark/50 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Nature preservee - Ile de Re
          </p>
        </div>

        <div className="gsap-reveal rounded-4xl bg-white/80 p-6 shadow-[0_20px_45px_-30px_rgba(10,22,40,0.45)] backdrop-blur sm:p-8">
          <p className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
            Notre difference
          </p>
          <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Un concept simple et innovant
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Avec K-Re, profitez d&apos;une location autonome de kayaks et paddles en
            quelques minutes. Vous partez quand vous voulez, a votre rythme.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {conceptPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
              >
                <div className="rounded-full bg-brand-blue/10 p-2 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <span className="font-medium text-brand-dark">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
