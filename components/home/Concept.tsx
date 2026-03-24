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
    <section className="bg-brand-light py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative h-80 overflow-hidden rounded-3xl shadow-ocean sm:h-110">
          <Image
            src="/images/activities/marais.jpg"
            alt="Pagaie sur les marais de l'île de Ré"
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Un concept simple et innovant
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Avec K-Ré, profitez d&apos;une location autonome de kayaks et paddles en
            quelques minutes. Vous partez quand vous voulez, à votre rythme.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {conceptPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
              >
                <div className="rounded-full bg-brand-blue/10 p-2 text-brand-blue">
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
