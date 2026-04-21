import type { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions fréquemment posées sur K-Ré et nos services de location de kayak.',
  openGraph: {
    title: 'FAQ | Kayak en Ré',
    description: 'Trouvez les réponses à vos questions sur K-Ré.',
    url: 'https://www.kayak-en-re.fr/faq',
  },
}

const faqs = [
  {
    id: 1,
    question: 'Comment réserver un kayak?',
    answer:
      'C\'est simple! Rendez-vous sur notre site ou l\'appli Kayakomat, choisissez votre station et votre créneau, puis payez en ligne. Vous recevrez un code SMS que vous utiliserez pour récupérer votre kayak à la station.',
  },
  {
    id: 2,
    question: 'Quel est l\'âge minimum pour pagayer?',
    answer:
      'L\'âge minimum est 8 ans pour les enfants. Les moins de 12 ans doivent être accompagnés d\'un adulte. Les gilets de sauvetage enfants sont fournis.',
  },
  {
    id: 3,
    question: 'Y a-t-il des leçons ou formations?',
    answer:
      'Oui! Nous proposons des sessions d\'initiation gratuites et des ateliers payants. Contactez-nous pour plus de détails sur les dates et horaires.',
  },
  {
    id: 4,
    question: 'Que se passe-t-il en cas de mauvais temps?',
    answer:
      'La sécurité est notre priorité. En cas de conditions météo dangereuses, votre réservation peut être reportée gratuitement ou remboursée.',
  },
  {
    id: 5,
    question: 'Puis-je louer pour une journée complète?',
    answer:
      'Absolument! Nous proposons des forfaits de 1h, 2h, 1/2 journée, journée complète et même plusieurs jours pour les groupes et les entreprises.',
  },
  {
    id: 6,
    question: 'Quel équipement est fourni?',
    answer:
      'Kayak/paddle, gilet de sauvetage, pagaie, et sac étanche inclus. Des accessoires supplémentaires (vêtements thermiques, etc.) sont disponibles à la location.',
  },
  {
    id: 7,
    question: 'Y a-t-il un annulation gratuite?',
    answer:
      'Les annulations effectuées 24h avant la réservation sont remboursées à 100%. Au-delà, des frais de 20% s\'appliquent.',
  },
  {
    id: 8,
    question: 'Puis-je explorer seul ou dois-je être en groupe?',
    answer:
      'Vous pouvez explorer seul ou en groupe! Nos stations sont parfaites pour les aventures en solitaire comme pour les sorties en famille ou entre amis.',
  },
]

export default function FAQPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(30,144,255,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(255,165,0,0.12),transparent_33%)]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="gsap-reveal mb-12 text-center">
            <p className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
              Questions fréquentes
            </p>
            <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Questions & Réponses
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Trouvez les réponses aux questions les plus courantes sur K-Ré.
            </p>
          </header>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.id} faq={faq} index={index} />
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-6 text-center">
            <p className="font-semibold text-brand-dark mb-2">Vous ne trouvez pas votre réponse?</p>
            <p className="text-slate-600 mb-4">
              Notre équipe est là pour vous aider. N\'hésitez pas à nous contacter.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[0]
  index: number
}) {
  return (
    <details
      className="gsap-reveal group rounded-xl border border-slate-200 bg-white shadow-[0_4px_20px_-4px_rgba(10,22,40,0.08)] transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(10,22,40,0.15)] open:border-brand-blue/30 open:shadow-[0_8px_30px_-8px_rgba(10,22,40,0.15)]"
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <summary className="flex cursor-pointer select-none items-center justify-between p-5 sm:p-6">
        <h3 className="font-semibold text-brand-dark sm:text-lg">{faq.question}</h3>
        <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-slate-100 px-5 py-4 sm:px-6 sm:py-5 text-slate-600 leading-relaxed">
        {faq.answer}
      </div>
    </details>
  )
}
