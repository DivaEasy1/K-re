import { ArrowRight } from 'lucide-react'

const steps = [
  {
    id: '01',
    icon: '📱',
    title: 'RESERVEZ',
    description: 'Reservation en ligne, puis reception de votre code par SMS.',
  },
  {
    id: '02',
    icon: '🔓',
    title: 'DEVERROUILLEZ',
    description: 'Utilisez votre code pour deverrouiller kayak ou paddle.',
  },
  {
    id: '03',
    icon: '🚣',
    title: 'PAGAYEZ',
    description: 'Profitez, puis retournez et verrouillez votre equipement.',
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
          Comment ca marche ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Une experience fluide de la reservation au retour du materiel.
        </p>

        <div className="gsap-stagger mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.id}
              data-gsap-hover
              className="gsap-card relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(10,22,40,0.55)]"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
