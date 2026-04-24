import { Quote, ShieldCheck, Sparkles, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Entrepreneuse',
    content:
      "Une experience incroyable ! Le systeme est simple, fluide, et les stations sont tres bien equipees. Je reviens des que j'ai envie d'une sortie rapide.",
    rating: 5,
    initials: 'MD',
    highlight: 'Reservation ultra simple',
  },
  {
    id: 2,
    name: 'Thomas Martin',
    role: 'Touriste',
    content:
      "Premier kayak de ma vie. Tout etait tres clair, du choix de la station jusqu'au depart. En quelques minutes, j'etais sur l'eau.",
    rating: 5,
    initials: 'TM',
    highlight: 'Parfait pour debuter',
  },
  {
    id: 3,
    name: 'Sophie Leclerc',
    role: 'Amie nature',
    content:
      "J'adore explorer les marais avec K-Re. L'acces autonome change vraiment tout : plus de liberte, moins d'attente, et une sortie bien plus flexible.",
    rating: 5,
    initials: 'SL',
    highlight: 'Liberte totale',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(27,160,226,0.16),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(248,180,0,0.14),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 inline-flex rounded-full border border-brand-blue/15 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
            Avis clients
          </p>
          <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Ce qu&apos;en pensent nos pagayeurs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Des retours simples, enthousiastes, et tres souvent les memes mots :
            rapide, fluide, pratique.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_-30px_rgba(10,22,40,0.35)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-brand-blue/10 p-2 text-brand-blue">
                <Star className="h-5 w-5 fill-brand-gold text-brand-gold" aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-dark">4,9/5</p>
                <p className="text-sm text-slate-600">Note moyenne ressentie</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_-30px_rgba(10,22,40,0.35)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-600">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-dark">Rapide</p>
                <p className="text-sm text-slate-600">Reservation et depart sans friction</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_-30px_rgba(10,22,40,0.35)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-400/15 p-2 text-amber-600">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-dark">Autonome</p>
                <p className="text-sm text-slate-600">Une sortie plus libre du debut a la fin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="gsap-reveal group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_20px_50px_-34px_rgba(10,22,40,0.45)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-34px_rgba(10,22,40,0.52)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-brand-blue/10 via-transparent to-brand-gold/10 opacity-80" />

              <div className="relative mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark text-sm font-bold tracking-[0.18em] text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
                      {testimonial.highlight}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-brand-gold text-brand-gold"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <Quote className="mb-3 h-8 w-8 text-brand-blue/22" aria-hidden />
                <p className="text-lg leading-relaxed text-slate-700">
                  {testimonial.content}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4">
                <div>
                  <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Avis verifie
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
