import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Entrepreneuse',
    content:
      'Une expérience incroyable! Le système est tellement simple et les stations parfaitement équipées. Je reviens toutes les semaines.',
    rating: 5,
    image: '🧑‍💼',
  },
  {
    id: 2,
    name: 'Thomas Martin',
    role: 'Touriste',
    content:
      'Premier kayak de ma vie. L\'équipe était super accueillante et les pagaies de qualité. Réservation en 2 minutes, c\'est fou!',
    rating: 5,
    image: '👨‍🎤',
  },
  {
    id: 3,
    name: 'Sophie Leclerc',
    role: 'Amie nature',
    content:
      'J\'adore découvrir les marais avec K-Ré. L\'accès autonome rend les choses tellement flexibles. Merci pour ce service!',
    rating: 5,
    image: '👩‍🦰',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(30,144,255,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,165,0,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
            Avis clients
          </p>
          <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Ce qu&apos;en pensent nos pagayeurs
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Rejoignez des milliers de clients satisfaits qui découvrent l&apos;Île de Ré en kayak.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="gsap-reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(10,22,40,0.1)] hover:shadow-[0_12px_40px_-8px_rgba(10,22,40,0.15)] transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{testimonial.image}</div>
                <div className="flex gap-1">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-gold text-brand-gold"
                      />
                    ))}
                </div>
              </div>

              <p className="mb-4 text-slate-700 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              <div>
                <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
