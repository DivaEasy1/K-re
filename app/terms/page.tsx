import type { Metadata } from 'next'
import PageTransition from '@/components/layout/PageTransition'

export const metadata: Metadata = {
  title: 'Conditions Générales',
  description: 'Conditions générales d\'utilisation de K-Ré.',
}

export default function TermsPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="gsap-reveal mb-12">
            <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Conditions Générales d&apos;Utilisation
            </h1>
            <p className="mt-4 text-sm text-slate-500">Dernière mise à jour: Avril 2026</p>
          </header>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-brand-dark">1. Acceptation des Conditions</h2>
              <p>
                En utilisant le service K-Ré, vous acceptez les présentes conditions générales.
                Si vous n&apos;êtes pas d&apos;accord, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">2. Réservation & Paiement</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les réservations doivent être effectuées en ligne via Kayakomat</li>
                <li>Le paiement est effectué au moment de la réservation</li>
                <li>Un code SMS vous sera envoyé pour récupérer votre équipement</li>
                <li>Les tarifs peuvent varier selon la saison et la disponibilité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">3. Annulation & Remboursement</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Annulation 24h+ avant: remboursement à 100%</li>
                <li>Annulation moins de 24h: 20% de frais d&apos;annulation</li>
                <li>No-show (pas de présentation): aucun remboursement</li>
                <li>Les conditions météo donnent droit à un report gratuit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">4. Responsabilités de l&apos;Utilisateur</h2>
              <p>L&apos;utilisateur accepte de:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir des informations correctes et à jour</li>
                <li>Porter un gilet de sauvetage à tout moment</li>
                <li>Respecter les règles de sécurité et l&apos;environnement</li>
                <li>Être responsable de l&apos;équipement loué</li>
                <li>Avoir au minimum 18 ans (ou être accompagné d&apos;un adulte si mineur)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">5. Dommages & Casse</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>L&apos;utilisateur est responsable des dommages causés à l&apos;équipement</li>
                <li>Les frais de réparation ou de remplacement seront facturés</li>
                <li>Perte de gilet de sauvetage: 150€</li>
                <li>Dommages majeurs au kayak/paddle: estimation cas par cas</li>
                <li>L&apos;usure normale n&apos;est pas facturée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">6. Limitations de Responsabilité</h2>
              <p>
                K-Ré n&apos;est pas responsable des:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Blessures ou décès (l&apos;utilisateur accepte les risques inhérents)</li>
                <li>Perte d&apos;objets personnels</li>
                <li>Dommages indirects ou pertes de profit</li>
                <li>Interruption de service due à des circonstances imprévues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">7. Exonération de Responsabilité</h2>
              <p>
                Le kayak et le paddle comportent des risques. L&apos;utilisateur accepte ces risques et
                accepte de ne pas tenir K-Ré responsable de tout incident. Il est recommandé de
                souscrire une assurance sport aquatique.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">8. Modification des Conditions</h2>
              <p>
                K-Ré se réserve le droit de modifier ces conditions à tout moment. Les modifications
                seront publiées sur ce site et entreront en vigueur immédiatement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">9. Loi Applicable</h2>
              <p>
                Ces conditions sont régies par la loi française. Toute différence sera soumise aux
                tribunaux de La Rochelle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">10. Contact</h2>
              <p>
                Pour toute question:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> contact@kayak-en-re.fr<br />
                <strong>Téléphone:</strong> (33) 6 15 84 43 03
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
