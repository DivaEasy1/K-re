interface TimelineEntry {
  year: number
  title: string
  description: string
}

export default function Timeline({ items }: { items: TimelineEntry[] }) {
  return (
    <section className="gsap-reveal rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="mx-auto w-fit rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
        Déploiement
      </p>
      <h2 className="section-heading mt-4 text-center font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
        K-Ré 2023 → 2028
      </h2>

      <div className="relative mt-12">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-linear-to-b from-brand-blue via-brand-gold to-slate-200 md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-10">
          {items.map((entry, index) => {
            const right = index % 2 === 1
            return (
              <article
                key={`${entry.year}-${entry.title}`}
                data-gsap-hover
                className="gsap-card relative md:grid md:grid-cols-2"
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
