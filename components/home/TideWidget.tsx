import { Clock3, SquareArrowOutUpRight, Waves } from 'lucide-react'

const TIDE_WIDGET_URL =
  'https://services.data.shom.fr/hdm/vignette/grande/SAINT-MARTIN_DE_RE?locale=fr'

const iframeDocument = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script src="${TIDE_WIDGET_URL}"></script>
  </body>
</html>`

export default function TideWidget() {
  return (
    <section id="marees-live" className="relative bg-brand-light/55 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-5">
          <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
            <Waves className="h-3.5 w-3.5" aria-hidden />
            Marees
          </p>
          <h2 className="section-heading font-heading text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Horaires des marees
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Consultez rapidement les heures, hauteurs et coefficients du jour pour
            Saint-Martin-de-Re.
          </p>
        </div>

        <div className="rounded-3xl border border-brand-dark/12 bg-white/95 p-4 shadow-[0_20px_45px_-34px_rgba(10,22,40,0.5)] backdrop-blur sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
            <div className="order-2 rounded-2xl border border-slate-200 bg-white p-4 lg:order-1">
              <h3 className="font-heading text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">
                Heures du jour
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Saint-Martin-de-Re (Ile de Re) - horaires, hauteurs et coefficients du jour.
              </p>

              <div className="mt-4 space-y-2">
                <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <Clock3 className="h-4 w-4 text-brand-blue" aria-hidden />
                  Vue quotidienne priorisee
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <Waves className="h-4 w-4 text-brand-blue" aria-hidden />
                  Interface epuree
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 mt-5 text-sm text-slate-700">
                  <a 
                  href="https://maree.info/126"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profiter de l'interface complete sur maree.info">
                  Plusieurs informations!
                </a>
                <SquareArrowOutUpRight className="h-4 w-4 text-brand-blue" aria-hidden />
                </p>
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-2xl border border-slate-200 bg-white lg:order-2">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600">
                Tableau du jour
              </div>

              <div className="h-100 overflow-hidden sm:h-120 lg:h-110">
                <iframe
                  title="Horaires des marees - Ile de Re"
                  srcDoc={iframeDocument}
                  className="h-245 w-210 origin-top-left translate-x-1 -translate-y-30.5 scale-[0.44] bg-white sm:w-220 sm:-translate-x-2.5 sm:-translate-y-31.5 sm:scale-[0.58] lg:h-245 lg:w-full lg:translate-x-0 lg:-translate-y-30 lg:scale-100"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin"
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
